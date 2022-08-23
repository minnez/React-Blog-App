import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {auth, db } from "../firebase-config"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const Usercontext = createContext();

const UsercontextProvider = (prop) => {
    const [profile, setProfile] = useState({})
    const [currentUserName, setCurrentUserName] = useState()
    const [profileDetails, setProfileDetails] = useState()

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const setUser = (name) =>{
        console.log("setting name")
        setCurrentUserName(name)
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

    const fetchProfileDetails = async () =>{
        const docRef = doc(db, "profiles", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProfileDetails(docSnap.data())
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(()=>{
        console.log("usercontext.js")
        const unsubscribe = onAuthStateChanged(auth, (currentuser) =>{
            console.log(currentuser);
            setProfile(currentuser)
        });
        return () => {
            unsubscribe();
        }
    },[])
    

    return ( 
        
        <Usercontext.Provider value={{createUser, profile, logout, signIn, writeUserData, setUser, currentUserName, fetchProfileDetails, profileDetails}}>
            {prop.children}
        </Usercontext.Provider>
     );
}
 
export default UsercontextProvider;