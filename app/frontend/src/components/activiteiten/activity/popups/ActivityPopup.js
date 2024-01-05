import React from "react";
import { useEffect, useState, useRef } from "react";
import "../activityAdmin.css";
import PropTypes from "prop-types";
import { getImagePaths } from "../../../../services/activitiesService";
import { AutoComplete } from "primereact/autocomplete";

const ActivityPopup = (props) => {
    const defaultActivity = {
        name: "",
        date: new Date(),
        time: "",
        location: "",
        description: "",
        imgpath: "",
        url: "",
        bigEvent: false
    };

    const [name, setName] = useState(props.activity?.name ?? defaultActivity.name);
    const [date, setDate] = useState(new Date(props.activity?.timestamp ?? defaultActivity.date));
    const [location, setLocation] = useState(props.activity?.location ?? defaultActivity.location);
    const [imgpath, setImgpath] = useState(props.activity?.imgpath ?? defaultActivity.imgpath);
    const [url, setUrl] = useState(props.activity?.url ?? defaultActivity.url);
    const [description, setDescription] = useState(props.activity?.description ?? defaultActivity.description);
    const [isBigEvent, setIsBigEvent] = useState(props.activity?.bigEvent ?? defaultActivity.bigEvent);

    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [imgpathError, setImgpathError] = useState("");
    const [urlError, setUrlError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [eventPassed, setEventPassed] = useState(false);

    const [imagePaths, setImagePaths] = useState([]);

    const closeHandler = () => {
        props.onClose(false);
    };

    function hasDatePassed() {  
        setEventPassed(date.setDate(date.getDate() + 1) < new Date());
    }

    const handleDateChange = (event) => {
        const newDate = new Date(event.target.value);
        console.log(newDate)
        console.log(formatCustomDateTime(newDate))
        setDate(newDate);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let submitDate = date;
        submitDate = new Date(submitDate.setDate(submitDate.getDate() - 1));
        console.log(formatCustomDateTime(submitDate));
        const newActivity = {
            name: name,
            date: formatDate(date),
            time: formatTime(date),
            timestamp: formatCustomDateTime(date),
            location: location,
            imgpath: imgpath,
            url: url,
            description: description,
            isBigEvent: (isBigEvent === "on" ? 1 : 0),
        };
        console.log(newActivity);
        const formValid = validateForm();
        if(formValid) {
            props.setActivityAction(newActivity);
        }
    };

    function formatCustomDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    }

    const formatDate = (date) => {
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        };
      
        return new Intl.DateTimeFormat('nl-NL', options).format(new Date(date));
      };
      
      // Format the time
      const formatTime = (date) => {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
        };
      
        return new Intl.DateTimeFormat('nl-NL', options).format(date);
      };
      
    useEffect(() => {
        setNameError("");
    }, [name]);

    useEffect(() => {
        setDateError("");
        console.log(date)
        hasDatePassed(date);
    }, [date]);

    useEffect(() => {
        setLocationError("");
    }, [location]);

    useEffect(() => {
        setImgpathError("");
    }, [imgpath]);

    useEffect(() => {
        setUrlError("");
    }, [url]);

    useEffect(() => {
        setDescriptionError("");
    }, [description]);
    
    
    const validateForm = () => {
        let valid = true;
        if(name === "") {
            setNameError("Naam is leeg");
            valid = false;
        }
        return valid;
    }

    const search = (event) => {
        getImagePaths().then((data) => {
            setImagePaths(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : data);
        });
    }

    return (
    <div className="overlay">
        <div className="popup">
            <div className="section-title__container">
                <h2 className="section-title">{props.title}</h2>
                <div className="section__title--border blue"></div>
            </div>
            <span className="close" onClick={closeHandler}>
                &times;
            </span>
            {props.isPending && <div>Loading...</div>}
            {props.globalError && <div className="error">{props.globalError}</div>}
            {!props.isPending && (
                <div className="content">
                {eventPassed && (<p className="error">Deze activiteit is in het verleden</p>)}
                <form className="activityForm">
                    <div className="activityForm-top">
                        <div className="activityForm-top__side">
                        <label className={"label" + (nameError ? ' error' : '')}>
                            Naam
                            <input
                            className="input"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            value={name}
                            />
                            {nameError && <small className="error-message">{nameError}</small>}
                        </label>
                        <label className={"label" + (dateError ? ' error' : '')}>
                            Datum
                            <input
                            className="input"
                            onChange={(e) => handleDateChange(e)}
                            type="datetime-local"
                            name="date"
                            value={formatCustomDateTime(date)}
                            />
                            {dateError && <small className="error-message">{dateError}</small>}
                        </label>
                        </div>
                        <div className="activityForm-top__side">
                        <label className={"label" + (locationError ? ' error' : '')}>
                            Locatie
                            <input
                            className="input"
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            name="location"
                            value={location}
                            />
                            {locationError && <small className="error-message">{locationError}</small>}
                        </label>
                        <label className={"label" + (imgpathError ? ' error' : '')}>
                            Imagepath
                            <AutoComplete 
                                value={imgpath}
                                placeholder="afbeeldingNaam.jpeg"
                                suggestions={imagePaths}
                                completeMethod={search} 
                                onChange={(e) => setImgpath(e.target.value)}
                                name="imgpath"
                                dropdown 
                                className="input input-dropdown"
                            />
                            {imgpathError && <small className="error-message">{imgpathError}</small>}
                        </label>
                        </div>
                    </div>

                    <label className={"label" + (descriptionError ? ' error' : '')}>
                        Beschrijving
                        <textarea
                        className="input"
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name="description"
                        value={description}
                        />
                        {descriptionError && <small className="error-message">{descriptionError}</small>}
                    </label>
                    <div className="activityForm-top">
                        <div className="activityForm-top__side">
                        <label>
                            Groot evenement
                            <input
                            id="customCheckbox"
                            className="custom-checkbox"
                            onChange={(e) => setIsBigEvent(e.target.value)}
                            type="checkbox"
                            name="bigEvent"
                            value={isBigEvent}
                            />
                            <label htmlFor="customCheckbox" className="checkbox-label"></label>
                        </label>
                        </div>
                        <div className="activityForm-top__side">
                        <label className={"label" + (urlError ? ' error' : '')}>
                            URL
                            <input
                            className="input"
                            onChange={(e) => setUrl(e.target.value)}
                            type="text"
                            name="url"
                            value={url}
                            />
                            {urlError && <small className="error-message">{urlError}</small>}
                        </label>
                        </div>
                    </div>
                    <button className="submit-button button inherit-font" onClick={handleSubmitForm}>
                        Save
                    </button>
                </form>
            </div>
            )}
        </div>
    </div>
)};

ActivityPopup.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  activity: PropTypes.object,
  setActivityAction: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};
export default ActivityPopup;