it("should allow the user to expand and collapse the summary card", () => {
  cy.visit("/update");

  //check this line as it's very flaky
  cy.scrollTo(0, 300);

  cy.get("[data-cy='details-element']").click().wait(1500);

  cy.checkDetails("[data-cy='details-card']", 0, "Forename: Bender");

  cy.get("[data-cy='summary-element']").click().wait(1500);
});
