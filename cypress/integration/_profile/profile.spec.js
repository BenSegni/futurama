describe("Profile", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  //profile image exists
  it("should display a profile image", () => {
    cy.get("[data-cy='user-card']").find("img").should("be.visible");
  });

  it("should show correct details", () => {
    //details card and define values - needs a refactor here
    cy.checkDetails("[data-cy='user-card']", 0, "Forename: Bender");
    cy.checkDetails("[data-cy='user-card']", 1, "Middle Names: Bending");
    cy.checkDetails("[data-cy='user-card']", 2, "Surname: Rodríguez");
    cy.checkDetails(
      "[data-cy='user-card']",
      3,
      "Address: Apartment 00100100, Robot Arms Apts"
    );
    cy.checkDetails("[data-cy='user-card']", 4, "Job Role: Robot");
  });
});
