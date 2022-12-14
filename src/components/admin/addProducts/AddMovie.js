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
  { id: 1, name: "Horror/Thriller" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Sci-Fi" },
];

const initialState = {
  title: "",
  imageURL: "",
  price: 0,
  category: "",
  desc: "",
  info:"",
  time:"",
  time1:"",
};


const AddMovies = () => {
  // const { id } = useParams();
  // const products = useSelector(selectProducts);
  const [movie, setMovie] = useState({
    ...initialState // will clear field to intial state
  })


  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => { 
    const { name, value } = e.target; // target is everything with in the e (event) so name.target or value.target in the form
    setMovie({ ...movie, [name]: value }); //... values of products, look at the name and update the value depending on the name
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
          setMovie({...movie, imageURL:downloadURL}) //... grabs properties of movies
          toast.success("Image Uploaded.")
        });
      }
    );

  };


  const addMovie = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "movies"), {
        name: movie.name,
        imageURL: movie.imageURL,
        price: Number(movie.price),
        category: movie.category,
        desc: movie.desc,
        info: movie.info,
        time: movie.time,
        time1: movie.time1,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setMovie({ ...initialState });

      toast.success("Movie uploaded successfully.");
      navigate("/admin/all-movies");
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
        <h1>Add Movie</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addMovie}>

          {/* PRODUCT NAME UPLOAD  */}

          <label>Movie Name: </label>
          <input 
            type="text" 
            placeholder="Movie Name" 
            required name="name" 
            value={movie.name} 
            onChange={(e) => handleInputChange(e)} 
          />

          {/* PROUDUCT IMAGE UPLOAD  */}
          {/* PROGRESS  */}
          <label>Movie Image: </label>
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
              placeholder="Movie Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {movie.imageURL === "" ? null : (
              <input
                type="text"
                // required
                placeholder="Image URL"
                name="imageURL"
                value={movie.imageURL}
                disabled
              />
            )}
          </Card>
          {/* Movie Info  */}
          <label>Movie Info: </label>
            <input 
              type="text" 
              placeholder="Movie Info" 
              required name="info" 
              value={movie.info} 
              onChange={(e) => handleInputChange(e)} 
            />
          {/* Movie PRICE  */}

          <label>Movie price:</label>
            <input
              type="number"
              placeholder="Ticket price"
              required
              name="price"
              value={movie.price}
              onChange={(e) => handleInputChange(e)}
            />
             {/* Movie CATEGORY  */}
            <label>Movie Category:</label>
            <select
              required
              name="category"
              value={movie.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
             {/* Movie DESC  */}
             <label>Movie Desc: </label>
              <input 
                type="text" 
                placeholder="Movie Desc" 
                required name="desc" 
                value={movie.desc} 
                onChange={(e) => handleInputChange(e)} 
              />
                           {/* Movie Time  */}
             <label>Movie Time: </label>
              <input 
                type="text" 
                placeholder="Movie Time" 
                required name="time" 
                value={movie.time} 
                onChange={(e) => handleInputChange(e)} 
              />
                           <label>Movie Time Option1: </label>
              <input 
                type="text" 
                placeholder="Movie Time Opton 1" 
                required name="time1" 
                value={movie.time1} 
                onChange={(e) => handleInputChange(e)} 
              />
              <button className="--btn --btn-primary">
                Save Button
              </button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default AddMovies
