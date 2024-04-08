import {useState, useEffect} from 'react';
import {db} from '../firebase/config';
import {collection,query,onSnapshot,where, orderBy, getDocs} from 'firebase/firestore' 
 
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
 
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
 
        useEffect(() => {
        
            const getUsers = async() => {
            
            if(cancelled){
                return
            } 
 
            setLoading(true);
 
            const collectionRef = await collection(db, docCollection);
            
            try {
                let q

                if (search) {
                    q = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"))
                }
                else if(uid) {
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"))
                }
                else{
                    q = query(collectionRef, orderBy("createdAt", "desc")); //essa linha aqui que faz meus posts aparecerem na home
                }

                setDocuments( q.docs.map((doc) => ({
                    ...doc.data(),
                    id:doc.id,
                })))

                // setLoading(false)
            } catch (error) {
                console.log(error);
                setError(error.message)   
            }
            setLoading(false)
        }
        getUsers();
    },[docCollection, search, uid, cancelled])
    console.log(documents);
 
    return { documents, loading, error }; 
}