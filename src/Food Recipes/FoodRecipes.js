import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./FoodRecipes.css";

const FoodRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const RefData = useRef();

  useEffect(() => {
    DataFetch();
    RefData.current.focus();
  }, []);

  const DataFetch = async () => {
    let res = await axios.get("https://dummyjson.com/recipes");
    try {
      if (res.status === 200) {
        console.log(res);
        setRecipes(res.data.recipes);
        setRecipeData(res.data.recipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DataHandler = () => {
    console.log(RefData.current.value);
    setRecipeData(
      recipes.filter((eachData) =>
        eachData.name
          .toLowerCase()
          .includes(RefData.current.value.toLowerCase())||eachData.cuisine.toLowerCase().includes(RefData.current.value.toLowerCase())
      )
    );
  };

  return (
    <>
     <input
        type="text"
        ref={RefData}
        onChange={DataHandler}
        className="search-box"
        placeholder="Search for a recipe..."
      />
    <div className="md">
     
      {recipeData.map((recipe) => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.name}</h3>
          <h5>Cuisine: {recipe.cuisine}</h5>
          <img src={recipe.image} alt={recipe.name} height="100px" />
          <div className="Ingredients">
            <details>
              <summary>Ingredients</summary>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <div>{ingredient}</div>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <div className="Instructions">
            <details>
              <summary>Instructions</summary>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    <div>{instruction}</div>
                  </li>
                ))}
              </ol>
            </details>
          </div>
          <h4>Rating: {recipe.rating}</h4>
        </div>
      ))}
    </div>
    </>
  );
};

export default FoodRecipes;
