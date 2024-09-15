import { useState } from "react";

export const useBurger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  return { isOpen, toggleMenu, closeMenu, openMenu };
};
