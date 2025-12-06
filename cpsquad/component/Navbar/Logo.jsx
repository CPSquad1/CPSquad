import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/images/logo.png" //TODO: replace with actual logo once made available

        alt="CPSquadLogo"
        width={50}
        height={50}
        className="h-12 w-auto"
      />
    </Link>
  );
};
export default Logo;

//! Web_source  of the image  href="https://www.vecteezy.com/free-png/working