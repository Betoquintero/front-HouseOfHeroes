import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomGrid from "./grids/CustomGrid";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [collection] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/${id}`
        );
        setEvent(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Issue deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEventToCollection = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/collections/${id}`,
        collection,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Collection added successfully");
      navigate(`/profile`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {event && (
        <CustomGrid universe={event.universe}>
          <form className="form" onSubmit={handleAddEventToCollection}>
            <button
              className={event.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              type="submit"
            >
              Add Event to my collection
            </button>
          </form>
          <div className="infoCard">
            <h3>Event: {event.name}</h3>
            <p>
              <strong>Year published:</strong> {event.years}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Previous Event: </strong>
              {event.previousEvent}
            </p>
            <p>
              <strong>Next Event: </strong>
              {event.nextEvent}
            </p>
          </div>
          <div className="titleOfDetailImage">
            <strong>Event Image</strong>
          </div>
          <div className="detailImage">
            <img src={event.image} style={{ width: "200px" }} alt="item img" />{" "}
          </div>
          <div className="titleOfDetailImage">
            <strong>Comics that belong to this event</strong>
          </div>
          <div className="cardsContainer">
            {event.issues &&
              event.issues.map((issue) => {
                return (
                  <div key={issue._id} className="card">
                    <Link className="links" to={`/issues/${issue._id}`}>
                      <img
                        src={issue.image}
                        alt="Issue"
                        style={{ width: "100%" }}
                      />
                      <div className="container">
                        <h4>{issue.name}</h4>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="buttonContainerDetails">
            <button
              className={event.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={() => navigate(`/events/create`)}
            >
              Create event
            </button>
            <button
              className={event.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={handleDelete}
            >
              Delete event
            </button>
            <button
              className={event.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={() => navigate(`/events/edit/${id}`)}
            >
              Edit event
            </button>
          </div>
        </CustomGrid>
      )}
      {!event && <p>Event not found</p>}
    </>
  );
}
