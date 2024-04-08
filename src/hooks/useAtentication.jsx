import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    const [ error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //state que vai cancelar as açoes futuras dos componentes
    const [cancelled, setCancelled] = useState(false)

    //pega a autenticaçao vinda do firebase
    const auth = getAuth()

    function checkIfCancelled(){
        if(cancelled){
            return
        }
    }

    const createUser = async (data) => {
        checkIfCancelled()
        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
            }
            else if(error.message.includes('email-already')){
                systemErrorMessage = 'Email ja cadastrado.'
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
        
    }

    //logout - sign out
    const logout = () => {
        checkIfCancelled()
        signOut(auth)
    }

    // login - sign in
  const login = async (data) => {
    checkIfCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      console.log(error)
 //auth/invalid-credential   too-many-requests
      if (error.message.includes("auth/invalid-login-credentials")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("auth/invalid-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro no email ou na senha, favor verificar e tentar novamente.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}