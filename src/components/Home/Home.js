import React from "react";
import MyNavbar from "../include/Navbar";
import Footer from "../include/Footer";
import "./home.css";
import airport from "../../images/airport.jpg";
import airport2 from "../../images/airport2.jpg";

function Home() {
  return (
    <div className="home-container">
      <MyNavbar />
      <div className="image-container">
        <img src={airport} alt="Welcome Image" className="responsive-image" />
      </div>

      <section id="section2">
        <section id="section2-content" className="container">
          <aside className="left">
            <div className="image-container">
              <img src={airport2} alt="image1" className="image" />
            </div>
          </aside>
          <aside className="right">
            <h1>Explore the Skies</h1>
            <h4>- Your Gateway to Seamless Travel -</h4>
            <p>
              Welcome to Airline Tickets Reservation, where your journey takes
              flight from aspirations to cherished memories. Our dedicated team
              of travel enthusiasts is committed to providing you with a
              personalized and smooth travel experience tailored to your
              preferences. We take pride in curating distinctive and fulfilling
              itineraries, ensuring that each trip is a perfect fusion of
              excitement, comfort, and cultural discovery. From renowned
              destinations to hidden treasures, we have meticulously crafted a
              variety of travel packages to suit every taste and interest.
              Whether you desire a sun-soaked beach escape, an
              adrenaline-pumping adventure, or a cultural immersion, we've got
              you covered. With meticulous attention to detail and a deep love
              for travel, we aim to surpass your expectations, making every
              journey with us an exceptionally memorable experience. Explore the
              world with confidence, knowing that Airline Tickets Reservation is
              here to transform your travel dreams into reality.
            </p>

            <a href="#" className="btn btn-primary btn-home">
              Read More
            </a>
          </aside>
        </section>
      </section>

      <section className="holiday-container container">
        <div className="top-row">
          <h1 className="holiday-h1">- Our Service -</h1>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Explore Exciting Destinations</h2>
              <p>
                Life is an adventure, and your journey with us will be too!
                Embark on a guided trip beyond your comfort zone, creating
                stories to share for years to come.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Discover Cultural Wonders</h2>
              <p>
                Unlock the world's cultural treasures with our expert planning
                and seamless execution. Our extensive network ensures the best
                guides, ideal timings, and exclusive access to cultural wonders
                worldwide.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Jet-Set on Safari Adventures</h2>
              <p>
                Whether it's your first safari or an expedition to remote lands,
                we guarantee to surpass your expectations with vibrant and
                memorable experiences!
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Romantic Getaways</h2>
              <p>
                From enchanting mini-moons to dreamy honeymoon sabbaticals, we
                craft the most memorable experiences for your once-in-a-lifetime
                romantic getaway!
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Fly with the Family</h2>
              <p>
                Family holidays are about finding the perfect balance! Tailored
                activities ensure every family member, from babies to
                great-grandparents, has an equally wonderful experience. It's
                all in the details.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Vacation in Luxurious Villas</h2>
              <p>
                Perfect for families or larger groups, our selection of
                fantastic private homes guarantees the ideal holiday.
                Consideration for all aspects ensures an unforgettable
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
