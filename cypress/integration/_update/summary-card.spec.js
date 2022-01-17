import userOne from "../../_helpers/_user-mocks/user.enum";

describe("Testing Summary Card Functionality & Details", () => {
  it("should allow the user to expand and collapse the summary card", () => {
    cy.visit("/update");
    cy.scrollTo(0, 300);
    cy.get("[data-cy='details-element']").click().wait(1500);
    cy.checkDetails(
      "[data-cy='details-card']",
      0,
      `Forename: ${userOne.FORENAME}`
    );
    cy.get("[data-cy='summary-element']").click().wait(1500);
  });
});
