import React, { useState, useEffect } from "react";
import LeeuwkesTak from "../../assets/img/takken/leeuwkes.jpg";
import JongKnapenTak from "../../assets/img/takken/jongknapen.jpg";
import Knapen from "../../assets/img/takken/knapen.jpg";
import JongHernieuwers from "../../assets/img/takken/jonghernieuwers.jpg";
import ChooseTakPopup from "./popups/chooseTakPopup";

const assignedTakToImage = {
    "Leeuwkes": LeeuwkesTak,
    "Jongknapen": JongKnapenTak,
    "Knapen": Knapen,
    "Jonghernieuwers": JongHernieuwers,
  };

const TakTeaser = ({ tak, handleInputChange }) => {
    const [assignedTak, setAssignedTak] = useState(null);
    const [isPopupActive, setIsPopupActive] = useState(false);

    useEffect(() => {
        if (tak === null) {
            setAssignedTak(null);
            return;
        }
        console.log(tak)
        if (tak === "Leeuwkes" || tak === "Jongknapen" || tak === "Knapen" || tak === "Jonghernieuwers") {
          setAssignedTak(tak);
        } else if (tak === "Ander") {
          setAssignedTak("Ander");
        } else {
          setAssignedTak(null);
        }
        
    }, [tak]);

    const image = assignedTakToImage[assignedTak];

    return (
        <div className="takTeaser__container">
          {assignedTak && (
            <div className="takTeaser__wrapper">
              {assignedTak === 'Ander' ? (
                <p className="cursive" onClick={() => setIsPopupActive(true)}>Klik hier om de leeftijdsgroep te kiezen</p>
              ) : (
                <>
                  <img src={image} alt={`${assignedTak} KSA Oosterzele tak`} className="tak-img" />
                  <div>
                    Uw kind hoort bij de tak
                    <p className="assignedTak">{assignedTak}</p>
                  </div>
                  <p className="wrongTak cursive" onClick={() => setIsPopupActive(true)}>Niet juist? Klik hier</p>
                </>
              )}
            </div>
          )}
          {isPopupActive && <ChooseTakPopup onClose={setIsPopupActive} setTak={(tak) => handleInputChange("tak", tak)}/>}
        </div>
    );
}

export default TakTeaser;
