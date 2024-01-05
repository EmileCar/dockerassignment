import React from "react";
import { useState, useEffect } from "react";
import { fetchActivities } from "../../services/activitiesService";
import "./activitiesList.css";
import Activity from "./activity/activity";
import ActivityAdmin from "./activity/activityAdmin";

function ActivitiesList({ isAdmin }) {
    const [isPending, setIsPending] = useState(true)
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActivitiesFunc();
    }, []);

    const reloadActivities = () => {
        fetchActivitiesFunc();
      };

    const fetchActivitiesFunc = () => {
        setIsPending(true);
        setError(null);
        fetchActivities().then((data) => {
            setActivities(data);
            setIsPending(false);
        }).catch((error) => {
            setError(error);
            setIsPending(false);
        });
    };

    return (
        <div className="activities__container">
            {isPending && <div>Loading...</div>}
            {error && <div className="error">{error.message}</div>}
            {activities && activities.map((activity) => 
                <>
                    {isAdmin ? <ActivityAdmin key={activity.id} activity={activity} onActivityEdit={reloadActivities}/> : <Activity key={activity.id} activity={activity} />}
                </>)}
        </div>
    );
}

export default ActivitiesList;