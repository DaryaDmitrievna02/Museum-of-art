import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "./index";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import { Paths } from "../../constants/paths";


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));


jest.mock("../../assets/museumLogo2.svg", () => "mockMuseumLogo");
jest.mock("../../assets/modsenLogo.svg", () => "mockModsenLogo");

describe("Footer Component", () => {
  it("renders the footer and images correctly", () => {
    render(<Footer />);

    const museumLogo = screen.getByAltText("Museum of Art");
    const modsenLogo = screen.getByAltText("Modsen");

    expect(museumLogo).toBeInTheDocument();
    expect(modsenLogo).toBeInTheDocument();
  });

  it("navigates to home when the museum logo is clicked", () => {
    const mockNavigate = jest.fn(); 
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate); 

    render(<Footer />);

    const museumLogo = screen.getByAltText("Museum of Art");

    fireEvent.click(museumLogo);

    expect(mockNavigate).toHaveBeenCalledWith(Paths.home);
  });
});
