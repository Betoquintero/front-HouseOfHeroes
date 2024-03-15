import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        console.log(response);
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div>Events</div>
      <div>
        <h3>All events:</h3>
        {!events && <p>Loading</p>}
        {events &&
          events.map((event) => {
            return (
              <p key={event._id}>
                <Link className="links" to={`/events/${event._id}`}>
                  {event.name}
                </Link>
              </p>
            );
          })}
        <button onClick={() => navigate(`/events/create`)}>Create event</button>
        <Outlet />
      </div>
    </>
  );
}
