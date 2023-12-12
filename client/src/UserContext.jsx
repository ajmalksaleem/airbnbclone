import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, SetUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then((val) => {
                    console.log(val)
                    SetUser(val.data)
                    setReady(true);
                })
                .catch((err) => {
                    alert(err)
                })

        }
    }, [])
    return (
        <userContext.Provider value={{ user, SetUser, ready }}>
            {children}
        </userContext.Provider>
    )
}