import React from "react";
import { useState, useEffect, useRef } from "react";
import "./inschrijven.css";
import TakTeaser from "../../components/inschrijven/takTeaser";
import InschrijvingModel from "../../models/InschrijvingModel";
import TeaserForm from "../../components/inschrijven/teaserForm";
import InschrijvenForm from "../../components/inschrijven/inschrijvenForm";
import { sendInschrijving } from "../../services/inschrijvingenService";
import ConfirmPopup from "../../components/inschrijven/popups/confirmPopup";

const Inschrijven = () => {
    const scrollRef = useRef(null);

    const [inschrijving, setInschrijving] = useState(new InschrijvingModel());
    const [errorStates, setErrorStates] = useState({
        takError: "",
        voornaamError: "",
        achternaamError: "",
        geboortedatumError: "",
        geslachtError: "",
        geboorteplaatsError: "",
        voornaamOuderError: "",
        achternaamOuderError: "",
        straatEnHuisnummerError: "",
        postcodeError: "",
        gemeenteError: "",
        gsmNummerError: "",
        telefoonnummerError: "",
        emailError: "",
        gsmError: "",
        tweedeVoornaamOuderError: "",
        tweedeAchternaamOuderError: "",
        tweedeStraatEnHuisnummerError: "",
        tweedePostcodeError: "",
        tweedeGemeenteError: "",
        tweedeGsmNummerError: "",
        tweedeTelefoonnummerError: "",
        tweedeEmailError: "",
        allowMediaError: "",
    });

    const [activateFullForm, setActivateFullForm] = useState(false);
    const [isPending , setIsPending] = useState(false);
    const [succesfulIngeschreven, setSuccesfulIngeschreven] = useState(false);
    const [confirmPopupActive, setConfirmPopupActive] = useState(false);

    useEffect(() => {
        console.log(inschrijving)
    }, [inschrijving]);

    useEffect(() => {
        if (activateFullForm) {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [activateFullForm]);

    const handleInputChange = (field, value) => {
        setInschrijving((prevInschrijving) => {
            // ik weet dat dit geen clean code is maar het kan me de ballen schelen
            const updatedInschrijving = new InschrijvingModel();
            updatedInschrijving.tak = prevInschrijving.tak;
            updatedInschrijving.voornaam = prevInschrijving.voornaam;
            updatedInschrijving.achternaam = prevInschrijving.achternaam;
            updatedInschrijving.geboortedatum = prevInschrijving.geboortedatum;
            updatedInschrijving.geslacht = prevInschrijving.geslacht;
            updatedInschrijving.geboorteplaats = prevInschrijving.geboorteplaats;

            updatedInschrijving.voornaamOuder = prevInschrijving.voornaamOuder;
            updatedInschrijving.achternaamOuder = prevInschrijving.achternaamOuder;
            updatedInschrijving.straatEnHuisnummer = prevInschrijving.straatEnHuisnummer;
            updatedInschrijving.postcode = prevInschrijving.postcode;
            updatedInschrijving.gemeente = prevInschrijving.gemeente;
            updatedInschrijving.gsmNummer = prevInschrijving.gsmNummer;
            updatedInschrijving.telefoonnummer = prevInschrijving.telefoonnummer;
            updatedInschrijving.email = prevInschrijving.email;

            updatedInschrijving.tweedeVoornaamOuder = prevInschrijving.tweedeVoornaamOuder;
            updatedInschrijving.tweedeAchternaamOuder = prevInschrijving.tweedeAchternaamOuder;
            updatedInschrijving.tweedeStraatEnHuisnummer = prevInschrijving.tweedeStraatEnHuisnummer;
            updatedInschrijving.tweedePostcode = prevInschrijving.tweedePostcode;
            updatedInschrijving.tweedeGemeente = prevInschrijving.tweedeGemeente;
            updatedInschrijving.tweedeGsmNummer = prevInschrijving.tweedeGsmNummer;
            updatedInschrijving.tweedeTelefoonnummer = prevInschrijving.tweedeTelefoonnummer;
            updatedInschrijving.tweedeEmail = prevInschrijving.tweedeEmail;
            updatedInschrijving.allowMedia = prevInschrijving.allowMedia;
      
            updatedInschrijving[field] = value;

            const errorField = field + "Error";
            let updatedErrorStates = errorStates;
            updatedErrorStates[errorField] = "";
            setErrorStates(updatedErrorStates);
            return updatedInschrijving;
          });
    };

    const showConfirmPopup = (e) => {
        e.preventDefault();
        setConfirmPopupActive(true);
    }

    const submitValues = (e) => {
        e.preventDefault();
        setIsPending(true);
        sendInschrijving(inschrijving).then((data) => {
            console.log(data.errors)
            if (data.errors) {
                const updatedErrorStates = {};
                for (const field in errorStates) {
                    if (data.errors[field]) {
                        updatedErrorStates[field] = data.errors[field];
                    } else {
                        updatedErrorStates[field] = '';
                    }
                }
                setErrorStates(updatedErrorStates);
                setTimeout(() => {
                    if (scrollRef.current) {
                        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 200);
            } else if(data === "Inschrijving verzonden") {
                console.log(data);
                setSuccesfulIngeschreven(true)
            }
            setIsPending(false);
        }).catch((error) => {
            console.log(error);
            setIsPending(false);
        });
    }

    useEffect(() => {
        //console.log(errorStates);
    }, [errorStates]);

    return (
        <div className="page__container">
        <section className="page__section">
            <div className="flex__container--text">
                <div className="section-title__container">
                    <h2 ref={scrollRef} className="section-title">Uw kind Inschrijven</h2>
                    <div className="section__title--border blue"></div>
                </div>
            </div>
            {!succesfulIngeschreven &&
            <div className="inschrijven__container">
                <p >Wat leuk dat je uw kind wil laten meegenieten van de leuke activiteiten van KSA Oosterzele!</p>
                <p>Bij vragen of andere opmerkingen kan u ons altijd contacteren.</p>
                <div className="teaser__wrapper">
                    <TeaserForm 
                        setActivateFullForm={setActivateFullForm} 
                        activateFullForm={activateFullForm} 
                        setInschrijving={setInschrijving} 
                        inschrijving={inschrijving}
                        handleInputChange={handleInputChange}
                        />
                    <TakTeaser 
                        tak={inschrijving.tak} 
                        handleInputChange={handleInputChange}/>
                        
                    {errorStates.takError && 
                        <label style={{gridColumn: 2}} className={"label" + (errorStates.takError ? ' error' : '')}>
                            <small className="error-message">{errorStates.takError}</small>
                        </label>
                    }
                </div>
                {activateFullForm &&
                    <InschrijvenForm
                        activateFullForm={activateFullForm}
                        inschrijving={inschrijving}
                        handleInputChange={handleInputChange}
                        submitValues={showConfirmPopup}
                        errorStates={errorStates}
                        isPending={isPending}
                    />
                }
                {confirmPopupActive &&
                    <ConfirmPopup onClose={() => setConfirmPopupActive(false)} handleInputChange={handleInputChange} submitValues={submitValues} inschrijving={inschrijving}></ConfirmPopup>}
            </div>
        }
        {succesfulIngeschreven &&
            <div className="inschrijven__container">
                <p><strong>Uw inschrijving is succesvol verzonden!</strong></p>
                <p>U zal een bevestigingsmail ontvangen op het opgegeven emailadres.</p>
                <p>Indien u geen bevestigingsmail ontvangt of andere problemen heeft, gelieve ons te contacteren.</p>
            </div>
        }
        </section>
        </div>
    );
}

export default Inschrijven;