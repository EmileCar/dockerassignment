import React from "react";
import { useState, useEffect } from "react";
import "./dashboard.css";
import ActiviteitenAction from "../activiteitenAction/activiteitenAction";
import MediaAction from "../mediaAction/mediaAction";
import InschrijvingenAction from "../inschrijvingenAction/inschrijvingenAction";
import { logout } from "../../../services/adminService";

const Dashboard = (username) => {
    const [selectedAction, setSelectedAction] = useState("");

    useEffect(() => {
        console.log(selectedAction)
        switch(selectedAction)
        {
            case "activiteiten":
                return;
            case "media":
                return;
            default:
                return;
        }
    }, [selectedAction]);

    return (
        <>
            {selectedAction === "" && (
                <>
                    <div className="admin__user">
                        <h3>Ingelogd als {username.username}</h3>
                        <p onClick={logout} className="cursive">{ "Uitloggen >>"}</p>
                    </div>
                    <div className="admin__actions">
                        <div className="admin__action" onClick={() => setSelectedAction("activiteiten")}>
                            <h4>Activiteiten beheren</h4>
                        </div>
                        <div className="admin__action" onClick={() => setSelectedAction("media")}>
                            <h4>Media beheren</h4>
                        </div>
                        <div className="admin__action" onClick={() => setSelectedAction("inschrijvingen")}>
                            <h4>Inschrijvingen beheren</h4>
                        </div>
                    </div>
                </>
            )}
            {selectedAction === "activiteiten" && (
                <>
                    <ActiviteitenAction setAdminAction={setSelectedAction}/>
                </>
            )}
            {selectedAction === "media" && (
                <>
                    <MediaAction setAdminAction={setSelectedAction}/>
                </>
            )}
            {selectedAction === "inschrijvingen" && (
                <>
                    <InschrijvingenAction setAdminAction={setSelectedAction}/>
                </>
            )}
        </>
    );
}

export default Dashboard;