import React from "react";

const PolicyDetails = ({ details, user, onClose }) => {
  return (
    <div className="details-popup">
      <h3>Policy Details</h3>
      <p>
        <strong>ID:</strong> {details.id}
      </p>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Description:</strong> {details.description}
      </p>

      {user?.role === "Management" && (
        <p>
          <strong>Real cost:</strong> {details.realCost}
        </p>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PolicyDetails;
