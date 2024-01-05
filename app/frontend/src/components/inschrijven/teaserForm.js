import React from "react";
import { useState, useEffect } from "react";
import InschrijvingModel from "../../models/InschrijvingModel";

const TeaserForm = ({ setActivateFullForm, activateFullForm, setInschrijving, inschrijving, handleInputChange }) => {
  const [name, setName] = useState("");
  const [tak, setTak] = useState("");
  const [nameError, setNameError] = useState("");
  const [takError, setTakError] = useState("");

  useEffect(() => {
    if (name !== "" && tak !== "" && !activateFullForm) {
        const teaserObject = new InschrijvingModel();
        teaserObject.voornaam = name.split(" ")[0];
        teaserObject.achternaam = name.split(" ").slice(1).join(" ");
        teaserObject.tak = tak.split(" ")[0];
        let errors = teaserObject.validateTeaser();
        if (errors.length === 0) {
            setInschrijving(teaserObject);
            setActivateFullForm(true);
            setNameError("");
            setTakError("");
        } else {
            if (errors.some(error => error.field === "voornaam")) {
                setNameError(errors.find(error => error.field === "voornaam").message);
            } else {
                setNameError("");
            }
            if (errors.some(error => error.field === "tak")) {
                setTakError(errors.find(error => error.field === "tak").message);
            } else {
                setTakError("");
            }
            setInschrijving(teaserObject)
        }
    }
  }, [name, tak]);

  useEffect(() => {
    const takValue = tak.split(" ")[0];
    if (activateFullForm) {
      handleInputChange("tak", takValue)
    }
  }, [tak]);

  return (
    <form className="teaserForm">
      <label className={"label" + (nameError ? ' error' : '')}>
        Vul hier de naam van uw kind in:
        <input
          className="input"
          type="text"
          name="name"
          value={activateFullForm ? inschrijving.voornaam + " " + inschrijving.achternaam : name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Voornaam Achternaam"
          disabled={activateFullForm}
        />
        {nameError && !activateFullForm && <small className="error-message">{nameError}</small>}
      </label>
      <label className={"label" + (takError ? ' error' : '')}>
        In welk studiejaar zit uw kind?
        <select
          className="input"
          value={tak}
          onChange={(e) => setTak(e.currentTarget.value)}
          name="tak"
      >
          <option value="Leeuwkes 1">1ste leerjaar</option>
          <option value="Leeuwkes 2">2de leerjaar</option>
          <option value="Leeuwkes 3 ">3de leerjaar</option>
          <option value="Jongknapen 2">4de leerjaar</option>
          <option value="Jongknapen 3">5de leerjaar</option>
          <option value="Knapen 1">6de leerjaar</option>
          <option value="Knapen 2 ">1ste middelbaar</option>
          <option value="Knapen 3">2de middelbaar</option>
          <option value="Jonghernieuwers 1">3de middelbaar</option>
          <option value="Jonghernieuwers 2 ">4de middelbaar</option>
          <option value="Jonghernieuwers 3">5de middelbaar</option>
          <option value="Ander">Ander</option>
      </select>
        {takError && !activateFullForm && <small className="error-message">{takError}</small>}
      </label>
    </form>
  );
}

export default TeaserForm;
