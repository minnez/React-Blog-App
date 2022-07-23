import React, { createContext, useEffect, useState } from 'react';

export const Usercontext = createContext();

const UsercontextProvider = (prop) => {
    const [profiles, setProfiles] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8000/profiles')
            .then(res =>{
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setProfiles(data);
                console.log(data)
            })
    },[])
    

    return ( 
        <Usercontext.Provider value={{profiles}}>
            {prop.children}
        </Usercontext.Provider>
     );
}
 
export default UsercontextProvider;