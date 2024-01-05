import React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const ConfirmPopup = (props) => {
    const [allowMedia, setAllowMedia] = useState(props.inschrijving.allowMedia ? props.inschrijving.allowMedia : null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmPrivacy, setConfirmPrivacy] = useState(null);
    const [showFinal, setShowFinal] = useState(false);
    const [confirmFinal, setConfirmFinal] = useState(null);

    const scrollRef = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRefFinal = useRef(null);

    const closeHandler = () => {
        props.onClose(false);
    };

    const submitHandler = (e) => {
        props.onClose(false);
        props.submitValues(e);
    }

    useEffect(() => {
        if(allowMedia === "ja" || allowMedia === "nee") {
            setShowConfirm(true);
            props.handleInputChange("allowMedia", allowMedia)
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [allowMedia]);

    useEffect(() => {
        if(confirmPrivacy === "ja" || confirmPrivacy === "nee") {
            setShowFinal(true);
            setTimeout(() => {
                if (scrollRef2.current) {
                    scrollRef2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [confirmPrivacy]);

    useEffect(() => {
        if(confirmFinal === "ja") {
            setTimeout(() => {
                if (scrollRefFinal.current) {
                    scrollRefFinal.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [confirmFinal]);

    return (
    <div className="overlay">
        <div className="popup">
            <div className="section-title__container">
                <h2 className="section-title">Bevestig inschrijving</h2>
                <div className="section__title--border blue"></div>
            </div>
            <span className="close" onClick={closeHandler}>
                &times;
            </span>
            
            <div className="confirm__container">
                <div>
                    <p>Doorheen het jaar worden er foto’s en filmpjes gemaakt van de activiteiten om die op de website en sociale media van KSA Oosterzele te plaatsen.</p>
                    <p>Geeft u toestemming dat er beeldmateriaal van uw kind gemaakt mag worden voor deze publicatie?</p>
                </div>
                <div className="buttons">
                    <span
                        className={`button inherit-font ${allowMedia === "ja" ? "active" : "button-inverted"}`}
                        onClick={() => setAllowMedia("ja")}
                    >
                        Ja
                    </span>                        
                    <span
                        className={`button inherit-font ${allowMedia === "nee" ? "active" : "button-inverted"}`}
                        onClick={() => setAllowMedia("nee")}
                    >
                        Nee
                    </span>                     
                </div>
                {showConfirm && 
                <>
                    <p>
                        De ingevulde persoonsgegevens worden bewaard en verwerkt door KSA Reik je hand Oosterzele. 
                    </p>    
                    <p>
                        De gegevens gebruiken we om u te contacteren en op de hoogte te houden van onze werking en activiteiten. 
                    </p>
                    <p>
                        Bovendien geven we de gegevens door aan KSA Nationaal vzw via het digitaal ledenbestand (Digit) voor de aansluiting bij KSA Nationaal vzw, voor het afsluiten van de nodige verzekeringen en het versturen van de leden- en leidingstijdschriften. 
                        Meer informatie over ons beleid rond gegevensverwerking en uw rechten omtrent uw gegevens vindt u in onze privacyverklaring op <a target="_blank" href="https://www.ksa.be/privacyverklaring">www.ksa.be/privacyverklaring</a>. 
                    </p>
                    <p className="margin-top">
                        Begrijpt u deze privacyverklaring en gaat u ermee akkoord?
                    </p>
                    <div className="buttons" ref={scrollRef}>
                        <span
                            className={`button inherit-font ${confirmPrivacy === "ja" ? "active" : "button-inverted"}`}
                            onClick={() => setConfirmPrivacy("ja")}
                        >
                            Ja
                        </span>                                           
                    </div>
                </> 
                }
                {showFinal && 
                <>
                    <p><strong>
                        De verstuurder verklaart dat de ingevulde gegevens volledig en correct zijn, en geeft de uitdrukkelijke toestemming met de verwerking ervan. 
                    </strong></p>
                    <p>De inschrijving wordt pas volledig voltooid wanneer het lidgeld (50 euro) gestort is op de KSA-Rekening BE22390023172547</p>
                    <div className="buttons"  ref={scrollRef2}>
                        <span
                            className={`button inherit-font ${confirmFinal === "ja" ? "active" : "button-inverted"}`}
                            onClick={() => setConfirmFinal("ja")}
                        >
                            Ja
                        </span>                                           
                    </div>
                </> 
                }
                {confirmFinal === "ja" &&
                <div className="takken__submit-container" ref={scrollRefFinal}>
                    <button
                        className={`button submit-button inherit-font`}
                        onClick={submitHandler}
                    >
                        Verstuur inschrijving
                    </button>
                </div>
                }
            </div>
        </div>
    </div>
)};

ConfirmPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inschrijving: PropTypes.object.isRequired,
    submitValues: PropTypes.func.isRequired,
};
export default ConfirmPopup;