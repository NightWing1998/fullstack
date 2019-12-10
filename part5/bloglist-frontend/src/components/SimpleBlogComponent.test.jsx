import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";;
import SimpleBlog from "./SimpleBlogComponent";
import { stat } from "fs";

describe("<SimpleBlogComponent />", () => {

	const blog = {
		title: "The blog with some title",
		author: "The one with some name",
		likes: 10
	};
	let mockClick;
	let component;

	beforeEach(() => {
		mockClick = jest.fn();
		component = render(<SimpleBlog blog={blog} onClick={mockClick} />);
	});

	test("Rendering the blog component...", () => {
		const header = component.container.querySelector(".blog__header");
		const body = component.container.querySelector(".blog__body");

		expect(header).toHaveTextContent(blog.title);
		expect(header).toHaveTextContent(blog.author);
		expect(body).toHaveTextContent(blog.likes);
	});

	test("# of button calls are imp....", () => {
		const button = component.getByText("like");
		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockClick.mock.calls.length).toBe(2);
	});

	test("The blogs have dynamic part.....", () => {
		const fixed = component.container.querySelector(".static");
		const dynamic = component.container.querySelector(".dynamic");

		expect(fixed).toHaveStyle("display : block");
		expect(dynamic).toHaveStyle("display : none");

		fireEvent.click(fixed);

		expect(dynamic).toHaveStyle("display : block");

		fireEvent.click(fixed);

		expect(dynamic).toHaveStyle("display : none");
	});
});