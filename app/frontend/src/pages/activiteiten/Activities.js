import React from "react";
import "./activities.css";
import ActivitiesList from "../../components/activiteiten/activitiesList";

function Activities() {
    return (
        <div className="page__container">
            <section className="page__section">
                <div className="media__section--text">
                <div className="section-title__container">
                    <h2 className="section-title">Activiteiten</h2>
                    <div className="section__title--border blue"></div>
                </div>
                <p>
                    Hier kun je onze alle activiteiten en evenementen zien die wij organiseren, klik op een activiteit om meer informatie te krijgen!
                </p>
                <br />
                </div>
                <p>
                Het ledenboekje van dit semester vind je hier:{" "}
                <a href="assets/ledenboekjes/ksaboekje-sep-dec-2023.pdf" className="cursive" download>
                    KSA prikbordboekje september-december 2023.pdf
                </a>
                </p>

                <div className="page__section__container">
                    <ActivitiesList />
                </div>
            </section>
        </div>
    );
}

export default Activities;