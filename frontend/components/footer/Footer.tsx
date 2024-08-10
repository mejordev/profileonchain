import { FaXTwitter } from 'react-icons/fa6';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import FooterIcon from './FooterIcon';
import FooterLink from './FooterLink';
import Link from 'next/link';
import Image from 'next/image';

const icons = [
  { icon: FaXTwitter, title: 'xIcon', link: '' },
  { icon: FaTelegramPlane, title: 'telegramIcon', link: '' },
  { icon: FaDiscord, title: 'discordIcon', link: '' },
];

const footerLinks = [
  { linkText: 'Terms and Conditions', linkAddress: '' },
  { linkText: 'About Us', linkAddress: '' },
  { linkText: 'Contact Us', linkAddress: '' },
];

export const Footer = () => {
  return (
    <div className="relative flex flex-col lg:flex-row bg-primary py-4 justify-center items-center rounded-t-2xl z-1 font-light gap-6 lg:gap-8 text-primary-foreground">
      <div className="flex gap-2 items-center">
        <Link href="/" className="text-xl flex gap-1 items-center">
          <Image src="vercel.svg" alt="logo" width={40} height={40} />
        </Link>
        <div className="text-[14px]">
          @ProfilOnchain 2024. All rights reserved.
        </div>
      </div>
      <div className="hidden lg:block">|</div>
      <div className="flex items-center justify-center lg:flex-row lg:items-start gap-4">
        {footerLinks.map((footerLink, idx) => (
          <FooterLink
            key={idx}
            linkText={footerLink.linkText}
            linkAddress={footerLink.linkAddress}
          />
        ))}
      </div>
      <div className="hidden lg:block">|</div>

      <div className="flex gap-4">
        {icons.map(iconData => (
          <FooterIcon iconData={iconData} key={iconData.title} />
        ))}
      </div>
    </div>
  );
};
