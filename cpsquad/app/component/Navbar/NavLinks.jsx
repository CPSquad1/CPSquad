import Link from "next/link";

const NavLink = ({ href, pathname, children }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`pb-1 transition-colors border-b-2 ${
        isActive
          ? "text-white border-green-500"
          : "text-gray-300 border-transparent hover:text-white hover:border-green-500"
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
    { href: "/blogs", label: "Blogs" },
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
