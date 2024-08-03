import "./Home.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
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
export default Home