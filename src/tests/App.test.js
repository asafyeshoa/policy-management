import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const usersData = [
  { role: "Insurance Customer", name: "John Doe", id: 1 },
  { role: "External Agent", name: "Jane Smith", id: 2 },
  { role: "Internal Agent", name: "Mike Johnson", id: 3 },
  { role: "Service Provider", name: "Emily Davis", id: 4 },
  { role: "Management", name: "Sarah Wilson", id: 5 },
];

// Mock pages and components
jest.mock("../pages/AgentsPage", () => () => <div>Agents Page</div>);
jest.mock("../pages/ManagementPage", () => () => <div>Management Page</div>);
jest.mock("../components/CountdownRedirect", () => () => (
  <div>Redirecting...</div>
));

describe("Router Guard - Agents Page", () => {
  it("should allow access to Agents Page for External Agent role", () => {
    render(
      <MemoryRouter initialEntries={["/agents"]}>
        <App initialUser={usersData[1]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Agents Page")).toBeInTheDocument();
  });

  it("should allow access to Agents Page for Internal Agent role", () => {
    render(
      <MemoryRouter initialEntries={["/agents"]}>
        <App initialUser={usersData[2]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Agents Page")).toBeInTheDocument();
  });

  it("should redirect non-agent users attempting to access Agents Page", () => {
    render(
      <MemoryRouter initialEntries={["/agents"]}>
        <App initialUser={usersData[0]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });
});

describe("Router Guard - Management Page", () => {
  it("should allow access to Management Page for Management role", () => {
    render(
      <MemoryRouter initialEntries={["/management"]}>
        <App initialUser={usersData[4]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Management Page")).toBeInTheDocument();
  });

  it("should redirect non-management users attempting to access Management Page", () => {
    render(
      <MemoryRouter initialEntries={["/management"]}>
        <App initialUser={usersData[1]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });
});
