import "@testing-library/jest-dom/extend-expect";

let storage = {};

const localStorageMock = {
	setItem: (name, obj) => (storage[name] = obj),
	getItem: (name) => storage[name],
	removeItem: name => storage[name] = undefined,
	clear: () => storage = {}
};

Object.defineProperty(window, "localStorage", {
	value: localStorageMock
});