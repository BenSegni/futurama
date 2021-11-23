import attributes from "../../_helpers/attributes.enum";

describe("video display", () => {
  it("should be visible", () => {
    cy.visit("/video");

    cy.scrollTo(0, 400);

    cy.headerType(`${attributes.VIDEO}`, "Bender");

    cy.get("[data-cy='video-highlights'").should("be.visible");
  });

  it("should allow the user to watch on youtube via link", () => {
    cy.get("[data-cy='youtube-link']")
      .should("have.attr", "href")
      .should("equal", "https://www.youtube.com/watch?v=ln4rfYh7ng0");
  });
});
