import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppBar } from "../components";
import { MemoryRouter } from "react-router-dom";

const usersData = [
  { role: "Insurance Customer", name: "John Doe", id: 1 },
  { role: "External Agent", name: "Jane Smith", id: 2 },
  { role: "Internal Agent", name: "Mike Johnson", id: 3 },
  { role: "Service Provider", name: "Emily Davis", id: 4 },
  { role: "Management", name: "Sarah Wilson", id: 5 },
];

const mockUser = { role: "Insurance Customer", name: "John Doe", id: 1 };
const mockSetUser = jest.fn();

describe("AppBar Component - Select Functionality", () => {
  it("should displays the current user role in the select dropdown and allows selecting a new user", () => {
    render(
      <MemoryRouter>
        <AppBar options={usersData} user={mockUser} setUser={mockSetUser} />
      </MemoryRouter>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement.value).toBe(mockUser.role);

    const randomIndex = Math.floor(Math.random() * usersData.length);
    const randomUser = usersData[randomIndex];

    fireEvent.change(selectElement, { target: { value: randomUser.role } });

    expect(mockSetUser).toHaveBeenCalledWith(randomUser);
  });
});

describe("AppBar Component - Nav Links Validation", () => {
  it("should displays only two links based on the current path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppBar options={usersData} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Home Page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Agents Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Management Page/i)).toBeInTheDocument();
  });

  it("should hides the Agents Page link when on the agents path", () => {
    render(
      <MemoryRouter initialEntries={["/agents"]}>
        <AppBar options={usersData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Agents Page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Management Page/i)).toBeInTheDocument();
  });
});
