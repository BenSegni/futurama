import userOne from "../../_helpers/_user-mocks/user.enum";

describe("Testing User Profile", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display a profile image", () => {
    cy.get("[data-cy='user-card']").find("img").should("be.visible");
    cy.get("[data-cy='user-card']")
      .find("img")
      .should("have.attr", "src")
      .and("equal", `${userOne.AVATAR}`);
  });

  it("should show correct details", () => {
    cy.checkDetails(
      "[data-cy='user-card']",
      0,
      `Forename: ${userOne.FORENAME}`
    );
    cy.checkDetails(
      "[data-cy='user-card']",
      1,
      `Middle Names: ${userOne.MIDDLENAMES}`
    );
    cy.checkDetails("[data-cy='user-card']", 2, `Surname: ${userOne.SURNAME}`);
    cy.checkDetails("[data-cy='user-card']", 3, `Address: ${userOne.ADDRESS}`);
    cy.checkDetails("[data-cy='user-card']", 4, `Job Role: ${userOne.JOBROLE}`);
  });
});
