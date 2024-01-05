import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './activityAdmin.css';
import ActivityPopup from './popups/ActivityPopup';
import { deleteActivity, updateActivity } from '../../../services/activitiesService';
import { Toast } from 'primereact/toast';
import { Link, useLocation } from 'react-router-dom';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import './toast.css'


const ActivityAdmin = ({ activity, onActivityEdit }) => {
  const [editActivityActive, setEditActivityActive] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const toast = useRef(null);


  const popupCloseHandler = (e) => {
    setEditActivityActive(null);
  };

  const getImageSource = () => {
    if (activity.imgpath) {
      return `assets/events/${activity.imgpath}`;
    }
    return 'assets/events/noImage.jpg';
  };

  useEffect(() => {
    console.log(activity.id);
  }, [editActivityActive]);

  const updateActivityFunc = (activity) => {
    setIsPending(true);
    activity.id = editActivityActive.id;
    console.log(activity);
    updateActivity(activity).then(() => {
        setIsPending(false);
        setEditActivityActive(null);
        toast.current.show({ severity: 'Success', summary: 'Sucess', detail: `Activity "${activity.name}" is aangepast`, life: 3000, closable: true, className: 'success-toast' });
        onActivityEdit();
        console.log("updated")
    }).catch((error) => {
        console.log(error);
        toast.current.show({ severity: 'Error', summary: 'Error', detail: error.message, life: 3000, closable: true, className: 'error-toast' });
        setIsPending(false);
        setGlobalError(error.message);
    });
  }

  const deleteActivityFunc = (activity) => {
    setIsPending(true);
    deleteActivity(activity.id).then(() => {
        setIsPending(false);
        toast.current.show({ severity: 'Success', summary: 'Sucess', detail: `Activity "${activity.name}" is verwijderd`, life: 3000, closable: true, className: 'success-toast' });
        onActivityEdit();
    }).catch((error) => {
        toast.current.show({ severity: 'Error', summary: 'Error', detail: error.message, life: 3000, closable: true, className: 'error-toast' });
        setIsPending(false);
        setGlobalError(error.message);
    });
  }

  return (
    <>
    <div className="activity">
      <img src={getImageSource()} alt={activity.name} />
      <div>
        <p className="activity__title">{activity.name}</p>
        <div className="activity__details">
          {activity.date && (
            <p className="activity__detail date">{activity.date}</p>
          )}
          {activity.time && (
            <p className="activity__detail time">{activity.time}</p>
          )}
          {activity.location ? (
            <p className="activity__detail location">{activity.location}</p>
          ) : (
            <p className="activity__detail location">???</p>
          )}
        </div>
      </div>
      <div className='activity__edit-button cursive adminLink' onClick={() => setEditActivityActive(activity)}>Edit</div>
      <Link className="cursive adminLink" to={`/detail/${activity.id}`}>
        Detail
      </Link>
      <div className='cursive adminLink' onClick={() => deleteActivityFunc(activity)}>Delete</div>
      <Toast ref={toast} />
    </div>
    {editActivityActive && (
      <ActivityPopup
        onClose={popupCloseHandler}
        title={editActivityActive.name}
        activity={editActivityActive}
        setActivityAction={updateActivityFunc}
        isPending={isPending}
        globalError={globalError}
      />
    )}
    </>
  );
};

export default ActivityAdmin;