import React from "react";
import { useState, useEffect } from "react";
import { getActivity } from "../../../services/activitiesService";
import { useParams } from "react-router-dom";
import "./ActivityDetail.css";

const ActivityDetail = () => {
    const [activity, setActivity] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        getActivity(id).then(data => {
            if(data.errors){
                setError(data.errors)
            }
            setActivity(data.event);
            console.log(data); // Process the received data
            setIsPending(false);
        })
        .catch(error => {
            console.error(error); // Handle any errors
            setError(error);
            setIsPending(false);
        });
    }, []);

    const getImageSource = () => {
        if (activity.imgpath) {
          return `../assets/events/${activity.imgpath}`;
        }
        return '../assets/events/noImage.jpg';
      };

    return (
  <section className="page__container">
    <div className="page__section">
      <div className="top__nav--buttons">
        <a href="/activiteiten" className="cursive">Terug naar activiteiten</a>
      </div>
      <div className="page--activity__detail">
        {activity && (
          <>
            <div className="activity__image">
              <img src={getImageSource()} alt={activity.name} />
            </div>
            <div className="right-side">
              <div>
                <div className="section-title__container">
                  <h2 className="section-title">{activity.name}</h2>
                  <div className="section__title--border blue"></div>
                </div>
                <div className="activity__details">
                  {activity.date ? (
                    <p className="activity__detail date">{activity.date}</p>
                  ) : (
                    <p className="activity__detail date">???</p>
                  )}
                  {activity.time && <p className="activity__detail time">{activity.time}</p>}
                  {activity.location ? (
                    <p className="activity__detail location">{activity.location}</p>
                  ) : (
                    <p className="activity__detail location">???</p>
                  )}
                    {new Date(activity.timestamp).getDate() + 1 > new Date() && (
                    <p className="activity__detail urgent">Deze activiteit is in het verleden</p>
                    )}
                    {activity.description && (
                    <p className="activity__detail description">{activity.description}</p>
                  )}
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                {activity.url && (
                  <a href={activity.url} className="activity__detail url cursive">
                    Facebook link
                  </a>
                )}
              </div>
            </div>
          </>
        )}
        {!activity && (
          <p style={{ fontStyle: 'italic' }}>
            {error && <div className="error">{error}</div>}
            <br />
            <a className="cursive" href="/">
              &#60;&#60; Terug naar alle activiteiten
            </a>
          </p>
        )}
      </div>
    </div>
  </section>

    );
}

export default ActivityDetail;