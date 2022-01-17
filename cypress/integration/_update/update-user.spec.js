import attributes from "../../_helpers/_attribute-enums/attributes.enum";
import links from "../../_helpers/_link-enums/links.enum";
import userTwo from "../../_helpers/_user-mocks/user-two.enum";

describe("Testing Updating the User Details", () => {
  it("should update form details and update state", () => {
    cy.visit("/update");

    const newformValues = {
      firstName: `${userTwo.FORENAME}`,
      middleNames: `${userTwo.MIDDLENAMES}`,
      surName: `${userTwo.SURNAME}`,
      address: `${userTwo.ADDRESS}`,
      jobRole: `${userTwo.JOBROLE}`,
      avatar: `${userTwo.AVATAR}`,
      highlightReel: `${userTwo.VIDEO_URL}`,
    };

    cy.updateFields(newformValues);
    cy.get("button[type='submit']").click();
    cy.scrollTo(0, 0);
    cy.headerType(
      `${attributes.WELCOME}`,
      `${userTwo.FORENAME} ${userTwo.SURNAME}`
    );
  });

  it("should show an updated video on the Highlight Reel Page", () => {
    cy.navigate(`${links.VIDEO}`);
    cy.headerType(`${attributes.VIDEO}`, `${userTwo.FORENAME}`);
  });
});
