import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./Countries.css"

function Countries() {
    const [countries, setCountries] = useState([])
    const [data, setData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const RefData = useRef()

    useEffect(() => {
        FetchCountry()
        RefData.current.focus()
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    const FetchCountry = async () => {
        try {
            let res = await axios.get("https://restcountries.com/v3.1/all")
            if (res.status === 200) {
                setCountries(res.data)
                setData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const Handler = () => {
        setData(countries.filter((eachCountry) => eachCountry.region.toLowerCase().includes(RefData.current.value.toLowerCase()) || eachCountry.name.common.toLowerCase().includes(RefData.current.value.toLowerCase())))
    }

    const handleCardClick = (country) => {
        setSelectedCountry(country)
    }

    const handleClickOutside = (event) => {
        if (selectedCountry && !event.target.closest('.selected-card')) {
            setSelectedCountry(null)
        }
    }

    return (
        <div className="wrapper">
            <h1>World Wide Countries Information.</h1>
            <input type="text" ref={RefData} className="search-box" onChange={Handler} placeholder="Search for a country..." />
            <div className="md">
                {!selectedCountry ? (
                    <ol>
                        {data.map((country) => (
                            <li key={country.cca3}>
                                <div className="card" onClick={() => handleCardClick(country)}>
                                    <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
                                    <span>{country.name.common}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className="selected-card">
                        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.official}`} />
                        <div className="selected-info">
                            <h2>{selectedCountry.name.common}</h2>
                            <p>Official Name: {selectedCountry.name.official}</p>
                            <p>Capital: {selectedCountry.capital}</p>
                            <p>Region: {selectedCountry.region}</p>
                            <p>Subregion: {selectedCountry.subregion}</p>
                            <p>Population: {selectedCountry.population}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Countries
