import React from "react";
import { Link } from "react-router-dom";

export default function ProfileEventCollection({
  collection,
  deleteEvent,
  toggleReadStatus,
}) {

  return (
    <div>
      <div className="cardsContainer">
        {collection &&
          collection.events.map((event) => (
            <div key={event._id} className="eventIssue">
              <div className="eventProfileContainer">
                <div className="collectionAndEventsProfileTitle">
                  <strong>Event</strong>
                </div>
                <div className="card">
                  <Link className="links" to={`/events/${event._id}`}>
                    <img
                      src={event.image}
                      alt="Issue"
                      style={{ width: "100%" }}
                    />
                    <div className="container">
                      <h4>{event.name}</h4>
                    </div>
                  </Link>
                </div>
                <div className="deleteCollectionContainer">
                  <button
                    className="deleteEventCollection"
                    onClick={() => deleteEvent(event._id)}
                  >
                    Delete event
                  </button>
                </div>
              </div>
              <div className="profileCardsContainer">
                <div className="collectionAndEventsProfileTitle">
                  <strong>Collection of issues</strong>
                </div>
                {event.issues &&
                  event.issues.map((issue) => (
                    <div key={issue._id} className="readmarkerAndIssue">
                      <div
                        className="card"
                        style={{ opacity: issue.readStatus ? 0.5 : 1 }}
                      >
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
                      <button
                        className="deleteEventCollection"
                        onClick={() => toggleReadStatus(issue._id)}
                      >
                        {issue.readStatus ? "Mark as Unread" : "Mark as Read"}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
