const BOTTOM_NAV_BLACKLIST = ["/login", "/signup"];

export const renderBottomNav = (pathname: string): boolean => {
  return !BOTTOM_NAV_BLACKLIST.includes(pathname);
};
