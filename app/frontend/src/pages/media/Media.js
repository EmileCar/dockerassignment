import React from "react";
import "./media.css";

function Media() {
    return (
        <div className="page__container">
            <section className="page__section">
                <div className="media__section--text">
                    <div className="section-title__container">
                        <h2 className="section-title">Foto en video</h2>
                        <div className="section__title--border blue"></div>
                    </div>
                    <p>
                        Hier kun je een paar van de beste foto's zien die we tijdens onze vergaderingen of ons kamp nemen. De meeste foto's worden op Facebook gepost.
                    </p>
                    {/* <form className="mediaselector-form" method="POST">
                        <select name="mediaselector" id="mediaselector" className="mediaselector">
                        <option value="all">Alle foto's</option>
                        <option value="vergaderingen">Vergaderingen</option>
                        <option value="kamp2021">Kamp 2021</option>
                        <option value="kamp2020">Kamp 2020</option>
                        </select>
                    </form> */}
                </div>
                <div className="page__section__container">
                    <div className="media__category__container">
                        <h2>Kampen</h2>
                        <div className="media__items">
                        <a className="media__item" href="https://www.facebook.com/media/set/?set=a.5628410053917662&type=3">
                            <img src="assets/media/kampen/kamp2022paliseul/default.jpg" alt="Kamp 2022 Paliseul" />
                            <p>Kamp 2022 Paliseul</p>
                        </a>
                        <a className="media__item" href="https://www.facebook.com/media/set/?set=a.4250347185057296" target="_blank" rel="noopener noreferrer">
                            <img src="assets/media/kampen/kamp2021wanne/default.jpg" alt="Kamp 2021 Wanne" />
                            <p>Kamp 2021 Wanne</p>
                        </a>
                        <a className="media__item" href="https://www.facebook.com/media/set/?set=a.3210308882394470&type=3" target="_blank" rel="noopener noreferrer">
                            <img src="assets/media/kampen/kamp2020durbuy/default.jpg" alt="Kamp 2020 Durbuy" />
                            <p>Kamp 2020 Durbuy</p>
                        </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Media;