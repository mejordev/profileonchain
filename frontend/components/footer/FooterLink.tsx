type FooterLinkProps = {
  linkText: string;
  linkAddress: string;
};

const FooterLink = (footerLink: FooterLinkProps) => {
  return (
    <>
      <span className=" font-medium text-center">{footerLink.linkText}</span>
    </>
  );
};

export default FooterLink;
