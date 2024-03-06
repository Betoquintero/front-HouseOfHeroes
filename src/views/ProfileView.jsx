import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MixedGrid from "../components/grids/MixedGrid";
import ProfileEventCollection from "../components/profileCollections/ProfileEventCollection"
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProfileIssueCollection from "../components/profileCollections/ProfileIssueCollection";

export default function ProfileView() {
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [collection, setCollection] = useState({
    userId: "",
    issues: [],
    events: [],
  });

  const [issueCollection, setIssueCollection] = useState({
    userId: "",
    issues: [],
    events: [],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/collections`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setCollection(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, storedToken]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/collections/issue`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setIssueCollection(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, storedToken]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/collections/delete-event/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Event collection deleted successfully");
      setCollection((prevCollection) => {
        const updatedEvents = prevCollection.events.filter(
          (event) => event._id !== eventId
        );
        return { ...prevCollection, events: updatedEvents };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/collections/delete-issue/${issueId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Issue deleted successfully");
      setIssueCollection((prevCollection) => {
        const updatedIssues = prevCollection.issues.filter(
          (issue) => issue._id !== issueId
        );
        return { ...prevCollection, issues: updatedIssues };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReadStatus = async (issueId) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/readStatuses/toggle-read/${issueId}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setCollection((prevCollection) => {
        const updatedEvents = prevCollection.events.map((event) => {
          const updatedIssues = event.issues.map((issue) =>
            issue._id === issueId
              ? { ...issue, readStatus: response.data.isRead }
              : issue
          );
          return { ...event, issues: updatedIssues };
        });

        return { ...prevCollection, events: updatedEvents };
      });
      toast.success("Issue read status updated");
    } catch (error) {
      console.error("Error toggling read status:", error);
      toast.error("Failed to update issue read status");
    }
  };

  return (
    <MixedGrid>
      <img
        className="profileUserImg"
        style={{ width: "100px" }}
        src={user.imageUrl}
        alt="user profile pic"
      />
      <h5>Welcome to your profile page {user.username}!</h5>
      <Link className="links" to={`/user/edit`}>
        <button className="editProfile">Edit your profile</button>
      </Link>
      <p className="profileDescription">
        <strong>
          Below you will find your saved collections, if you don't have any,
          visit the events and collections pages to find the ones you like the
          most!
        </strong>
      </p>
      <ProfileEventCollection
        collection={collection}
        handleDeleteEvent={handleDeleteEvent}
        toggleReadStatus={toggleReadStatus}
      />
      {!collection && (
        <p className="noCollections">
          <strong>
            No collections to show, pick one and start collecting!
          </strong>
        </p>
      )}
      <ProfileIssueCollection
        issueCollection={collection}
        handleDeleteIssue={handleDeleteIssue}
        toggleReadStatus={toggleReadStatus}
      />
    </MixedGrid>
  );
}
