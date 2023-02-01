import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Event Detail</h1>
      <p>{params.eventId}</p>
      <Link to=".." relative="path">
        Back
      </Link>
    </>
  );
};

export default EventDetailPage;
