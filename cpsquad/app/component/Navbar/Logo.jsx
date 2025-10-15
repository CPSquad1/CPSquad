import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/images/logo.png" //TODO: replace with actual logo once made available
        alt="CPSquadLogo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default Logo;
