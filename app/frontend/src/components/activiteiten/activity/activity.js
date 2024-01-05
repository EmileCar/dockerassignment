import React from 'react';
import { Link } from 'react-router-dom';

const Activity = ({ activity, isAdmin }) => {
  const getImageSource = () => {
    if (activity.imgpath) {
      return `assets/events/${activity.imgpath}`;
    }
    return 'assets/events/noImage.jpg';
  };

  return (
    <Link className="activity" to={`/detail/${activity.id}`}>
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
    </Link>
  );
};

export default Activity;
