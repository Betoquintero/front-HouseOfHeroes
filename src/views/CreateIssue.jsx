import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MixedGrid from "../components/grids/MixedGrid";
import toast from "react-hot-toast";
import axios from "axios";

export default function CreateIssue() {
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [issue, setIssue] = useState({
    universe: "",
    name: "",
    years: "",
    image: "",
    description: "",
    summary: "",
  });

  const handleChange = (e) => {
    setIssue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIssue = await axios.post(
        `${process.env.REACT_APP_API_URL}/issues`,
        issue,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      toast.success("Issue created successfully");
      navigate(`/issues/${newIssue.data.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MixedGrid>
      <h2>Create issue</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="formBox"
          type="text"
          name="universe"
          placeholder="DC or MARVEL"
          value={issue.universe}
          onChange={handleChange}
        />
        <input
          className="formBox"
          type="text"
          name="name"
          placeholder="Issue name"
          value={issue.name}
          onChange={handleChange}
        />
        <input
          className="formBox"
          type="text"
          name="years"
          placeholder="Publication year(s)"
          value={issue.years}
          onChange={handleChange}
        />
        <input
          className="formBox"
          type="text"
          name="description"
          placeholder="Description"
          value={issue.description}
          onChange={handleChange}
        />
        <input
          className="formBox"
          type="text"
          name="summary"
          placeholder="Issue summary"
          value={issue.summary}
          onChange={handleChange}
        />
        <button className="genericButton genButtonRest" type="submit">
          Save
        </button>
      </form>
    </MixedGrid>
  );
}
