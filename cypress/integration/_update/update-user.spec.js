import attributes from "../../_helpers/attributes.enum";
import links from "../../_helpers/links.enum";

describe("Updating the User Details", () => {
  it("should update form details and update state", () => {
    cy.visit("/update");

    const newformValues = {
      firstName: "John",
      middleNames: "A",
      surName: "Zoidberg",
      address: "Homeless",
      jobRole: "Doctor",
      avatar:
        "https://static.wikia.nocookie.net/enfuturama/images/f/f8/Doctor_John_A._Zoidberg_-_Official_Promo.jpg",
      highlightReel: "https://www.youtube.com/embed/qpr3tXZF0mA",
    };

    //input new details into form
    cy.updateFields(newformValues);

    cy.get("button[type='submit']").click();

    cy.scrollTo(0, 0);

    cy.headerType(`${attributes.WELCOME}`, "John Zoidberg");
  });

  it("should show an updated video on the Highlight Reel Page", () => {
    cy.navigate(`${links.VIDEO}`);

    cy.headerType(`${attributes.VIDEO}`, "John");
  });
});
