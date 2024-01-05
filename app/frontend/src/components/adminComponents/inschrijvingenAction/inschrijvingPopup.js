import React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import InschrijvingModel from "../../../models/InschrijvingModel";
import { updateInschrijving } from "../../../services/inschrijvingenService";

const InschrijvingPopup = (props) => {

    const scrollRef = useRef(null);
    const [inschrijving, setInschrijving] = useState(props.inschrijving)
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

    if(!props.inschrijving){
        return;
    }

    const handleInputChange = (field, value) => {
        setInschrijving((prevInschrijving) => {
            // ik weet dat dit geen clean code is maar het kan me de ballen schelen
            const updatedInschrijving = new InschrijvingModel();
            updatedInschrijving.id = prevInschrijving.id;
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

    const closeHandler = () => {
        props.onClose();
    };

    const submitValues = (e) => {
        e.preventDefault()
        updateInschrijving(inschrijving).then((data) => {
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
                if(scrollRef.current){
                    scrollRef.current.scrollIntoView({behavior: "smooth"});
                }
            } else if(data === "Inschrijving updated") {
                console.log(data);
                props.onClose();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function formatDatabaseDateTime(dateTimeString) {
        const options = {
          timeZone: 'Europe/Brussels',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
      
        const date = new Date(dateTimeString);
        return new Intl.DateTimeFormat('nl-NL', options).format(date);
      }

    return (
    <div className="overlay">
        <div className="popup">
            <div className="section-title__container">
                <h2 className="section-title">Inschrijving Detail</h2>
                <div className="section__title--border blue"></div>
            </div>
            <span className="close" onClick={closeHandler}>
                &times;
            </span>
            
            <div className="confirm__container">
                <p><strong>{props.inschrijving.voornaam + " " +  props.inschrijving.achternaam}</strong> voor de <strong>{props.inschrijving.tak}</strong></p>
                <p>Ingeschreven op: {formatDatabaseDateTime(props.inschrijving.created_at)}</p>
                <p>Laatst aangepast op: {formatDatabaseDateTime(props.inschrijving.updated_at)}</p>

                <div ref={scrollRef}>
                    <form className="inschrijvenForm">
                        <div className="form-group">
                        <label className={"label" + (errorStates.voornaamError ? ' error' : '')}>
                                Voornaam lid:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.voornaam}
                                onChange={(e) => handleInputChange("voornaam", e.currentTarget.value)}
                                type="text"
                                name="voornaam"
                                placeholder="Voornaam"
                                />
                                {errorStates.voornaamError && <small className="error-message">{errorStates.voornaamError}</small>}
                            </label>
                            <label className={"label" + (errorStates.achternaamError ? ' error' : '')}>
                                Achternaam lid:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.achternaam}
                                onChange={(e) => handleInputChange("achternaam", e.currentTarget.value)}
                                type="text"
                                name="achternaam"
                                placeholder="Achternaam"
                                />
                                {errorStates.achternaamError && <small className="error-message">{errorStates.achternaamError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <div className="form-group__half">
                                <label className={"label" + (errorStates.geboortedatumError ? ' error' : '')}>
                                    Geboortedatum:
                                    <span className="verplicht">*</span>
                                    <input
                                    className="input"
                                    value={inschrijving.geboortedatum}
                                    onChange={(e) => handleInputChange("geboortedatum", e.currentTarget.value)}
                                    type="date"
                                    name="geboortedatum"
                                    placeholder="Geboortedatum"
                                    />
                                    {errorStates.geboortedatumError && <small className="error-message">{errorStates.geboortedatumError}</small>}
                                </label>
                                <label className={"label geslacht-label" + (errorStates.geslachtError ? ' error' : '')}>
                                    Geslacht:
                                    <span className="verplicht">*</span>
                                    <select
                                        className="input"
                                        value={inschrijving.geslacht}
                                        onChange={(e) => handleInputChange("geslacht", e.currentTarget.value)}
                                        name="geslacht"
                                    >
                                        <option value="M">M</option>
                                        <option value="X">X</option>
                                    </select>
                                    {errorStates.geslachtError && <small className="error-message">{errorStates.geslachtError}</small>}
                                </label>
                            </div>
                            <label className={"label" + (errorStates.geboorteplaatsError ? ' error' : '')}>
                                Geboorteplaats:
                                <input
                                className="input"
                                value={inschrijving.geboorteplaats}
                                onChange={(e) => handleInputChange("geboorteplaats", e.currentTarget.value)}
                                type="text"
                                name="geboorteplaats"
                                placeholder="Geboorteplaats"
                                />
                                {errorStates.geboorteplaatsError && <small className="error-message">{errorStates.geboorteplaatsError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.voornaamOuderError ? ' error' : '')}>
                                Voornaam ouder/voogd:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.voornaamOuder}
                                onChange={(e) => handleInputChange("voornaamOuder", e.currentTarget.value)}
                                type="text"
                                name="Voornaam ouder/voogd"
                                placeholder="Voornaam"
                                />
                                {errorStates.voornaamOuderError && <small className="error-message">{errorStates.voornaamOuderError}</small>}
                            </label>
                            <label className={"label" + (errorStates.achternaamOuderError ? ' error' : '')}>
                                Achternaam ouder/voogd:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.achternaamOuder}
                                onChange={(e) => handleInputChange("achternaamOuder", e.currentTarget.value)}
                                type="text"
                                name="Achternaam ouder/voogd"
                                placeholder="Achternaam"
                                />
                                {errorStates.achternaamOuderError && <small className="error-message">{errorStates.achternaamOuderError}</small>}
                            </label>
                        </div>
                        <label className={"label" + (errorStates.straatEnHuisnummerError ? ' error' : '')}>
                            Straat + huisnummer:
                            <span className="verplicht">*</span>
                            <input
                            className="input"
                            value={inschrijving.straatEnHuisnummer}
                            onChange={(e) => handleInputChange("straatEnHuisnummer", e.currentTarget.value)}
                            type="text"
                            name="straatEnHuisnummer"
                            placeholder="Straat + huisnummer"
                            />
                            {errorStates.straatEnHuisnummerError && <small className="error-message">{errorStates.straatEnHuisnummerError}</small>}
                        </label>
                        <div className="form-group">
                            <label className={"label" + (errorStates.postcodeError ? ' error' : '')}>
                                Postcode:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.postcode}
                                onChange={(e) => handleInputChange("postcode", e.currentTarget.value)}
                                type="text"
                                name="postcode"
                                placeholder="Postcode"
                                />
                                {errorStates.postcodeError && <small className="error-message">{errorStates.postcodeError}</small>}
                            </label>
                            <label className={"label" + (errorStates.gemeenteError ? ' error' : '')}>
                                Gemeente:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.gemeente}
                                onChange={(e) => handleInputChange("gemeente", e.currentTarget.value)}
                                type="text"
                                name="gemeente"
                                placeholder="Gemeente"
                                />
                                {errorStates.gemeenteError && <small className="error-message">{errorStates.gemeenteError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.gsmNummerError ? ' error' : '')}>
                                Gsm-nummer:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.gsmNummer}
                                onChange={(e) => handleInputChange("gsmNummer", e.currentTarget.value)}
                                type="text"
                                name="gsmNummer"
                                placeholder="Gsm-nummer"
                                />
                                {errorStates.gsmNummerError && <small className="error-message">{errorStates.gsmNummerError}</small>}
                            </label>
                            <label className={"label" + (errorStates.telefoonnummerError ? ' error' : '')}>
                                Telefoonnummer/Gsm 2:
                                <input
                                className="input"
                                value={inschrijving.telefoonnummer}
                                onChange={(e) => handleInputChange("telefoonnummer", e.currentTarget.value)}
                                type="text"
                                name="telefoonnummer"
                                placeholder="Telefoonnummer"
                                />
                                {errorStates.telefoonnummerError && <small className="error-message">{errorStates.telefoonnummerError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.emailError ? ' error' : '')}>
                                Email:
                                <span className="verplicht">*</span>
                                <input
                                className="input"
                                value={inschrijving.email}
                                onChange={(e) => handleInputChange("email", e.currentTarget.value)}
                                type="text"
                                name="email"
                                placeholder="Email"
                                />
                                {errorStates.emailError && <small className="error-message">{errorStates.emailError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.tweedeVoornaamOuderError ? ' error' : '')}>
                                Voornaam tweede ouder/voogd:
                                <input
                                className="input"
                                value={inschrijving.tweedeVoornaamOuder}
                                onChange={(e) => handleInputChange("tweedeVoornaamOuder", e.currentTarget.value)}
                                type="text"
                                name="Voornaam tweede ouder/voogd"
                                placeholder="Voornaam"
                                />
                                {errorStates.tweedeVoornaamOuderError && <small className="error-message">{errorStates.tweedeVoornaamOuderError}</small>}
                            </label>
                            <label className={"label" + (errorStates.tweedeAchternaamOuderError ? ' error' : '')}>
                                Achternaam tweede ouder/voogd:
                                <input
                                className="input"
                                value={inschrijving.tweedeAchternaamOuder}
                                onChange={(e) => handleInputChange("tweedeAchternaamOuder", e.currentTarget.value)}
                                type="text"
                                name="Achternaam tweede ouder/voogd"
                                placeholder="Achternaam"
                                />
                                {errorStates.tweedeAchternaamOuderError && <small className="error-message">{errorStates.tweedeAchternaamOuderError}</small>}
                            </label>
                        </div>
                        <label className={"label" + (errorStates.tweedeStraatEnHuisnummerError ? ' error' : '')}>
                            Tweede Straat + huisnummer:
                            <input
                            className="input"
                            value={inschrijving.tweedeStraatEnHuisnummer}
                            onChange={(e) => handleInputChange("tweedeStraatEnHuisnummer", e.currentTarget.value)}
                            type="text"
                            name="tweedeStraatEnHuisnummer"
                            placeholder="Straat + huisnummer"
                            />
                            {errorStates.tweedeStraatEnHuisnummerError && <small className="error-message">{errorStates.tweedeStraatEnHuisnummerError}</small>}
                        </label>
                        <div className="form-group">
                            <label className={"label" + (errorStates.tweedePostcodeError ? ' error' : '')}>
                                Tweede Postcode:
                                <input
                                className="input"
                                value={inschrijving.tweedePostcode}
                                onChange={(e) => handleInputChange("tweedePostcode", e.currentTarget.value)}
                                type="text"
                                name="tweedePostcode"
                                placeholder="Postcode"
                                />
                                {errorStates.tweedePostcodeError && <small className="error-message">{errorStates.tweedePostcodeError}</small>}
                            </label>
                            <label className={"label" + (errorStates.tweedeGemeenteError ? ' error' : '')}>
                                Tweede Gemeente:
                                <input
                                className="input"
                                value={inschrijving.tweedeGemeente}
                                onChange={(e) => handleInputChange("tweedeGemeente", e.currentTarget.value)}
                                type="text"
                                name="tweedeGemeente"
                                placeholder="Gemeente"
                                />
                                {errorStates.tweedeGemeenteError && <small className="error-message">{errorStates.tweedeGemeenteError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.tweedeGsmNummerError ? ' error' : '')}>
                                Tweede Gsm-nummer:
                                <input
                                className="input"
                                value={inschrijving.tweedeGsmNummer}
                                onChange={(e) => handleInputChange("tweedeGsmNummer", e.currentTarget.value)}
                                type="text"
                                name="tweedeGsmNummer"
                                placeholder="Gsm-nummer"
                                />
                                {errorStates.tweedeGsmNummerError && <small className="error-message">{errorStates.tweedeGsmNummerError}</small>}
                            </label>
                            <label className={"label" + (errorStates.tweedeTelefoonnummerError ? ' error' : '')}>
                                Tweede Telefoonnummer/Gsm 2:
                                <input
                                className="input"
                                value={inschrijving.tweedeTelefoonnummer}
                                onChange={(e) => handleInputChange("tweedeTelefoonnummer", e.currentTarget.value)}
                                type="text"
                                name="tweedeTelefoonnummer"
                                placeholder="Telefoonnummer"
                                />
                                {errorStates.tweedeTelefoonnummerError && <small className="error-message">{errorStates.tweedeTelefoonnummerError}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"label" + (errorStates.tweedeEmailError ? ' error' : '')}>
                                Tweede Email:
                                <input
                                className="input"
                                value={inschrijving.tweedeEmail}
                                onChange={(e) => handleInputChange("tweedeEmail", e.currentTarget.value)}
                                type="text"
                                name="tweedeEmail"
                                placeholder="Email"
                                />
                                {errorStates.tweedeEmailError && <small className="error-message">{errorStates.tweedeEmailError}</small>}
                            </label>
                        </div>
                        <label className={"label" + (errorStates.takError ? ' error' : '')}>
                            Tak van het lid
                            <select
                            className="input"
                            value={inschrijving.tak}
                            onChange={(e) => handleInputChange("tak", e.currentTarget.value)}
                            name="tak"
                        >
                            <option value="Leeuwkes">Leeuwkes</option>
                            <option value="Jongknapen">Jongknapen</option>
                            <option value="Knapen">Knapen</option>
                            <option value="Jonghernieuwers">Jonghernieuwers</option>
                        </select>
                            {errorStates.takError && <small className="error-message">{errorStates.takError}</small>}
                        </label>
                        <button onClick={(e) => submitValues(e)} className="button inherit-font submit-button">Ga verder</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
)};

InschrijvingPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    inschrijving: PropTypes.object.isRequired,
};
export default InschrijvingPopup;