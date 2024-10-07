import { useState, useEffect } from "react";

const PolicyForm = ({ selectedPolicy, onSubmit, onClose }) => {
  const [policy, setPolicy] = useState({ id: "", name: "", description: "" });

  useEffect(() => {
    if (selectedPolicy) {
      setPolicy(selectedPolicy);
    }
  }, [selectedPolicy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy((prevPolicy) => ({ ...prevPolicy, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(policy);
    onClose();
  };

  return (
    <div className="policy-form">
      <h2>{selectedPolicy ? "Edit Policy" : "Add Policy"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Policy Name"
          value={policy.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={policy.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{selectedPolicy ? "Update" : "Create"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PolicyForm;
