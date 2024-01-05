import React from "react";
import { useState, useEffect } from "react";
import AddActivity from "../../activiteiten/activity/addActivity";
import ActivitiesList from "../../activiteiten/activitiesList";


const ActiviteitenAction = ({setAdminAction})=> {

    return (
        <>
            <div className="admin__user">
                <h3 className="cursive adminLink" onClick={() => setAdminAction("")}>{"< Terug naar dashboard"}</h3>
                <AddActivity />
            </div>
            <ActivitiesList isAdmin={true}/>
        </>
    );
}

export default ActiviteitenAction;