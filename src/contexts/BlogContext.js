import React, { createContext, useEffect, useState, useContext } from "react";
import { Usercontext } from "../contexts/Usercontext";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const BlogContext = createContext();

const BlogContextProvider = (prop) => {
    const { profile } = useContext(Usercontext);
    const [blogs, setBlogs] = useState();
    const [notify, setnotify] = useState(false);
    const [delnotify, setdelnotify] = useState(false);
    const blogCollectionRef = collection(db, "blogs");

    const getPosts = async () => {
        const data = await getDocs(
            query(blogCollectionRef, orderBy("createdAt", "desc"))
        );
        // console.log(data.docs)
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const shownotify = () => {
        setnotify(true);
        setTimeout(() => {
            setnotify(false);
        }, 3000);
    };
    const showdelnotify = () => {
        setdelnotify(true);
        setTimeout(() => {
            setdelnotify(false);
        }, 3000);
    };
    useEffect(() => {
        // console.log("blogcontext.js")

        if (profile) {
            getPosts();
        }
    }, [db]);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                getPosts,
                shownotify,
                notify,
                showdelnotify,
                delnotify,
            }}
        >
            {prop.children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
