import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { bookmarkStorageService } from "@utils/sessionStorage/getSessionStorage";

import { Bookmark } from "../bookmark/index";

jest.mock("@utils/sessionStorage/getSessionStorage", () => ({
  bookmarkStorageService: {
    getBookmarks: jest.fn(),
    setBookmarks: jest.fn(),
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    clearBookmarks: jest.fn(),
    hasBookmarksLength: jest.fn(),
  },
}));

describe("Bookmark Component", () => {
  const mockGetBookmarks = bookmarkStorageService.getBookmarks as jest.Mock;
  const mockAddBookmark = bookmarkStorageService.addBookmark as jest.Mock;
  const mockRemoveBookmark = bookmarkStorageService.removeBookmark as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly handle bookmark addition and removal", () => {
    mockGetBookmarks.mockReturnValue([1, 2, 3]);

    render(<Bookmark id={1} />);

    const button = screen.getByTestId("btnBookmark");

    expect(button).toHaveAttribute("data-active", "true");

    fireEvent.click(button);
    expect(mockRemoveBookmark).toHaveBeenCalledWith(1);
    expect(button).toHaveAttribute("data-active", "false");

    mockGetBookmarks.mockReturnValue([]);

    fireEvent.click(button);
    expect(mockAddBookmark).toHaveBeenCalledWith(1);
    expect(button).toHaveAttribute("data-active", "true");
  });
});
