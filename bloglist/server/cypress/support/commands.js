// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("signup", ({ name, username, password }) => {
  cy.request("POST", "http://localhost:3001/api/users", {
    name,
    username,
    password,
  }).then(() => {
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request({
    url: "http://localhost:3001/api/login",
    method: "POST",
    body: { username, password },
    // failOnStatusCode: false //ensures test does not fail on 4xx or 5xx status code
  }).then(({ body }) => {
    cy.visit("http://localhost:3000");
    localStorage.setItem("user", JSON.stringify(body));
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }, failOnStatusCode = true) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
    failOnStatusCode
  }).then(() => {
    cy.visit("http://localhost:3000");
  });
});