import attributes from "../../_helpers/_attribute-enums/attributes.enum";
import userOne from "../../_helpers/_user-mocks/user.enum";

describe("Testing Video Display", () => {
  it("should be visible", () => {
    cy.visit("/video");
    cy.scrollTo(0, 400);
    cy.headerType(`${attributes.VIDEO}`, `${userOne.FORENAME}`);
    cy.get("[data-cy='video-highlights'").should("be.visible");
  });

  it("should allow the user to watch on youtube via button link", () => {
    cy.get("[data-cy='youtube-link']")
      .should("have.attr", "href")
      .and("equal", `${userOne.VIDEO_URL}`);
  });
});
