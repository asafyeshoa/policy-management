import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AppBar,
  PolicyForm,
  Footer,
  CountdownRedirect,
} from "./components/index.js";
import { HomePage, AgentsPage, ManagementPage } from "./pages/index.js";
import "./styles/App.css";

// Moak data demonstration server calls
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
    realCost: "100$",
  },
  {
    id: 2,
    name: "Document",
    description: "Any official paperwork related to the policy",
    realCost: "200$",
  },
  {
    id: 3,
    name: "Claim",
    description: "A request for payment or compensation under the policy",
    realCost: "150$",
  },
  {
    id: 4,
    name: "Quote",
    description:
      "An estimated premium cost provided to a potential policyholder",
    realCost: "1000$",
  },
];

const App = () => {
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState(policiesData);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Demostration diffrenet users
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
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              policies={policies}
              setPolicies={setPolicies}
              handleOpenForm={handleOpenForm}
              handleDeletePolicy={handleDeletePolicy}
            />
          }
        />
        <Route
          path="/agents"
          element={
            ["External Agent", "Internal Agent"].includes(user?.role) ? (
              <AgentsPage />
            ) : (
              <CountdownRedirect />
            )
          }
        />
        <Route
          path="/management"
          element={
            user?.role === "Management" ? (
              <ManagementPage />
            ) : (
              <CountdownRedirect />
            )
          }
        />
      </Routes>
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
