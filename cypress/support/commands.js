Cypress.Commands.add("navigateToByClick", (link) =>
  cy.contains(`${link}`).click()
);

Cypress.Commands.add("headerOneCheck", (name) =>
  cy.get("h1").contains(`Welcome ${name}!`)
);

Cypress.Commands.add("headerTwoCheck", (name) =>
  cy.get("h2").contains(`${name}, here's your best bits!`)
);
