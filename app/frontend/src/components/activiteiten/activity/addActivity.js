import React from "react";
import { useState, useRef } from 'react';
import ActivityPopup from "./popups/ActivityPopup";
import { addActivity } from "../../../services/activitiesService";
import { Toast } from "primereact/toast";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import './toast.css'


const AddActivity = () => {
    const [addActivityActive, setAddActivityActive] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [globalError, setGlobalError] = useState("");
    const toast = useRef(null);


    const popupCloseHandler = (e) => {
        setAddActivityActive(null);
    };

    const addActivityFunc = (activity) => {
        setIsPending(true);
        addActivity(activity).then(() => {
            setIsPending(false);
            toast.current.show({ severity: 'Success', summary: 'Sucess', detail: `Activity "${activity.name}" is aangemaakt`, life: 3000, closable: true, className: 'success-toast' });
            setAddActivityActive(false);
        }).catch((error) => {
            console.log(error);
            toast.current.show({ severity: 'Error', summary: 'Error', detail: error.message, life: 3000, closable: true, className: 'error-toast' });
            setIsPending(false);
            setGlobalError(error.message);
        });
      }

    return (
        <>

            <h3 className="cursive adminLink" onClick={() => setAddActivityActive(true)}>{"+ Activity aanmaken"}</h3>
            {addActivityActive && (
                <ActivityPopup
                    onClose={popupCloseHandler}
                    title={"Activiteit aanmaken"}
                    activity={null}
                    setActivityAction={addActivityFunc}
                    isPending={isPending}
                    globalError={globalError}
                />
            )}
            <Toast ref={toast} />
        </>
    );
}

export default AddActivity;