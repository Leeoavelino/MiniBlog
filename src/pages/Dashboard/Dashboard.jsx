import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
//hooks
import {useAuthValue} from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
export default function Dashboard(){
    const {user} = useAuthValue()
    const uid = user.uid
    const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
    return(
        <div>
            <h2>Dashboard</h2>
            <p>gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
                </div>
            ) : (
                <div><p>Tem posts!</p></div>
            )}
            {posts && posts.map((post) => <h3>{post.title}</h3>)}
        </div>
    )
}