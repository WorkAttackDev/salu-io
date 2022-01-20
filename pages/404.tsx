import Link from "next/link";
import React from "react";
import MainLayout from "../features/client/core/components/MainLayout";
import SectionHeader from "../features/client/core/components/SectionHeader";
import { navLinks } from "../features/client/core/data/links";

// import { Container } from './styles';

const Page404: React.FC = () => {
  return (
    <MainLayout className='w-full'>
      <SectionHeader title='Erro 404' className='mb-8' />
      <p className='text-brand-gray-1 mb-12'>Página não encontrada!</p>
      <nav className='flex flex-wrap items-baseline space-y-4 space-x-4 sm:space-y-0'>
        <p className='text-xl text-brand-gray-1'>Talvez você procura por: </p>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.url}>
            <a className='text-xl text-brand-gray-2 hover:text-brand'>
              {link.label}
            </a>
          </Link>
        ))}
      </nav>
    </MainLayout>
  );
};

export default Page404;
