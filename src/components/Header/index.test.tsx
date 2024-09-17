import "@testing-library/jest-dom";

import { fireEvent,render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import { Paths } from "../../constants/paths";
import { Header } from "./index";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../assets/museumLogo.svg", () => "mockLogo");
jest.mock("../../assets/bookmark.svg", () => "mockBookmark");

describe("Header Component", () => {
  it("renders Header", () => {
    render(<Header />);

    const museumLogo = screen.getByAltText("Museum of Art");
    const bookmark = screen.getByAltText("Bookmark");

    expect(museumLogo).toBeInTheDocument();
    expect(bookmark).toBeInTheDocument();
  });

  it("navigates to home when the logo is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<Header />);

    fireEvent.click(screen.getByAltText("Museum of Art"));
    expect(mockNavigate).toHaveBeenCalledWith(Paths.home);
  });

  it("navigates to favorites when the div is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<Header />);

    fireEvent.click(screen.getByTestId("favorites"));
    expect(mockNavigate).toHaveBeenCalledWith(Paths.favorites);
  });
});

