import headerText from "../_helpers/_text-enums/text.enum";
import attributes from "../_helpers/_attribute-enums/attributes.enum";

Cypress.Commands.add("navigate", (link) => cy.get(`[data-cy=${link}]`).click());

Cypress.Commands.add("headerType", (attribute, name) => {
  cy.get(`[data-cy=${attribute}]`).should("exist").invoke("text");
  if (attribute === `${attributes.WELCOME}`) {
    cy.should("equal", `${headerText.WELCOME} ${name}!`);
  } else {
    cy.should("equal", `${name}, ${headerText.VIDEO}`);
  }
});

//check values on repeated elements
Cypress.Commands.add("checkDetails", (selector, index, value) => {
  cy.get(`${selector}`)
    .find("p")
    .eq(index)
    .invoke("text")
    .should("equal", `${value}`);
});

//update input fields with name and value
Cypress.Commands.add("updateFields", (values) => {
  cy.scrollTo(400).wait(1500);

  for (const [key, value] of Object.entries(values)) {
    cy.get(`input[name='${key}']`).clear();
    cy.get(`input[name='${key}']`).type(`${value}`);
  }
});
