import React, { createContext, useContext, useState } from 'react';

const Authcontext= createContext(null);

export default function AuthProvider({children}) {
    const [User, setUser] = useState(null);


    return <Authcontext.Provider value={User}>{children}</Authcontext.Provider>
}

export const useAuth = ()=>{
    const context = useContext(Authcontext);

    if(context=== undefined){
        throw new Error('useAuth must be use within a AuthProvider');
    }

    return context;
}