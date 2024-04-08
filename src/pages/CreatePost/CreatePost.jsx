import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const {user} = useAuthValue()
    const {insertDocument, response} = useInsertDocument('posts')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")
        
        //validante image URL
        try{
            new URL(image)
        } catch (error) {
            return setFormError('A imagem precisa ser uma URL.')
        }

        //criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())  //trim tira os espaços em branco

        //checar todos os valores
        if(!title || !image || !tags || !body){
            setFormError('Por favor, preencha todos os campos.')
        }
        // caso tenha o formError iremos da um return para que o post nao seja incluido.
        if(formError){
            return
        } 
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createBy: user.displayName,
        })
        //redirect to home page - redireciona para pagina inicial
        navigate('/')
    }
    return(
        <div className={styles.create_post}>
            <h2>
                Criar post
            </h2>
            <p>
                Escreva sobre o que quiser e compartilhe o seu conhecimento!
            </p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo:</span>
                    <input type="text" name="title" required placeholder='Pense num bom titulo' onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    <span>URL da imagem:</span>
                    <input type="url" name="image" required placeholder='Insita uma imagem que represente o seu post' onChange={(e) => setImage(e.target.value)} />
                </label>
                
                <label>
                    <span>Conteudo:</span>
                    <textarea name="body" required placeholder='Insira o conteudo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea> 
                </label>

                <label>
                    <span>Tags:</span>
                    <input type="text" name="tags" required placeholder='Insira as tags separadas por virgula' onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>

                {!response.loading && <button className='btn'>Cadastrar</button>}
                {response.loading && <button className='btn' disabled>Aguarde...</button>}
                
                {/* retornam mensagens de erro */}
                {response.error && <p className='error'>{response.error} </p>}
                {formError && <p className='error'>{formError} </p>}

            </form>
        </div>
    )

}


