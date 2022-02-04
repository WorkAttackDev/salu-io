import Link from "next/link";
import React, { FC } from "react";

// import { Container } from './styles';
type Props = {
  title: string;
  className?: string;
  link?: {
    href: string;
    label: string;
  };
};

const SectionHeader: FC<Props> = ({
  title,
  link,
  children,
  className = "",
}) => {
  return (
    <header
      className={`flex justify-between items-center pt-8 border-t border-brand-gray/10 ${className}`}
    >
      <span className='flex w-full justify-between space-x-8'>
        <h5 className='mr-4 text-4xl font-bold'>{title}</h5>
        {children}
      </span>
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
