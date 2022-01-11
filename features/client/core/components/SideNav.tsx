import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import UserCard from "../../user/components/UserCard";
import { navLinks } from "../data/links";

// import { Container } from './styles';

const SideNav: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <aside className='sticky top-0 flex flex-shrink-0 flex-col h-full p-8 border-r border-brand-gray/10 md:py-16'>
      <h1 className='font-semibold text-3xl mb-12'>Salu.io</h1>

      <nav className='grid gap-4'>
        {navLinks.map((link) => (
          <Link key={link.url} href={link.url}>
            <a
              className={`flex text-xl py-4 px-6 -ml-6 rounded-xl duration-300 shadow-[0_0_2rem_transparent] hover:ml-0 hover:bg-brand hover:shadow-brand/40 ${
                link.url == pathname ? "ml-0 bg-brand " : ""
              }`}
            >
              <HomeIcon className='w-6 h-6 mr-4' />
              {link.label}
            </a>
          </Link>
        ))}
      </nav>
      <UserCard className='mt-auto' />
    </aside>
  );
};

export default SideNav;
