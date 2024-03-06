import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomGrid from "./grids/CustomGrid";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [comment, setComment] = useState(null);
  const [collection]= useState(null)
  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    setNewComment((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/${id}`,
        newComment,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Comment created successfully");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${id}`
      );
      setComment(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/issues/${id}`
        );
        setIssue(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/comments/${id}`
        );
        setComment(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getComment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/issues/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Issue deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIssueToCollection = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/collections/create-issue-collection/${id}`,
        collection,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Collection issue added successfully");
      navigate(`/profile`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {issue && (
        <CustomGrid universe={issue.universe}>
          <form className="form" onSubmit={handleAddIssueToCollection}>
            <button
              className={issue.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              type="submit"
            >
              Add Issue to my collection
            </button>
          </form>
          <div className="infoCard">
            <h3>Issue: {issue.name}</h3>
            <p>
              <strong>Year published:</strong> {issue.years}{" "}
            </p>
            <p>
              <strong>Description:</strong> {issue.description}
            </p>
          </div>
          <div className="titleOfDetailImage">
            <strong>Issue Image</strong>
          </div>
          <div className="detailImage">
            <img src={issue.image} style={{ width: "200px" }} alt="item img" />{" "}
          </div>
          <div className="buttonContainer buttonContainerDetails">
            <button
              className={issue.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={() => navigate(`/issues/create`)}
            >
              Create Issue
            </button>
            <button
              className={issue.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={handleDelete}
            >
              Delete issue
            </button>
            <button
              className={issue.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              onClick={() => navigate(`/issues/edit/${id}`)}
            >
              Edit issue
            </button>
          </div>
          <div className="titleOfDetailImage">
            <strong>Comments on this Issue</strong>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="formBox commentFormBox"
              type="text"
              name="comment"
              placeholder="Place your comment here..."
              value={newComment.comment}
              onChange={handleChange}
            />
            <button
              className={issue.universe === "DC" ? "buttonDc" : "buttonMarvel"}
              type="submit"
            >
              Post Comment
            </button>
          </form>
          {!comment && <p>No comments to show</p>}
          {comment &&
            comment.map((elem) => {
              return (
                <div key={elem._id}>
                  <div className="comment-block">
                    <img
                      className="profile-img"
                      width="40px"
                      height="40px"
                      src={elem.userId.imageUrl}
                      alt="profile img"
                    />
                    <p className="commenting-user">
                      <strong>{elem.userId.username}</strong>
                    </p>{" "}
                    said:
                    <p>{elem.comment}</p>
                  </div>
                </div>
              );
            })}
        </CustomGrid>
      )}
      {!issue && <p>Issue not found</p>}
    </div>
  );
}
