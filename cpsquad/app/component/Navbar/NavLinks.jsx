import Link from "next/link";

const NavLink = ({ href, pathname, children }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`pb-1 transition-colors border-b-2 ${
        isActive
          ? "text-white border-accent"
          : "text-gray-300 border-transparent hover:text-white hover:border-accent"
      }`}
    >
      {children}
    </Link>
  );
};

const NavLinks = ({ pathname }) => {
  const links = [
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/Blog-section", label: "Blogs" },
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href} pathname={pathname}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
