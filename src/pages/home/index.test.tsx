import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Home } from "./index";
import "@testing-library/jest-dom";
import { getResult } from "../../utils/getResult";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../utils/getResult", () => ({
  getResult: jest.fn(),
}));

const mockGetResult = getResult as jest.MockedFunction<typeof getResult>;

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("performs search and displays results", async () => {
    mockGetResult.mockResolvedValue({
      data: [
        {
          id: 1,
          image_id: "image1",
          title: "Artwork 1",
          artist_title: "Artist 1",
        },
      ],
      pagination: { total_pages: 1, current_page: 1, total: 1 },
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search art, artist, work...",
    );
    fireEvent.change(searchInput, { target: { value: "art" } });

    await waitFor(() => {
      expect(mockGetResult).toHaveBeenCalledWith("art", 1, 9);
    });
  });
  it("displays no results message when search returns no items", async () => {
    mockGetResult.mockResolvedValue({
      data: [],
      pagination: { total_pages: 0, current_page: 0, total: 0 },
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search art, artist, work...",
    );
    fireEvent.change(searchInput, { target: { value: "testtextforinput" } });

    await waitFor(() => {
      expect(mockGetResult).toHaveBeenCalledWith("testtextforinput", 1, 9);
      expect(
        screen.getByText(/The search for “testtextforinput” returned 0 items./),
      ).toBeInTheDocument();
    });
  });
});

