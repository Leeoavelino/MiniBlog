import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

//components
import PostDetail from '../../components/PostDetail'
import { Link } from 'react-router-dom'

export default function Search(){

    const query = useQuery()
    //query.get é do URLSearchParams que esta no hook useQuery. O Q É PRA FAZEr a busca
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)

    return(
        <div>
            <h1>
                pesquisar
            </h1>

           <div>
                {/* quando vem vazio. sem nenhum resultado encontrado */}
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to='/' className='btn btn-dark'>
                            Voltar
                        </Link>
                    </>

                )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
           </div>
        </div>
    )
}