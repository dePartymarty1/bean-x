// Use the function from getProduct, jsut copied from there and edited to be more general 

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";


const useFetchColection = (collectionName) => { // curly braces make a parameter
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCollection = () => {
        setIsLoading(true)
    
        try { 
          const docRef = collection(db, collectionName); 
          const q = query(docRef, orderBy("createdAt", "desc")); 
    
          onSnapshot(q, (snapshot) => {
    
            const allData = snapshot.docs.map((doc) => ({ 
              id: doc.id, // grabs the id in the document 
              ...doc.data() // All the data in the document 
            }));
            setData(allData) 
            setIsLoading(false)
            
          });
        }
        catch(error) {
          setIsLoading(false) 
          toast.error(error.message)
        }
      }

    useEffect(() => {
        getCollection()
    }, [])

    return {data, isLoading} // returning the data and isLoading from the objects
};

export default useFetchColection;