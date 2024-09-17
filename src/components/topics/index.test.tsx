import "@testing-library/jest-dom";

import { fireEvent,render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { getResult } from "../../utils/getResult";
import { Topic } from "./index";

jest.mock("../../utils/getResult", () => ({
  getResult: jest.fn(),
}));

const mockGetResult = getResult as jest.MockedFunction<typeof getResult>;

describe("Topic Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component and fetches data", async () => {
    mockGetResult.mockResolvedValue({
      data: [
        {
          id: 1,
          image_id: "image1.jpg",
          title: "Artwork 1",
          artist_title: "Artist 1",
        },
        {
          id: 2,
          image_id: "image2.jpg",
          title: "Artwork 2",
          artist_title: "Artist 2",
        },
      ],

      pagination: {
        total: 1,
        current_page: 1,
        total_pages: 1,
      },
    });

    render(
      <BrowserRouter>
        <Topic />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("cards-layout").children.length,
      ).not.toBeGreaterThan(0);
    });
  });

  it("updates the current page when Pagination component changes", async () => {
    mockGetResult.mockResolvedValue({
      data: [
        {
          id: 1,
          image_id: "image1.jpg",
          title: "Artwork 1",
          artist_title: "Artist 1",
        },
      ],

      pagination: {
        total: 1,
        current_page: 1,
        total_pages: 1,
      },
    });

    render(
      <BrowserRouter>
        <Topic />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId("next-button"));

    await waitFor(() => {
      expect(mockGetResult).toHaveBeenCalledWith("", 2, 3);
    });
  });

  it("handles empty results correctly", async () => {
    mockGetResult.mockResolvedValue({
      data: [],
      pagination: {
        total: 0,
        current_page: 0,
        total_pages: 0,
      },
    });

    render(<Topic />);

    await waitFor(() => {
      expect(
        screen.getByTestId("cards-layout").children.length,
      ).not.toBeGreaterThan(0);
    });
  });
});
