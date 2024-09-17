import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { SearchForm } from "../search-form/index";

describe("SearchForm", () => {
  it("should display the passed value", () => {
    const mockSetQuery = jest.fn();
    const query = "Picasso";

    render(<SearchForm query={query} setQuery={mockSetQuery} />);

    const input = screen.getByPlaceholderText("Search art, artist, work...");
    expect(input).toHaveValue(query);
  });

  it("should call setQuery when the value in input changes", () => {
    const mockSetQuery = jest.fn();
    const query = "Picasso";

    render(<SearchForm query={query} setQuery={mockSetQuery} />);

    const input = screen.getByPlaceholderText("Search art, artist, work...");
    fireEvent.change(input, { target: { value: "Van Gogh" } });
    expect(mockSetQuery).toHaveBeenCalledWith("Van Gogh");
  });
});

