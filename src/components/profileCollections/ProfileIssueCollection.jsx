import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileIssueCollection ({ collection, handleDeleteIssue, toggleReadStatus }) {

  return (
    <div>
      <div className="collectionHeaders">
        <p className="issuesProfileTitle">
          <strong>Individual issues that I'd like to read</strong>
        </p>
      </div>
      <div className="profileIssuesContainer">
        {collection &&
          collection.issues.map((issue) => (
            <div key={issue._id} style={{ opacity: issue.readStatus ? 0.5 : 1 }}>
              <div className="card">
                <Link className="links" to={`/issues/${issue._id}`}>
                  <img src={issue.image} alt="Issue" style={{ width: "100%" }} />
                  <div className="container">
                    <h4>{issue.name}</h4>
                  </div>
                </Link>
              </div>
              <button className="deleteEventCollection" onClick={() => toggleReadStatus(issue._id)}>
                {issue.readStatus ? "Mark as Unread" : "Mark as Read"}
              </button>
              <div className="deleteCollectionContainer">
                <button className="deleteEventCollection" onClick={() => handleDeleteIssue(issue._id)}>
                  Delete Issue
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
