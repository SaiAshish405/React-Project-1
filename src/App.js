import { NavLink, Route, Routes } from "react-router-dom";
import Countries from "./Countries/Countries";
import FoodRecipes from "./Food Recipes/FoodRecipes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/foodRecipes" activeClassName="active">Food Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/countryInformation" activeClassName="active">Countries</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/foodRecipes" element={<FoodRecipes />} />
        <Route path="/countryInformation" element={<Countries />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="text-heading"> <h1>Welcome to the Information Hub</h1></div>
      <div className="home-nav">
        <NavLink to="/foodRecipes" className="home-link">Food Recipes</NavLink>
        <NavLink to="/countryInformation" className="home-link">Countries</NavLink>
      </div>
    </div>
  );
}

export default App;
