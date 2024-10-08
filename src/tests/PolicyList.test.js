import React from "react";
import { render, screen } from "@testing-library/react";
import { PolicyList } from "../components";

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

describe("PolicyList Component - Edit Button Visibility", () => {
  it("should display the Edit button for Internal Agent role", () => {
    render(
      <PolicyList
        user={usersData[2]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it("should display the Edit button for External Agent role", () => {
    render(
      <PolicyList
        user={usersData[1]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it("should not display the Edit button for other roles", () => {
    render(
      <PolicyList
        user={usersData[0]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const allButtons = screen.getAllByRole("button");
    const editButton = allButtons.find(
      (button) => button.textContent === "Edit"
    );
    expect(editButton).toBeUndefined();
  });
});

describe("PolicyList Component - Delete and Add Button Visibility", () => {
  it("should display the Delete button only for External Agent role", () => {
    render(
      <PolicyList
        user={usersData[1]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const deleteButtons = screen.getAllByText("Delete");
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it("should not display the Delete button for other roles", () => {
    render(
      <PolicyList
        user={usersData[0]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const allButtons = screen.getAllByRole("button");
    const deleteButton = allButtons.find(
      (button) => button.textContent === "Delete"
    );
    expect(deleteButton).toBeUndefined();
  });

  it("should display the Add button only for External Agent role", () => {
    render(
      <PolicyList
        user={usersData[1]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );
    const addButton = screen.getByText("Add Policy");
    expect(addButton).toBeInTheDocument();
  });

  it("should not display the Add button for other roles", () => {
    render(
      <PolicyList
        user={usersData[0]}
        policies={policiesData}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onAdd={jest.fn()}
      />
    );

    const allButtons = screen.getAllByRole("button");
    const addButton = allButtons.find((button) => button.textContent === "Add");
    expect(addButton).toBeUndefined();
  });
});
