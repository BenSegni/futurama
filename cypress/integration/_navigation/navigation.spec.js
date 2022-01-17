import attributes from "../../_helpers/_attribute-enums/attributes.enum";
import links from "../../_helpers/_link-enums/links.enum";
import userOne from "../../_helpers/_user-mocks/user.enum";

describe("Testing Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show profile of user", () => {
    cy.headerType(`${attributes.WELCOME}`, `${userOne.FORENAME} ${userOne.SURNAME}`);
  });

  it("should show video section with title", () => {
    cy.headerType(`${attributes.VIDEO}`, `${userOne.FORENAME}`);
  });

  it("should allow users to navigate to the update form", () => {
    cy.navigate(`${links.UPDATE}`);
  });

  it("should navigate back to the home page when clicking the nav link", () => {
    cy.navigate(`${links.VIDEO}`);
    cy.headerType(`${attributes.VIDEO}`, `${userOne.FORENAME}`);
  });

  it("should navigate back to home on click of logo", () => {
    cy.navigate(`${links.UPDATE}`);
    cy.get("[data-cy='home-logo-link']").click();
    cy.headerType(`${attributes.VIDEO}`, `${userOne.FORENAME}`);
  });
});
