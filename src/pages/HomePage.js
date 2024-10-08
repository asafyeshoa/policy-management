import { PolicyList, PolicyForm } from "../components/index.js";

const HomePage = ({
  user,
  policies,
  setPolicies,
  handleOpenForm,
  isFormOpen,
  selectedPolicy,
  handleCloseForm,
  handleAddPolicy,
  handleEditPolicy,
  handleDeletePolicy,
}) => {
  return (
    <div className="home-page">
      <PolicyList
        user={user}
        policies={policies}
        setPolicies={setPolicies}
        onEdit={handleOpenForm}
        onDelete={handleDeletePolicy}
        onAdd={() => handleOpenForm(null)}
      />
      {isFormOpen && (
        <PolicyForm
          selectedPolicy={selectedPolicy}
          onSubmit={selectedPolicy ? handleEditPolicy : handleAddPolicy}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default HomePage;
