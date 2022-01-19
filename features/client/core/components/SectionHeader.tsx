import Link from "next/link";
import React from "react";

// import { Container } from './styles';
type Props = {
  title: string;
  className?: string;
  link?: {
    href: string;
    label: string;
  };
};

const SectionHeader = ({ title, link, className = "" }: Props) => {
  return (
    <header
      className={`flex justify-between items-center pt-8 border-t border-brand-gray/10 ${className}`}
    >
      <h5 className='mr-4 text-4xl font-bold'>{title}</h5>
      {link && (
        <Link href={link.href}>
          <a className='text-lg text-brand-gray/50 hover:text-brand-gray/80'>
            {link.label}
          </a>
        </Link>
      )}
    </header>
  );
};

export default SectionHeader;
