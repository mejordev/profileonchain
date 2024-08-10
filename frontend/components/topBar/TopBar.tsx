import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';
import { Menu } from './Menu';

interface TopBarProps {}

export const TopBar = (props: TopBarProps) => {
  const {} = props;

  return (
    <div className="relative py-6">
      <div className="container flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/" className="text-xl flex gap-2 items-center">
            <Image
              src="next.svg"
              alt="logo"
              height={50}
              width={50}
              color="white"
            />
            <h2 className="uppercase font-semibold relative">
              ProfileOnchain
              <span className="absolute right-[-20px] top-[110%] text-xs font-bold text-primary bg-white px-1.5 rounded-full">
                BETA
              </span>
            </h2>
          </Link>
        </div>

        <div className="flex sm:hidden">
          <MobileMenu />
        </div>
        <div className="hidden sm:flex items-center justify-end gap-2">
          <Menu />
        </div>
      </div>
    </div>
  );
};
