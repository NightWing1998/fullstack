describe("The Blog App", function () {

	beforeEach(function () {
		cy.request("POST", "http://localhost:3000/api/tests");
		const user = {
			username: "test@123",
			name: "test user",
			password: "passwordTest"
		};
		cy.request("POST", "http://localhost:3000/api/users", user);
	});

	describe("tests with login!", function () {
		beforeEach(function () {
			cy.visit("http://localhost:3001");
			cy.contains("Login");
			cy.get("#username")
				.type("test@123");
			cy.get("#password")
				.type("passwordTest");
			cy.contains("Log in")
				.click();
			cy.contains("Login successfull! Welcome test@123");
		});

		it("Try logging out....", function () {
			cy.contains("Logout")
				.click();
			cy.contains("Login");
		});

		it("The blog testing...", function () {
			cy.contains("Create New Blog")
				.click();
			cy.get("#title")
				.type("Blog title");
			cy.get("#author")
				.type("Blog Author");
			cy.get("#url")
				.type("https://fullstackopen.com");
			cy.contains("+")
				.click();
			cy.contains("Successfully created new blog - Blog title");

			cy.get(".blog__link:first")
				.click();
			cy.contains("https://fullstackopen.com");
			cy.contains("0");
			cy.contains("Like")
				.click();
			cy.get(".blog__like:first").contains("1");
			cy.contains("Delete")
				.click();
			cy.contains("Create New Blog");

		});

	});
});