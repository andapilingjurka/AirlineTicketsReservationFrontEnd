import React, { useEffect, useState } from "react";
import "./kontinentet.css";
import MyNavbar from "../include/Navbar";

const KontinentetSemantic = () => {
  const [continentData, setContinentData] = useState([]);

  useEffect(() => {
    const fetchContinentData = async () => {
      const query = `
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?continent ?continentLabel
        WHERE {
          ?continent wdt:P31 wd:Q5107 ;
                     rdfs:label ?continentLabel .
          FILTER(LANG(?continentLabel) = 'en')
        }
        ORDER BY ?continentLabel
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
        console.log("Continent data from SPARQL endpoint:", data);
        setContinentData(data.results.bindings);
      } catch (error) {
        console.error("Error fetching continent data:", error);
      }
    };

    fetchContinentData();
  }, []);

  return (
    <div>
      <MyNavbar />
      <div className="container-kontinentetsemantic">
        <h1 className="kontinentetsemantic-h1">Kontinentet në Botë</h1>
        <ul className="kontinentetsemantic-ul">
          {continentData.map((continent, index) => (
            <li className="kontinentetsemantic-li" key={index}>
              {continent.continentLabel.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KontinentetSemantic;