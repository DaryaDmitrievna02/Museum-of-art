import { render, screen, fireEvent } from "@testing-library/react";
import { Bookmark } from "./index";
import "@testing-library/jest-dom";
import { getSessionStorage } from "../../utils/sessionStorage/getSessionStorage";

jest.mock("../../utils/sessionStorage/getSessionStorage", () => ({
  getSessionStorage: jest.fn(),
}));

describe("Bookmark Component", () => {
  const mockGetSessionStorage = getSessionStorage as jest.Mock;

  beforeEach(() => {
    sessionStorage.clear();
  });

  it("adds and removes bookmark on click", () => {
    mockGetSessionStorage.mockReturnValue([]);

    render(<Bookmark id={1} />);

    const button = screen.getByTestId("btnBookmark");

    fireEvent.click(button);

    const bookmarks = JSON.parse(sessionStorage.getItem("bookmarks") || "[]");
    expect(bookmarks).toContain(1);

    expect(button).toHaveAttribute("data-active", "true");

    fireEvent.click(button);

    const updatedBookmarks = JSON.parse(
      sessionStorage.getItem("bookmarks") || "[]",
    );
    expect(updatedBookmarks).not.toContain(1);

    expect(button).toHaveAttribute("data-active", "false");
  });
});
