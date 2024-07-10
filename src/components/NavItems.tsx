"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [isAnyOpen]);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => {
    if (isAnyOpen) {
      setActiveIndex(null);
    }
  });

  return (
    <>
      <div className="flex gap-4 h-full" ref={navRef}>
        {PRODUCT_CATEGORIES.map((category, i) => {
          const handleopen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };

          const isOpen = activeIndex === i;

          return (
            <NavItem
              key={category.value}
              category={category}
              handleOpen={handleopen}
              isOpen={isOpen}
              isAnyOpen={activeIndex !== null}
            />
          );
        })}
      </div>
    </>
  );
};

export default NavItems;
