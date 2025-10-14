import Link from "next/link";

const MobileNavLink = ({ href, pathname, closeMenu, children }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`text-3xl font-bold transition-colors ${
        isActive ? "text-accent" : "text-white hover:text-accent"
      }`}
      onClick={closeMenu}
    >
      {children}
    </Link>
  );
};

const MobileMenu = ({ pathname, closeMenu }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 z-40">
      {links.map((link) => (
        <MobileNavLink key={link.href} href={link.href} pathname={pathname} closeMenu={closeMenu}>
          {link.label}
        </MobileNavLink>
      ))}
    </div>
  );
};

export default MobileMenu;