import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {auth, db } from "../firebase-config"
import { doc, setDoc } from "firebase/firestore"

export const Usercontext = createContext();

const UsercontextProvider = (prop) => {
    const [profile, setProfile] = useState({})

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    
    const writeUserData = async( name, email) => {
        console.log("writing")
        await setDoc(doc(db, "profiles", auth.currentUser.uid), {
            username: name,
            email: email,
            userId: auth.currentUser.uid,
            following:[],
            followers: []
        });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser) =>{
            console.log(currentuser);
            setProfile(currentuser)
        });
        return () => {
            unsubscribe();
        }
    })
    

    return ( 
        <Usercontext.Provider value={{createUser, profile, logout, signIn, writeUserData}}>
            {prop.children}
        </Usercontext.Provider>
     );
}
 
export default UsercontextProvider;