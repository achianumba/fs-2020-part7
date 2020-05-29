//demo blogs
const blogs = [
    {
        title: "A Day in the Life of a Tester",
        author: "E2E Tester",
        url: "http://localhost:3000/e2e_tester/blogs/A_Day_in_the_Life_of_a_Tester"
    },
    {
        title: "A Day in the Life of a Fullstack Developer",
        author: "Fullstack Developer",
        url: "http://localhost:3000/Fullstack_Developer/blogs/A_Day_in_the_Life_of_a_FullStack_Developer"
    }
];

describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.signup({ name: "tester", username: "tester", password: "tester123" });
  });

  it("display defaults to login page", function () {
    cy.contains("Login");
    cy.should("not.contain", "Logged in as");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("tester123");
      cy.get("#login").click();
      cy.contains("tester");
      cy.contains("Blogs");
      cy.get("#site-header").find("button").click();
    });

    it("fails with incorrect credentials", function () {
      cy.request({
        url: "http://localhost:3001/api/login",
        method: "POST",
        body: { name: "tester", password: "testingGear" },
        failOnStatusCode: false
      });

      cy.contains("Login");
      cy.should("not.contain", "tester");
      cy.should("not.contain", "Blogs");
    });
  });

  describe("A logged-in user", function () {
    beforeEach(function () {
      cy.login({ username: "tester", password: "tester123" }); // login
    });

    afterEach(function() {
        cy.contains("Log out").click(); //log out
    });

    it("can create a blog", function () {
      cy.contains("Create Blog").click();
      cy.get("#create-blog-title").type("A Day in the Life of a Tester");
      cy.get("#create-blog-author").type("E2E Tester");
      cy.get("#create-blog-url").type("http://localhost:3000/test_blog");
      cy.get("#create-blog").click();

      cy.get("#blogs").contains("A Day in the Life of a Tester");
    });

    it("can like a blog", function () {
      cy.contains("Create Blog").click();
      cy.get("#create-blog-title").type("A Day in the Life of a Tester");
      cy.get("#create-blog-author").type("E2E Tester");
      cy.get("#create-blog-url").type("http://localhost:3000/test_blog");
      cy.get("#create-blog").click();

      cy.get(".toggle-blog-collapsed-details").click();

      cy.get(".blog-likes").contains("0");
      cy.get(".like-blog").click();
      cy.get(".blog-likes").contains("1");
    });

    it("who created a blog can delete it", function() {
        cy.createBlog(blogs[0]);
        cy.get("#blogs").contains(blogs[0].title);
        cy.get(".toggle-blog-collapsed-details").click();
        cy.get(".delete-blog").click();
        cy.get("#blogs").should("not.contain", blogs[0].title);
    });

    it("who DID NOT create a blog CAN NOT delete it", function() {
        cy.createBlog(blogs[0]);
        cy.get("#blogs").contains(blogs[0].title);
        cy.contains("Log out").click(); //log out to avoid user conflict
        //create new user
        cy.signup({
            name: "Fullstack Developer",
            username: "fullstack-dev",
            password: "fullstackdev123",
          });
        //sign in as new user
        cy.login({ username: "fullstack-dev", password: "fullstackdev123" });
        
        cy.get(".toggle-blog-collapsed-details").click();
        cy.get(".delete-blog").click();
        cy.get("#blogs").should("contain", blogs[0].title); //won't delete
        cy.get(".message-error").contains("Unable to delete blog");
    });

    it("see blogs with the most likes first", function() {
        cy.createBlog(blogs[0]);
        cy.createBlog(blogs[1]);

        cy.get("#blogs").find(".blog")
        
        //blog1
        cy.contains(blogs[0].title).parent().as("blog1");    //give the first blog an alias
        cy.get("@blog1").find(".toggle-blog-collapsed-details").as('blogDetails1'); //view/hide button
        cy.get("@blogDetails1").click();
        cy.get("@blog1").find(".blog-likes").as("likes1")   //number of likes
        cy.get("@blog1").find(".like-blog").as("likeBlog1");

        cy.get("@likeBlog1").click();
        cy.get("@likes1").contains("Likes: 1");
        cy.get("@likeBlog1").click();
        cy.get("@likes1").contains("Likes: 2");
        cy.visit("http://localhost:3000");

        cy.get("#blogs")
        .find(".blog").as("blogLikes");

        cy.get("@blogLikes")
        .find(".toggle-blog-collapsed-details").click({multiple: true});
        
        cy.get(".blog-likes:first").contains("2");
        cy.get(".blog-likes:last").contains("0");
    });
  });
});