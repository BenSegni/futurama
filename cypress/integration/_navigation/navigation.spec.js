import attributes from "../../_helpers/attributes.enum";
import links from "../../_helpers/links.enum";

describe("Navigating into the App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show profile of user", () => {
    //check that header exists
    cy.headerType(`${attributes.WELCOME}`, "Bender Rodríguez");
  });

  it("should show video section with title", () => {
    cy.headerType(`${attributes.VIDEO}`, "Bender");
  });

  it("should allow users to navigate to the update form", () => {
    cy.navigate(`${links.UPDATE}`);
  });

  it("should navigate back to the home page when clicking the nav link", () => {
    cy.navigate(`${links.VIDEO}`);

    cy.headerType(`${attributes.VIDEO}`, "Bender");
  });

  it("should navigate back to home on click of logo", () => {
    cy.navigate(`${links.UPDATE}`);

    cy.get("[data-cy='home-logo-link']").click();

    cy.headerType(`${attributes.VIDEO}`, "Bender");
  });
});
