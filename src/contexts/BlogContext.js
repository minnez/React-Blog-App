import React, { createContext, useEffect, useState } from 'react';

export const BlogContext = createContext();

const BlogContextProvider = (prop) => {
    const [blogs, setBooks] = useState([{title:"title",id:9001,body:"initializing"}])
    const [name, setName] = useState("rick")
    const [following, setFollowing] = useState(['an','af'])
    const [followers, setFollowers] = useState(['an'])
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
                    setName(data.name)
                    setFollowers(data.followers)
                    setFollowing(data.following)
                })
        }
    },[userId])
    

    return ( 
        <BlogContext.Provider value={{blogs,name,following,followers,userId}}>
            {prop.children}
        </BlogContext.Provider>
     );
}
 
export default BlogContextProvider;