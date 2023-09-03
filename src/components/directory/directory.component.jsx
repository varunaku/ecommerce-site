import DirectoryItem from "../directory-item/directory-item.component"

const Directory = ({categories}) => {
    return(
        <div className="categories-container"> 

        {categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
        
  
     </div>
    )
}

//lower level than app.js. the categories array of objects is passed into it here, and it will map through each entry, calling categoryitem for each one to make the style.

export default Directory