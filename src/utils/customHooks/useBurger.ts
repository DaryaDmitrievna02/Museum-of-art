import { useEffect, useRef, useState } from "react";

export const useBurger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  const handleClick = (e: MouseEvent) => {
    if (isOpen) return;
    if (
      menuRef.current &&
      toggleRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !toggleRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    openMenu,
    toggleRef,
    menuRef,
    handleClick,
  };
};

