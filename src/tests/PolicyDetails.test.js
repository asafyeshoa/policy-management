import React from "react";
import { render, screen } from "@testing-library/react";
import PolicyDetails from "../components/PolicyDetails";

const detailsData = {
  id: 1,
  name: "Policy A",
  description: "A formal contract outlining coverage terms and conditions",
  realCost: "100$",
};

describe("PolicyDetails Component - Real Cost Visibility", () => {
  it("should display the Real Cost field for Management role", () => {
    render(
      <PolicyDetails
        details={detailsData}
        user={{ role: "Management" }}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/Real cost:/i)).toBeInTheDocument();
  });

  it("should not display the Real Cost field for non-Management roles", () => {
    const roles = [
      "Insurance Customer",
      "External Agent",
      "Internal Agent",
      "Service Provider",
    ];
    roles.forEach((role) => {
      render(
        <PolicyDetails
          details={detailsData}
          user={{ role }}
          onClose={jest.fn()}
        />
      );
      expect(screen.queryByText(/Real cost:/i)).toBeNull();
    });
  });
});
