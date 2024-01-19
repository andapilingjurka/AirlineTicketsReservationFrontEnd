import React, { useEffect, useState } from "react";
import "./shtetet.css";
import MyNavbar from "../include/Navbar";

const ShtetetSemantic = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?country ?countryLabel
        WHERE {
          ?country wdt:P31 wd:Q6256 ;
                   rdfs:label ?countryLabel .
          FILTER(LANG(?countryLabel) = 'en')
        }
        ORDER BY ?countryLabel
      `;

      const endpoint = "https://query.wikidata.org/sparql";
      const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;

      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();
        console.log("Data from SPARQL endpoint:", data);
        setCountryData(data.results.bindings);
      } catch (error) {
        console.error("Error fetching RDF data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MyNavbar />
      <div className="container-shtetetsemantic">
        <h1 className="shtetetsemantic-h1">Shtetet në Botë</h1>
        <ul className="shtetetsemantic-ul">
          {countryData.map((country, index) => (
            <li className="shtetetsemantic-li" key={index}>
              {country.countryLabel.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShtetetSemantic;
