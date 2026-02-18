"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

export default function Portal({ children }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      el.remove();
    };
  }, []);

  return container ? createPortal(children, container) : null;
}
