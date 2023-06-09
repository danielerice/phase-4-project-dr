import React, {useState} from "react";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";


function RecipeBook ({ user, updateRecipe, recipeBookID, description, name, recipeBook, setErrors, errors, patchRecipe, updateRecipeBooks, updateUser }) {

    const [open, setOpen] = useState(false);
    const [recipeName, setRecipeName] = useState("")
    const [directions, setDirections] = useState("")

    const exampleText = "Ingredients: \n2.5oz Gin\n.25oz Brine\n1 Olive\nDirections:\nPut all the ingredients in a cocktail mixer and stir until the extrior has condensated"
    
   
    async function postNewRecipe (e) {
        //post to /recipes
        e.preventDefault()
        //console.log(name, directions)
        const formData = {
            "name": recipeName,
            "directions": directions,
            "user_id": user.id,
            "recipe_book_id": recipeBookID
            };
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData),
            };
            
        const response = await fetch(`/recipes`, configObj);
        const newRecipe = await response.json(); // error handling

        if (response.status === 201) {
            let newRecipeBook = recipeBook
            newRecipeBook.recipes.push(newRecipe)
            updateRecipeBooks(newRecipeBook)
            updateUser(newRecipe)
            setErrors(null)
          } else {
            setErrors(newRecipe)
            console.log(newRecipe)
          }
        
        setRecipeName("");
        setDirections("");
    }
    
    return (
                <div id={recipeBookID} className="bookCard">
                    { errors ? <div className="errorMessage"><p>{errors.errors[0]}</p></div> : <></>}
                    <h2>{name}</h2>
                    <i>{description}</i>
                        { recipeBook.recipes.length > 0 ? (
                            recipeBook.recipes.map((recipe) => {
                                //console.log(recipe)
                                return (<Recipe 
                                            user={user}
                                            key={recipe.id}
                                            recipeBookID={recipeBookID}
                                            name={recipe.name} 
                                            recipeID={recipe.id} 
                                            directions={recipe.directions}
                                            recipe={recipe}
                                            updateRecipe={updateRecipe}
                                            patchRecipe={patchRecipe}
                                        />)})
                            ) : (<div className="card"><p>Add Some Recipes!</p></div>)}
                    <button type="button" onClick={(e) => setOpen(!open)}>{open ? ("Done") : ("Add a Recipe!") }</button>
                    {open && <div className="content">
                                <div className="newRecipeCard">
                                    <form onSubmit={postNewRecipe}>
                                        <label>Name: </label>
                                        <input id="name" type="text" placeholder="This is an example!" onChange={(e) => setRecipeName(e.target.value)}></input>
                                        <label>Directions:</label>
                                        <textarea id="directions" type="input" placeholder={exampleText} onChange={(e) => setDirections(e.target.value)}></textarea>
                                        <button type="submit" >Submit</button>
                                    </form>
                                </div>
                    </div>}
                </div>
    )
}

export default RecipeBook;