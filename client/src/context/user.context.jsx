import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState( null );

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);
    const signIn = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    return(
        <UserContext.Provider value = {{ user, signIn, signOut }}>
            { children }
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext);
};