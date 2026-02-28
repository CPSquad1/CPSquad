import Link from "next/link";

const NavLink = ({ href, pathname, children }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`pb-1.5 text-base lg:text-lg font-medium transition-all duration-300 border-b-2 ${
        isActive
          ? "text-[#00FF41] border-[#00FF41]"
          : "text-gray-300 border-transparent hover:text-[#00DD35] hover:border-[#00DD35]"
      }`}
      style={{
        textShadow: isActive ? '0 0 8px #00FF41' : 'none'
      }}
    >
      {children}
    </Link>
  );
};

const NavLinks = ({ pathname }) => {
  const links = [
    { href: "/events", label: "Events" },
    { href: "/contributors", label: "Contributors" },
    { href: "/members", label: "Members" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href} pathname={pathname}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
