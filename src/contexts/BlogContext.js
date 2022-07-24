import React, { createContext, useEffect, useState } from 'react';

export const BlogContext = createContext();

const BlogContextProvider = (prop) => {
    const [blogs, setBooks] = useState([])
    const [name, setName] = useState("")
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const userId = sessionStorage.getItem("currentuser")

    useEffect(()=>{
        if(userId){
            fetch('http://localhost:8000/profiles/'+userId+'?_embed=blogs')
                .then(res =>{
                    if(!res.ok){
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setBooks(data.blogs);
                    console.log(data.blogs)
                    setName(data.name)
                    setFollowers(data.followers)
                    setFollowing(data.following)
                })
        }
    },[userId])
    

    return ( 
        <BlogContext.Provider value={{blogs,name,following,followers}}>
            {prop.children}
        </BlogContext.Provider>
     );
}
 
export default BlogContextProvider;