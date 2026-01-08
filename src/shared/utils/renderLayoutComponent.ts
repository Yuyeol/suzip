const HEADER_BLACKLIST = ["/login", "/signup"];
const BOTTOM_NAV_BLACKLIST = ["/login", "/signup"];

type LayoutComponent = "header" | "bottomNav";

export const renderLayoutComponent = (
  pathname: string,
  component: LayoutComponent
): boolean => {
  const blacklist =
    component === "header" ? HEADER_BLACKLIST : BOTTOM_NAV_BLACKLIST;
  return !blacklist.includes(pathname);
};
