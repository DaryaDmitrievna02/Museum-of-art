import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { getFavorites } from "../../utils/getFavorites";
import { getSessionStorage } from "../../utils/sessionStorage/getSessionStorage";
import { Favorites } from "./index";

jest.mock("../../utils/getFavorites");
jest.mock("../../utils/sessionStorage/getSessionStorage");

describe("Favorites Component", () => {
  beforeEach(() => {
    (getSessionStorage as jest.Mock).mockReturnValue(["1", "2"]);

    (getFavorites as jest.Mock).mockResolvedValue({
      data: [
        {
          id: "1",
          title: "Artwork 1",
          image_id: "image1",
          artist_title: "Artist 1",
        },
        {
          id: "2",
          title: "Artwork 2",
          image_id: "image2",
          artist_title: "Artist 2",
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show fetch favorites", async () => {
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Artwork 1")).toBeInTheDocument();
      expect(screen.getByText("Artwork 2")).toBeInTheDocument();
    });
  });

  it("should display 'It's empty here now' when there are no favorites", async () => {
    (getSessionStorage as jest.Mock).mockReturnValue([]);

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("It’s empty here now")).toBeInTheDocument();
    });
  });
});

