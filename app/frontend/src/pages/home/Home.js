import React from "react";
import "./home.css";
import BlueTop from "../../components/svgPaths/bluetop";
import BlueBottom from "../../components/svgPaths/bluebottom";
import LeidingsFoto from "../../assets/img/pages/leiding.jpeg";
import ActivitiesList from "../../components/activiteiten/activitiesList";
import Takken from "../../components/takken/takken";
import HeroSlider from "../../components/heroSlider/heroSlider";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [])

  return (
    <>
      <div className="blueBG">
        <section className="hero__section">
          <div className="layered-grid hero__wrapper">
            <HeroSlider />
            <BlueTop />
          </div>
          <div className="hero__content">
            <h2>KSA Oosterzele</h2>
            <div className="text-container">
              <p>Elke zondag van 14u-17u organiseren wij activiteiten vol plezier!</p>
            </div>
            <Link to="/inschrijven" className="inherit-font cursive">Schrijf hier uw kind in</Link>
          </div>
          <BlueBottom />
        </section>

        <section className="intro__section page__section">
          <div className="intro__container flex__container">
            <img src={LeidingsFoto} alt="leiding KSA Oosterzele" className="round-image"/>
            <div className="flex__container--text">
              <div className="section-title__container">
                <h2 className="section-title">Wie zijn wij?</h2>
                <div className="section__title--border"></div>
              </div>
              <p>Elke <strong>zondagnamiddag</strong> organiseren wij toffe activiteiten voor <strong>jongens van
                  6 tot 16 jaar</strong> waar plezier en vriendschap centraal staat. <br/>Naast de
                zondagnamiddagen gaan wij elk jaar met alle leden op <strong>weekend en op kamp</strong>. Verder
                organiseert KSA Oosterzele verschillende <strong>evenementen</strong> zoals een fuif,
                eetfestijn, quiz, optredens en nog zo veel meer.
              </p>
              <span className="more__link"><a href="#takken">Klik voor meer informatie</a></span>
            </div>
          </div>
        </section>
      </div>

      <div className="page__container homepage__container">
        <section className="activities__section page__section">
          <div className="home__section--container">
            <div className="home__section--text">
              <div className="section-title__container">
                <h2 className="section-title">Komende evenementen</h2>
                <div className="section__title--border blue"></div>
              </div>
              <p>Hieronder kan u een paar van onze komende evenementen zien die wij organiseren. Klik op een activiteit om meer informatie te krijgen!</p>
              <ActivitiesList />
            </div>
          </div>
        </section>


        <section className="takken__section page__section" id="takken">
          <div className="home__section--container takken__section--container">
            <div className="home__section--text">
              <div className="section-title__container">
                <h2 className="section-title">Leeftijdgroepen</h2>
                <div className="section__title--border blue"></div>
              </div>
              <p>Wij geven leiding aan jongens van 6 tot 16 jaar, hier kan u zien tot welke tak jouw kind behoort door te klikken op een leeftijdsgroep.</p>
            </div>
            <Takken/>
          </div>
        </section>
      </div>	
    </>
  );
}

export default Home;
