describe("Navigating into the App", () => {
  it("should show profile of user", () => {
    cy.visit("/");

    //check that header exists
    cy.headerOneCheck("Bender Rodríguez");
  });

  it("should show video section with title", () => {
    cy.headerTwoCheck("Bender");
  });

  it("should allow users to navigate to the update form", () => {
    cy.navigateToByClick("Update Your Details");
  });

  it("should navigate back to the home page when clicking the nav link", () => {
    cy.contains("Highlight Reel").click();

    cy.headerTwoCheck("Bender");
  });
});

describe("Profile", () => {
  //profile image exists
  it("should display a profile image", () => {
    cy.get(".card").find("img").should("be.visible");
  });

  it("should show correct details", () => {
    //details card and define values <-- look to refactor this section
    cy.get(".details").find("p").contains("Bender");
    cy.get(".details").find("p").contains("Bending");
    cy.get(".details").find("p").contains("Rodríguez");
    cy.get(".details")
      .find("p")
      .contains("Apartment 00100100, Robot Arms Apts");
    cy.get(".details").find("p").contains("Robot");
  });
});

describe("Image Logo", () => {
  it("should navigate back to home on click", () => {
    cy.visit("/update");

    cy.contains("a").click();

    cy.headerOneCheck("Bender Rodríguez");
  });
});
