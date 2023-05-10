import Home from "../../src/app/page";

describe("Home", () => {
  it("renders the homepage with the correct HTML elements", () => {
    cy.mount(<Home />);
    cy.get('[data-cy="header"]').should("contain.text", "BrainBeatsFM");
    // cy.get(".landing-text")
    //   .should("be.visible")
    //   .should("contain.text", "Miaow then turn around");
    // cy.get(".route-button")
    //   .should("contain.text", "Sign up")
    //   .should("be.visible")
    //   .should("be.enabled");
  });
});
