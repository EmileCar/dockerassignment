import React from "react";
import {useState, useEffect, useRef} from "react";

const InschrijvenForm = ({ activateFullForm, inschrijving, handleInputChange, submitValues, errorStates, isPending }) => {
    const scrollRef = useRef(null);

    const [tweedeVerblijfplaatsActive, setTweedeVerblijfplaatsActive] = useState(false);
    const [tweedeVerblijfplaatsValue, setTweedeVerblijfplaatsValue] = useState("");

    useEffect(() => {
        if (tweedeVerblijfplaatsValue === "ja") {
            setTweedeVerblijfplaatsActive(true);
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if(tweedeVerblijfplaatsValue === "nee"){
            setTweedeVerblijfplaatsActive(false);
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [tweedeVerblijfplaatsValue]);

    if (!activateFullForm) {
        return null;
    }

    if (isPending) {
        return <p>Aan het laden...</p>;
    }
 
    return (
      <div className="inschrijvenForm__wrapper">
        <p>Vul hier de rest van de gegevens in</p>
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
            <div className="break"> 
                <p>Vul hier gegevens van eerste verblijfplaats in</p>
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
            <div className="break">
                <label>
                    <p>Is er sprake van een eventuele tweede verblijfplaats?</p>
                    <div className="buttons">
                        <span
                            className={`button inherit-font ${tweedeVerblijfplaatsValue === "ja" ? "active" : "button-inverted"}`}
                            onClick={() => setTweedeVerblijfplaatsValue("ja")}
                        >
                            Ja
                        </span>                        
                        <span
                            className={`button inherit-font ${tweedeVerblijfplaatsValue === "nee" ? "active" : "button-inverted"}`}
                            onClick={() => setTweedeVerblijfplaatsValue("nee")}
                        >
                            Nee
                        </span>                     
                    </div>
                </label>
            </div>
            {tweedeVerblijfplaatsActive && (
                <>
                    <div className="form-group">
                        <label className={"label" + (errorStates.tweedeVoornaamOuderError ? ' error' : '')}>
                            Voornaam ouder/voogd:
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
                            Achternaam ouder/voogd:
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
                        Straat + huisnummer:
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
                            Postcode:
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
                            Gemeente:
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
                            Gsm-nummer:
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
                            Telefoonnummer/Gsm 2:
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
                            Email:
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
                </>
            )}
            
            {(tweedeVerblijfplaatsValue === "ja" || tweedeVerblijfplaatsValue === "nee") && (
                <div ref={scrollRef} className="break">
                    <p>Als alle gegevens in orde zijn, kun je verdergaan naar het bevestigingscherm met verdere info</p>
                    <button onClick={(e) => submitValues(e)} className="button inherit-font submit-button">Ga verder</button>
                </div>
            )}
        </form>
      </div>
    );
  };
  
  export default InschrijvenForm;
  
