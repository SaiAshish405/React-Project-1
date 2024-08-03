import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Countries.css';

function Countries() {
    const [countries, setCountries] = useState([]);
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const RefData = useRef();

    useEffect(() => {
        FetchCountry();
        RefData.current.focus();
    }, []);

    const FetchCountry = async () => {
        try {
            let res = await axios.get('https://restcountries.com/v3.1/all');
            if (res.status === 200) {
                setCountries(res.data);
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const Handler = () => {
        const filteredData = countries.filter((eachCountry) =>
            eachCountry.region.toLowerCase().includes(RefData.current.value.toLowerCase()) ||
            eachCountry.name.common.toLowerCase().includes(RefData.current.value.toLowerCase())
        );
        setData(filteredData);
        setCurrentPage(1);
    };

    const handleCardClick = (country) => {
        setSelectedCountry(country);
    };

    const handleBackClick = () => {
        setSelectedCountry(null);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const sortByPopulation = () => {
        const sortedData = [...data].sort((a, b) => a.population - b.population);
        setData(sortedData);
        setCurrentPage(1);
    };

    const resetData = () => {
        setData(countries);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="wrapper">
            <div className="search-sort-container">
                <input
                    type="text"
                    ref={RefData}
                    className="search-box"
                    onChange={Handler}
                    placeholder="Search for a country..."
                />
                <button className="sort-button" onClick={sortByPopulation}>
                    Sort by Population
                </button>
                <button className="reset-button" onClick={resetData}>
                    Reset
                </button>
            </div>
            <div className="md">
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    !selectedCountry ? (
                        <>
                            <ol>
                                {currentItems.map((country) => (
                                    <li key={country.cca3}>
                                        <div className="Countrycard card" onClick={() => handleCardClick(country)}>
                                            <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
                                            <span className='span'>{country.name.common}</span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <div className="pagination">
                                <button onClick={() => paginate(1)} disabled={currentPage === 1}>
                                    First Page
                                </button>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span>
                                    Page: {currentPage} of {totalPages}
                                </span>
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
                                    Last Page
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="selected-card">
                            <button onClick={handleBackClick} className="back-button">Back to home</button>
                            <div className="selected-content">
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
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Countries;
