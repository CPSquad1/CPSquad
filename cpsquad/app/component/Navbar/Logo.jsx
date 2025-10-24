import Link from "next/link";
import CPSquadLogo from "./CPSquadLogo";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <CPSquadLogo className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 text-green-500" />
      </div>
      <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
        CP SQUAD
      </span>
    </Link>
  );
};

export default Logo;