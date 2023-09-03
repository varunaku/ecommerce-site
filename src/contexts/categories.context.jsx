import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";




export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); //basically the related function in firebase utils is also async, so we make this async.
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap(); //this retreives for us the object that contains the 5 categories, like mens and womens, with all the related information.
    }, [])

    const value = { categoriesMap };

    return(
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}