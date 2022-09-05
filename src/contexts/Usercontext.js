import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const Usercontext = createContext();

const UsercontextProvider = (prop) => {
    const [profile, setProfile] = useState({});
    const [currentUserName, setCurrentUserName] = useState();
    const [profileDetails, setProfileDetails] = useState();
    const [error, setError] = useState();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const setUser = (name) => {
        // console.log("setting name")
        setCurrentUserName(name);
    };

    const writeUserData = async (name, email) => {
        await setDoc(doc(db, "profiles", auth.currentUser.uid), {
            username: name,
            email: email,
            userId: auth.currentUser.uid,
            following: [],
            followers: [],
            liked: [],
        });
    };

    const fetchProfileDetails = async () => {
        try {
            const docRef = doc(db, "profiles", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfileDetails(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                setError("No such document!");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message.includes("auth/invalid-email")) {
                    setError(true);
                }
                // ..
            });
    };
    const serror = () => {
        setError(!error);
    };

    useEffect(() => {
        // console.log("usercontext.js")
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            // console.log(currentuser);
            setProfile(currentuser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Usercontext.Provider
            value={{
                createUser,
                profile,
                logout,
                signIn,
                writeUserData,
                setUser,
                currentUserName,
                fetchProfileDetails,
                profileDetails,
                resetPassword,
                error,
                serror,
            }}
        >
            {prop.children}
        </Usercontext.Provider>
    );
};

export default UsercontextProvider;
