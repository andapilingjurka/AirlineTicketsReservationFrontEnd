import React, { useEffect, useState } from "react";
import "./airport.css";

import MyNavbar from "../include/Navbar";

const Aeroportet = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const query = `
      PREFIX wd: <http://www.wikidata.org/entity/>
      PREFIX wdt: <http://www.wikidata.org/prop/direct/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?airport ?airportLabel
      WHERE {
        ?airport wdt:P31 wd:Q1248784 ;
                 rdfs:label ?airportLabel .
        FILTER(LANG(?airportLabel) = "en")
      }
    `;

    const endpoint =
      "https://query.wikidata.org/sparql?query=" +
      encodeURIComponent(query) +
      "&format=json";

    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        displayAirports(data.results.bindings);
      } catch (error) {
        console.error("Error fetching RDF data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const displayAirports = (airportData) => {
    // Process each result row
    const airportListData = airportData.map((airport) => {
      const airportName = airport.airportLabel.value;
      const airportLink = airport.airport.value;

      return {
        airportName,
        airportLink,
      };
    });

    // Update state with the processed data
    setAirports(airportListData);
  };

  return (
    <div>
      <MyNavbar />
      <div className="aeroporti">
        <h1 className="aeroportet-h1">Aeroportet në Botë</h1>
        <ul className="aeroportet-ul">
          {airports.map((airport, index) => (
            <li className="aeroportet-li" key={index}>
              <a className="aeroportet.a" href={airport.airportLink}>
                Airport: {airport.airportName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aeroportet;
