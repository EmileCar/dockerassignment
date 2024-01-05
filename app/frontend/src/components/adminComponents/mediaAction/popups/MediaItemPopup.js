import React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Toast } from 'primereact/toast';
import { addMediaItem, uploadFile } from "../../../../services/mediaService";

const MediaItemPopup = (props) => {
    const defaultMediaItem = {
        name: "",
        fileName: "",
        active: false,
        date: new Date(),
    };

    const [name, setName] = useState(props.mediaItem?.name ?? defaultMediaItem.name);
    const [date, setDate] = useState(new Date(props.mediaItem?.date ?? defaultMediaItem.date));
    const [fileName, setFileName] = useState(props.mediaItem?.fileName ?? defaultMediaItem.fileName); // TODO: Remove this line
    
    const [file, setFile] = useState(null);

    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [fileNameError, setFileNameError] = useState("");
    const [fileError, setFileError] = useState("");
    const [filePreview, setFilePreview] = useState(null);
    const [globalError, setGlobalError] = useState("");
    const toast = useRef(null);


    const closeHandler = () => {
        props.onClose(false);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (file || fileName) {
            const dateObj = new Date(date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(dateObj.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            const newMediaItem = {
                name: name,
                date: formattedDate,
                active: false,
                fileName: file.name,
            };
    
            const formValid = validateForm();
            if (formValid) {
                const formData = new FormData();
                formData.append("file", file, file.name);
                formData.append("newMediaItem", JSON.stringify(newMediaItem)); // Convert to JSON string
                
                addMediaItem(formData).then((data) => {
                    if(data.error){
                        setGlobalError(data.error);
                    } else if(data.success){
                        toast.current.show({ severity: 'Success', summary: 'Sucess', detail: `MediaItem "${newMediaItem.name}" is toegevoegd`, life: 3000, closable: true, className: 'success-toast' });
                        closeHandler();
                    }
                }).catch((error) => {
                    console.log(error);
                    setGlobalError(error.message);
                });
            }
        } else {
            setGlobalError("No file selected");
        }
    };
    
      
    useEffect(() => {
        setNameError("");
    }, [name]);

    useEffect(() => {
        setDateError("");
        console.log(date)
    }, [date]);

    useEffect(() => {
        setGlobalError("");
    }, [file]);

    useEffect(() => {
        console.log(globalError)
    }, [globalError]);
    
    const validateForm = () => {
        let valid = true;
        if(name === "") {
            setNameError("Naam is leeg");
            valid = false;
        }
        return valid;
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
      
        if (selectedFile) {
          setFile(selectedFile);
          setFilePreview(URL.createObjectURL(selectedFile));
        } else {
          // Clear the file and file preview if no file is selected
          setFile(null);
          setFilePreview(null);
        }
      };

    return (
    <div className="overlay">
        <Toast ref={toast} />
        <div className="popup">
            <div className="section-title__container">
                <h2 className="section-title">{props.title}</h2>
                <div className="section__title--border blue"></div>
            </div>
            <span className="close" onClick={closeHandler}>
                &times;
            </span>
            {props.isPending && <div>Loading...</div>}
            {globalError && <div className="error">{globalError}</div>}
            {!props.isPending && (
                <div className="content">
                <form className="mediaItemForm" encType="multipart/form-data">
                    <div className="mediaItemForm-top">
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
                            onChange={(e) => setDate(e.target.value)}
                            type="datetime-local"
                            name="date"
                            value={date}
                            />
                            {dateError && <small className="error-message">{dateError}</small>}
                        </label>
                        <label className={"label" + (fileError ? ' error' : '')}>
                            <input 
                            type="file" 
                            name="file"
                            className="fileInput inherit-font"
                            onChange={(e) => handleFileChange(e)} 
                            accept="image/png, image/jpeg, image/jpg"
                            />
                        </label>
                        <div>
                            <img id="image-preview" src={filePreview || '#'} width={200} alt="hoogtepunt preview" />
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

MediaItemPopup.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    mediaItem: PropTypes.object,
    isPending: PropTypes.bool.isRequired,
};
export default MediaItemPopup;