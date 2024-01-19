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
            <h1> Eksploro Qiellin </h1>
            <h4> - Porta juaj drejt Udhetimeve pa pengesa - </h4>
            <p>
              Mirë se vini në Rezervimet e Biletave të Linjave Ajrore, ku
              udhëtimi juaj nis nga aspiratat deri te kujtimet e ngrohta. Ekipi
              ynë i përkushtuar i pasionuar për udhëtimet është i përkushtuar të
              ju ofrojë një eksperiencë udhëtimi personalizuar dhe të lehtë për
              tu realizuar sipas preferencave tuaja. Ne krenohemi në krijimin e
              itinerareve të dallueshme dhe të mbushura, duke siguruar që çdo
              udhëtim të jetë një bashkim i përkryer i emocionit, komoditetit
              dhe zbulimit kulturor. Nga destinacionet e njohura deri te
              thesurat e fshehura, kemi përgatitur me kujdes një varietet të
              pakufizuar të paketave udhëtimore për të përshtatur çdo shije dhe
              interes. Qoftë që dëshironi një pushim në plazh me diell, një
              aventurë me adrenalinë, apo një zhytje kulturore, ne jemi këtu për
              ju. Me vëmendje të veçantë ndaj detajeve dhe një dashuri të thellë
              për udhëtimin, synojmë të tejkalojmë pritshmëritë tuaja, duke bërë
              çdo udhëtim me ne një eksperiencë jashtëzakonisht të paharrueshme.
              Eksploroni botën me siguri, duke ditur se Rezervimet e Biletave të
              Linjave Ajrore janë këtu për të transformuar ëndrrat tuaja
              udhëtimore në realitet.
            </p>

            <a href="#" className="btn btn-primary btn-home">
              Lexo më shumë
            </a>
          </aside>
        </section>
      </section>

      <section className="holiday-container container">
        <div className="top-row">
          <h1 className="holiday-h1">- Shërbimet tona -</h1>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Eksploro Destinacione Pasionante</h2>
              <p>
                Jeta është një aventurë, dhe udhëtimi juaj me ne do të jetë po
                ashtu! Nisni një udhëtim të guiduar përtej zonës suaj të
                rehatshme, duke krijuar përralla për tu ndarë për vite të tëra.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Zbuloni Mrekullitë Kulturore</h2>
              <p>
                Hapieni thesarin kulturor të botës me planifikim tonë ekspert
                dhe ekzekutim të përsosur. Rrjeti ynë i gjërë siguron
                udhëheqësit më të mirë, kohëzgjatjen ideale dhe qasje ekskluzive
                në mrekullitë kulturore në të gjithë botën.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Jet-Set në Avantura Safari</h2>
              <p>
                Qoftë se është safari juaj i parë apo një ekspeditë në vende të
                largëta, ne garantojmë të tejkaluarit e pritshmërive tuaja me
                përvojë të ngjashme dhe të paharrueshme!
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Pushime Romantike</h2>
              <p>
                Nga mini-moon magjikë deri te pushime ëndërruese për muajt e
                mjegullt, ne krijojmë përvoja më të paharrueshme për udhëtimin
                tuaj romantik një herë në jetë!
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Fluturo me Familjen</h2>
              <p>
                Pushimet familjare janë për gjetjen e një balanci të përsosur!
                Aktivitetet e personalizuara sigurojnë që çdo anëtar i familjes,
                nga bebat deri te gjyshërët, të ketë një përvojë po aq të
                mrekullueshme. Detajet bëjnë dallimin.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="holiday-section">
              <h2>Pushime në Vila Luksoze</h2>
              <p>
                Ideale për familjet apo grupet më të mëdha, zgjedhja jonë e
                shtëpive private fantastike garanton një pushim të ideuar.
                Kujdesi për të gjitha aspektet siguron një përvojë të
                paharrueshme.
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
