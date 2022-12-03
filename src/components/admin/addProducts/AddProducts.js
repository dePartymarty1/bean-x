import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProducts.module.scss";
// import list from "../../../pages/menu/data"
// Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Popcorn" },
  { id: 2, name: "Snacks" },
  { id: 3, name: "Drinks" },
  { id: 4, name: "Combos" },
];

const initialState = {
  title: "",
  imageURL: "",
  price: 0,
  category: "",
};


const AddProducts = () => {
  // const { id } = useParams();
  // const products = useSelector(selectProducts);
  const [product, setProduct] = useState({
    ...initialState // will clear field to intial state
  })


  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => { 
    const { name, value } = e.target; // target is everything with in the e (event) so name.target or value.target in the form
    setProduct({ ...product, [name]: value }); //... values of products, look at the name and update the value depending on the name
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //Firebase documentation edited
    const storageRef = ref(storage, `bean-x/${Date.now()}${file.name}`); // already made in firebase config, REFERENCE TO FILE WE WANT TO UPLOAD
    const uploadTask = uploadBytesResumable(storageRef, file); // look at the file you want to upload and execute it by bytesResumable


    uploadTask.on('state_changed', 
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //helps us calculate how much progess has been made
        setUploadProgress(progress)

      }, 
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message)
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product, imageURL:downloadURL}) //... grabs properties of product
          toast.success("Image Uploaded.")
        });
      }
    );

  };


  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

// future make an editProduct
  return (
    <>
    {isLoading && <Loader />}
    {/* if loading then display loading icon */}
      <div className={styles.product}>
        <h1>Add Concessions Item</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>

          {/* PRODUCT NAME UPLOAD  */}

          <label>Product Name: </label>
          <input 
            type="text" 
            placeholder="Product Name" 
            required name="name" 
            value={product.name} 
            onChange={(e) => handleInputChange(e)} 
          />

          {/* PROUDUCT IMAGE UPLOAD  */}
          {/* PROGRESS  */}
          <label>Product Image: </label>
          <Card cardClass={styles.group}>
            {uploadProgress === 0 ? null : (
            <div className={styles.progress}>

              <div className={styles["progress-bar"]}
              style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100 //if upload has not completed
                  ? `Uploading ${uploadProgress}`
                  : `Upload Complete ${uploadProgress}%`}
              </div>
            </div>
            )}

            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL === "" ? null : (
              <input
                type="text"
                // required
                placeholder="Image URL"
                name="imageURL"
                value={product.imageURL}
                disabled
              />
            )}
          </Card>

          {/* PRODUCT PRICE  */}

          <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cate) => {
                return (
                  <option key={cate.id} value={cate.name}>
                    {cate.name}
                  </option>
                );
              })}
            </select>
              <button className="--btn --btn-primary">
                Save Button
              </button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProducts
