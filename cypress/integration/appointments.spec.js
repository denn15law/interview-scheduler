describe("Appointments", () => {
  //reset database
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //click add button on second appointment
    cy.get("[alt=Add]").first().click();
    //type in form a name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //click sylvia palmer innterviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //click save button
    cy.contains("button", "Save").click();

    //sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });
    //clear input
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    //click save button
    cy.contains("button", "Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
