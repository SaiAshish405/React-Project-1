import React from 'react'
import { NavLink, Route, Routes } from "react-router-dom";
import Home from './Home';
import Countries from "../Countries/Countries";
import FoodRecipes from '../Food Recipes/FoodRecipes';



function Navigations() {
    return (
        <div>
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
    )
}

export default Navigations
