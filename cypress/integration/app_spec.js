describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/")
      .get(".cardNumber")
      .type("1234567890", { delay: 200 })
      .should("have.value", "1234567890")
      .type("{leftarrow}{rightarrow}{uparrow}{downarrow}")
      .type("{del}{selectall}{backspace}")
      .type("{alt}{option}")
      .type("{ctrl}{control}")
      .type("{meta}{command}{cmd}")
      .type("{shift}")
      .type("1234567890", { delay: 200 })
      .should("have.value", "1234567890")
      .focus()
      .should("have.class", "error");
  });
});
