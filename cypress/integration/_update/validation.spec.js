describe("Testing Form Validation", () => {
  it("should not allow the user to submit form if form is invalid", () => {
    cy.visit("/update");
    cy.scrollTo(0, 600);
    cy.get("[data-cy='user-form']");
    cy.get("input[name='middleNames']").clear();
    cy.get("input[name='address']").clear();
    cy.get("[data-cy='user-form-submit-button']").should("be.disabled");
  });

  it("should allow the user to submit when form is valid", () => {
    cy.get("input[name='middleNames']").type("A Middle Name");
    cy.get("input[name='address']").type("An Address");
    cy.get("[data-cy='user-form-submit-button']").should("not.be.disabled");
  });
});
