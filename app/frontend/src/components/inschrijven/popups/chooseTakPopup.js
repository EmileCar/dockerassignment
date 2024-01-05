import React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Takken from "../../takken/takken";

const ChooseTakPopup = (props) => {
    const [selectedTak, setSelectedTak] = useState(null);

    const closeHandler = () => {
        props.onClose(false);
    };

    const setTak = (tak) => {
        setSelectedTak(tak);
    }

    const submitHandler = () => {
        props.setTak(selectedTak);
        props.onClose(false);
    }

    return (
    <div className="overlay">
        <div className="popup">
            <div className="section-title__container">
                <h2 className="section-title">Takken</h2>
                <div className="section__title--border blue"></div>
            </div>
            <span className="close" onClick={closeHandler}>
                &times;
            </span>
            <Takken setTak={setTak}></Takken>
            <div className="takken__submit-container">
                {selectedTak && <button className="submit-button button inherit-font" onClick={submitHandler}>Kies deze tak</button>}
            </div>
        </div>
    </div>
)};

ChooseTakPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    setTak: PropTypes.func.isRequired,
};
export default ChooseTakPopup;