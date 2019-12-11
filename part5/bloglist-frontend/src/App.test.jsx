import React from 'react'
import {
	render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App';

describe("<App />", () => {
	const component = render(<App />);

	test("No login test for blogs...", async () => {
		component.rerender(<App />);

		await waitForElement(() => component.getAllByText("Login"));

		const loginform = component.container.querySelector("#login");
		const blogs = component.container.querySelectorAll(".blog");

		expect(loginform).toHaveTextContent("Login");
		expect(blogs.length).toBe(0);
	});

	test("Login provided.... display blogs now", async () => {
		const user = {
			username: "dhruvil.s",
			token: 121212,
			id: 1
		};
		localStorage.setItem("user", JSON.stringify(user));

		component.rerender(<App />);

		await waitForElement(() => component.container.querySelector(".userspace"));

		const blogs = component.container.querySelectorAll(".blog");

		expect(blogs.length).toBe(6);
	});
});