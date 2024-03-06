import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomGrid from "./grids/CustomGrid";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProjectDetails() {
  const { id, universe } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/parts/${universe}/${id}`
        );
        setPart(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, universe]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/parts/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Project deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {part && (
        <CustomGrid universe={universe}>
          <div className="infoCard">
            <h3>{part.name}</h3>
            <p>
              <strong>Year published:</strong> {part.years}
            </p>
            <p>
              <strong>Description:</strong> {part.description}
            </p>
          </div>
          <div className="titleOfDetailImage">
            <strong>Events that belong to this part</strong>
          </div>
          <div className="cardsContainer">
            {part.events &&
              part.events.map((event) => {
                return (
                  <div key={event._id} className="card">
                    <Link className="links" to={`/events/${event._id}`}>
                      <img
                        src={event.image}
                        alt="Event img"
                        style={{ width: "100%" }}
                      />
                      <div className="container">
                        <h4>
                          <b>{event.name}</b>
                        </h4>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="buttonContainerDetails">
            <button
              className={universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={handleDelete}
            >
              Delete part
            </button>
            <button
              className={universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={() => navigate(`/parts/edit/${part.universe}/${id}`)}
            >
              Edit part
            </button>
          </div>
        </CustomGrid>
      )}
      {!part && <p>Part not found</p>}
    </div>
  );
}
