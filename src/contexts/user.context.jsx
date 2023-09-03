import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthstateChangedListener} from "../utils/firebase/firebase.utils";


//the real value you want to use
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
}); //the actual storage sapce. We are creating it here. 

export const UserProvider = ({ children }) => {
    //allows any of its child components to access the values inside useState

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}; //passed into useContext.Provider

    useEffect(() => {
        const unsubscribe = onAuthstateChangedListener((user) => { //bascially this function tells the listener to stop listening
            if(user){
                createUserDocumentFromAuth(user); //authentification logic all here.
            }
            setCurrentUser(user); //if a user is signed out, this is null. If a user is signed in, this is an object
        })
        return unsubscribe;
    }, []); //empty array as we only want to run the function once when component mounts

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    //component that will wrap around any other components that need access to the value inside.
}; //there is a provider for every context
