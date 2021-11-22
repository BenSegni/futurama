describe("Updating the User Details", () => {
  it("should navigate to form", () => {
    cy.visit("/update");
  });

  it("should allow the user to expand and collapse the summary card", () => {
    cy.get("details").click();

    cy.get("details").find("summary").contains("Bender");

    cy.get("summary").click();
  });

  it("should update form details and update state", () => {
    cy.visit("/update");

    //input new details into form
    cy.get("input[name='firstName']").clear();
    cy.get("input[name='firstName']").type("John");
    cy.get("input[name='middleNames']").clear();
    cy.get("input[name='middleNames']").type("A");
    cy.get("input[name='surName']").clear();
    cy.get("input[name='surName']").type("Zoidberg");
    cy.get("input[name='address']").clear();
    cy.get("input[name='address']").type("Homeless");
    cy.get("input[name='jobRole']").clear();
    cy.get("input[name='jobRole']").type("Doctor");
    cy.get("input[name='avatar']").clear();
    cy.get("input[name='avatar']").type(
      "https://static.wikia.nocookie.net/enfuturama/images/f/f8/Doctor_John_A._Zoidberg_-_Official_Promo.jpg"
    );
    cy.get("input[name='highlightReel']").clear();
    cy.get("input[name='highlightReel']").type(
      "https://www.youtube.com/embed/qpr3tXZF0mA"
    );

    cy.get("button[type='submit']").click();

    cy.scrollTo(0, 0);

    cy.headerOneCheck("John Zoidberg");
  });

  it("should show an updated video on the Highlight Reel Page", () => {
    cy.navigateToByClick("Highlight Reel");

    cy.headerTwoCheck("John");
  });
});
