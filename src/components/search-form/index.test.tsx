import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "./index";

describe("SearchForm", () => {
  it("должен отображать переданное значение query", () => {
    const mockSetQuery = jest.fn();
    const query = "Picasso";

    render(<SearchForm query={query} setQuery={mockSetQuery} />);

    const input = screen.getByPlaceholderText("Search art, artist, work...");
    expect(input).toHaveValue(query);
  });

  it("должен вызывать setQuery при изменении значения в input", () => {
    const mockSetQuery = jest.fn();
    const query = "Picasso";

    render(<SearchForm query={query} setQuery={mockSetQuery} />);

    const input = screen.getByPlaceholderText("Search art, artist, work...");
    fireEvent.change(input, { target: { value: "Van Gogh" } });
    expect(mockSetQuery).toHaveBeenCalledWith("Van Gogh");
  });
});
