import "@testing-library/jest-dom";

import { fireEvent,render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Оборачиваем в Router для корректной работы Link

import { BurgerMenu } from "./index"; // Импортируем компонент

const mockUseBurger = jest.fn();

jest.mock("../../utils/customHooks/useBurger", () => ({
  useBurger: () => mockUseBurger(),
}));
describe("BurgerMenu Component", () => {
  it("renders Link components when menu is open", () => {
    mockUseBurger.mockReturnValue({
      isOpen: true,
      toggleMenu: jest.fn(),
    });

    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>,
    );

    const homeLink = screen.getByText("Home");
    const favoritesLink = screen.getByText("Favorites");

    expect(homeLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it("toggles menu when button is clicked", () => {
    const toggleMenu = jest.fn();

    mockUseBurger.mockReturnValue({
      isOpen: false,
      toggleMenu,
    });

    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>,
    );

    const button = screen.getByText("☰");

    fireEvent.click(button);

    expect(toggleMenu).toHaveBeenCalled();
  });
});
