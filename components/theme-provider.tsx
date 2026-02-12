"use client";

import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
