import { useState } from "react";
const PolicyList = ({ user, policies, onEdit, onDelete, onAdd }) => {
  const [details, setDetails] = useState(null);

  const handleDetails = (policy) => {
    setDetails(policy);
  };

  const closeDetails = () => {
    setDetails(null);
  };

  return (
    <div className="policy-list-view">
      <h2>List of Policies</h2>
      <div className="table-actions">
        <button
          onClick={onAdd}
          style={{
            display: user?.role === "External Agent" ? "block" : "none",
          }}
        >
          Add Policy
        </button>
      </div>
      <table className="policy-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.id}</td>
              <td>{policy.name}</td>
              <td>
                <div className="button-container">
                  <button
                    className="button-hover button-color-3"
                    onClick={() => onEdit(policy)}
                    style={{
                      display: ["Internal Agent", "External Agent"].includes(
                        user?.role
                      )
                        ? "block"
                        : "none",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button-hover button-color-2"
                    onClick={() => onDelete(policy.id)}
                    style={{
                      display:
                        user?.role === "External Agent" ? "block" : "none",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button-hover button-color-1"
                    onClick={() => handleDetails(policy)}
                  >
                    Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {details && (
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
          <button onClick={closeDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PolicyList;
