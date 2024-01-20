import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./aboutus.css";
import airline from "./airline.mp4";
import pilots from "./pilots.jpg";
import photo1 from "./photo1.jpg";
import photo2 from "./photo2.jpg";
import photo3 from "./photo3.jpg";
import photo4 from "./photo4.jpg";

import StarRating from "./StarRating";
import { useRating } from "./RatingContext";

import MyNavbar from "../include/Navbar";
import Footer from "../include/Footer";

const AboutUs = () => {
  const { userRating, setUserRating, adminRating, setAdminRating } =
    useRating();
  const [hasRated, setHasRated] = useState(false);

  const handleRatingChange = (rating) => {
    if (!hasRated) {
      setUserRating(rating);
      setAdminRating(rating);
      setHasRated(true);
    }
  };

  return (
    <div>
      <MyNavbar />
      <div className="video-container">
        <video controls={false} autoPlay muted loop>
          <source src={airline} type="video/mp4" />
         

          Your browser does not support the video tag.
        </video>
      </div>

      <div className="card-container">
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <h2>Kualiteti:</h2>
                <p>
                  Ne punojmë vazhdimisht për të përmirësuar cilësinë e
                  shërbimeve tona dhe për të siguruar një udhëtim të
                  paharrueshëm për klientët tanë.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <h2>Siguria:</h2>
                <p>
                  Sigurimi i udhëtimit tuaj është prioriteti ynë. Ne
                  bashkëpunojmë me kompanitë më të besueshme për të garantuar
                  një udhëtim të sigurtë.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <h2>Efikasiteti:</h2>
                <p>
                  Me një platformë të avancuar dhe një ekip të specializuar, ne
                  sigurojmë rezervime të shpejta dhe procese të lehta për
                  klientët tanë.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <h2>Shërbimi i Klientit:</h2>
                <p>
                  Ekipi ynë është gjithmonë në dispozicion për të përgjigjur
                  pyetjet tuaja dhe për të ofruar ndihmë në gjithë procesin e
                  udhëtimit tuaj.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-content">
          <img src={pilots} alt="Additional" />
          <div className="cardd text-rightt">
            <h2>Pse të na zgjidhni ne?</h2>
            <p>
              Ne kuptojmë se zgjedhja e biletave të aeroplanit është një vendim
              i rëndësishëm. Për këtë arsye, jemi këtu për t'ju ofruar një
              përvojë udhëtimi të jashtëzakonshme. Me një angazhim ndaj çmimeve
              konkurruese, shërbimit të përkushtuar ndaj klientit dhe flotës
              sonë të përditësuar, ne ju sigurojmë një udhëtim të sigurt dhe të
              kënaqshëm. Për të bërë udhëtimin tuaj edhe më të veçantë, ofrojmë
              destinacione të shumta emocionuese dhe atraktive. Nëpërmjet
              programit tonë të përfitimeve ekskluzive, keni mundësinë të
              përfitoni nga oferta dhe privilegje speciale që bëjnë udhëtimin
              tuaj më të paharrueshëm. Zgjidhni ne për udhëtimin tuaj dhe lejoni
              që aventura të fillojë me një eksperiencë të re dhe emocionuese.
              Nëpërmjet fluturimit tonë, hapni dyert drejt një botë të re të
              mundësive dhe kënaqësive. Jemi këtu për t'u bërë pjesë e
              rrugëtimit tuaj, duke ju ofruar jo vetëm një biletë aeroplani, por
              një udhëtim që do të mbetet gjatë në kujtesën tuaj."
            </p>
          </div>
        </div>
      </div>

      <h3>Çfarë thanë njerëzit për ne?</h3>
      <div className="additional-content">
        <div className="enlarged-photo">
          <img src={photo1} alt="Photo 1" />
          <div className="enlarged-photo-description">
            <p>
              "Faqja juaj është e lehtë për përdorim dhe ofron shumë mundësi për
              zgjedhje. Procesi i pagesës ishte i shpejtë dhe i sigurt.
              Gjithashtu, shërbimi klienti ishte shumë i mire. Do të rezervoj
              përsëri me ju në të ardhmen!"
            </p>
          </div>
        </div>

        <div className="enlarged-photo">
          <img src={photo2} alt="Photo 2" />
          <div className="enlarged-photo-description">
            <p>
              "Kam përdorur shërbimin tuaj për herë të parë dhe kam mbetur shumë
              i kënaqur. Biletat ishin të përballueshme dhe procesi i rezervimit
              ishte i thjeshtë. Do ta rekomandoja me kënaqësi shërbimin tuaj."
            </p>{" "}
          </div>
        </div>

        <div className="enlarged-photo">
          <img src={photo3} alt="Photo 3" />
          <div className="enlarged-photo-description">
            <p>
              "Një përvojë shumë e mirë me rezervimin e biletave nëpërmjet faqes
              suaj. Çmimet ishin konkurruese dhe kërkesa për ndryshime në datat
              e udhëtimit u trajtua me lehtësi.Ju faleminderit për një shërbim
              të shkëlqyeshëm!"
            </p>{" "}
          </div>
        </div>

        <div className="enlarged-photo">
          <img src={photo4} alt="Photo 4" />
          <div className="enlarged-photo-description">
            <p>
              "Përvoja ime nga ju ishte e mrekullueshme. Faqja juaj ofron
              informacion të plotë për çdo udhëtim, duke përfshirë çmimet dhe
              oraret. Nuk ka pasur asnjë ngërç gjatë pagesës dhe biletat u
              dërguan menjëherë."
            </p>
            .{" "}
          </div>
        </div>
      </div>

      {hasRated ? (
        <p
          style={{
            textAlign: "center",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "bold",
          }}
        >
          Ju faleminderit që na vlerësuat!
        </p>
      ) : (
        <StarRating onRatingChange={handleRatingChange} />
      )}

      <Footer />
    </div>
  );
};

export default AboutUs;
