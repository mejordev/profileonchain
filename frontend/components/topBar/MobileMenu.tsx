"use client";
import React, { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { Menu } from "./Menu";
import { IoClose } from "react-icons/io5";
export const MobileMenu = (props: MobileMenuProps) => {
  const {} = props;
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setShowMenu(false));

  const handleDropdownMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div ref={menuRef} className="relative z-30">
      {showMenu ? (
        <IoClose onClick={() => setShowMenu((state) => !state)} size={24} />
      ) : (
        <FiMenu onClick={() => setShowMenu((state) => !state)} size={24} />
      )}

      {showMenu && (
        <div
          className="absolute top-full right-full flex flex-col bg-primary rounded-xl p-2"
          onMouseDown={handleDropdownMouseDown}
        >
          <Menu />
        </div>
      )}
    </div>
  );
};

export const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: { (): void }) => {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, callback]);
};

interface MobileMenuProps {}

