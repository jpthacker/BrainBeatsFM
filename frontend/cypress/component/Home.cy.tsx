import Home from "../../src/app/page";

describe("Home", () => {
  it("renders the homepage with the correct HTML elements", () => {
    cy.mount(<Home />);
    cy.get('[data-cy="header"]').should("contain.text", "BrainBeatsFM");
    cy.get('[data-cy="sign-up-form-container"]').should("be.visible");
    cy.get('[data-cy="sign-up-form"]').should("be.visible");
    cy.get('[data-cy="sign-up-form-label-name"]').should(
      "contain.text",
      "Name"
    );
    cy.get('input[placeholder*="Name"]');
    cy.get('[data-cy="sign-up-form-label-email"]').should(
      "contain.text",
      "Email"
    );
    cy.get('input[placeholder*="Email"]');
    cy.get('[data-cy="sign-up-form-label-password"]').should(
      "contain.text",
      "Password"
    );
    cy.get('input[placeholder*="Password"]');
    cy.get('[data-cy="sign-up-form-btn"]')
      .should("be.visible")
      .should("be.enabled");
    // cy.get(".landing-text")
    //   .should("be.visible")
    //   .should("contain.text", "Miaow then turn around");
    // cy.get(".route-button")
    //   .should("contain.text", "Sign up")
    //   .should("be.visible")
    //   .should("be.enabled");
  });
});
