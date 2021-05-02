import React, { useState, useContext, useEffect } from 'react'
import app from '../firebase';

const auth = app.auth() 

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

export function useAuth() {
    return (
         useContext(AuthContext)
    )
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
        
    }

    function forgetPassword(email) {
        return auth.sendPasswordResetEmail(email)
        
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password) 
    }

    function deleteUser() {
        return currentUser.delete() 
    }

    function logout() {
        return auth.signOut()  
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgetPassword,
        updateEmail,
        updatePassword,
        deleteUser
    }

    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
