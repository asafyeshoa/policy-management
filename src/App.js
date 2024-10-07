import { useEffect, useState } from "react";
import { AppBar, PolicyList, PolicyForm, Footer } from "./components/index.js";
import "./styles/App.css";

const usersData = [
  { role: "Insurance Customer", name: "John Doe", id: 1 },
  { role: "External Agent", name: "Jane Smith", id: 2 },
  { role: "Internal Agent", name: "Mike Johnson", id: 3 },
  { role: "Service Provider", name: "Emily Davis", id: 4 },
  { role: "Management", name: "Sarah Wilson", id: 5 },
];

const policiesData = [
  {
    id: 1,
    name: "Policy",
    description: "A formal contract outlining coverage terms and conditions",
  },
  {
    id: 2,
    name: "Document",
    description: "Any official paperwork related to the policy",
  },
  {
    id: 3,
    name: "Claim",
    description: "A request for payment or compensation under the policy",
  },
  {
    id: 4,
    name: "Quote",
    description:
      "An estimated premium cost provided to a potential policyholder",
  },
];

const App = () => {
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState(policiesData);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
    setUser(randomUser);
  }, []);

  const handleAddPolicy = (newPolicy) => {
    setPolicies([...policies, { ...newPolicy, id: policies.length + 1 }]);
  };

  const handleEditPolicy = (updatedPolicy) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === updatedPolicy.id ? updatedPolicy : policy
      )
    );
  };

  const handleDeletePolicy = (id) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };

  const handleOpenForm = (policy) => {
    setSelectedPolicy(policy);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedPolicy(null);
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      <AppBar options={usersData} user={user} setUser={setUser} />
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
      <Footer />
    </div>
  );
};

export default App;
