import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import UserCard from "../../user/components/UserCard";
import { navLinks } from "../data/links";

// import { Container } from './styles';

const SideNav: React.FC = () => {
  const { pathname } = useRouter();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const expandedStyle = "absolute z-10 px-8 py-8";
  const compressStyle = "sticky top-0 px-4 py-8";

  return (
    <aside
      className={`${
        isExpanded ? expandedStyle : compressStyle
      }  bg-brand-dark flex flex-shrink-0 flex-col h-full  border-r border-brand-gray/10 md:py-16 md:px-8 md:sticky md:top-0`}
    >
      <h1
        className={`${
          isExpanded
            ? "grid-flow-col justify-between"
            : "grid-flow-row justify-center"
        } grid gap-4 font-semibold text-3xl mb-12`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            Salu.io
            <ChevronDoubleLeftIcon role='button' className='w-8 h-8' />
          </>
        ) : (
          <ChevronDoubleRightIcon role='button' className='w-8 h-8' />
        )}
      </h1>

      <nav className='grid gap-4'>
        {navLinks.map((link) => (
          <Link key={link.url} href={link.url}>
            <a
              className={` ${
                isExpanded ? "-ml-6" : "justify-center"
              } flex p-4  rounded-xl duration-300 shadow-[0_0_2rem_transparent] hover:ml-0 hover:bg-brand hover:shadow-brand/40 sm:py-4 sm:px-6 ${
                link.url == pathname ? "ml-0 bg-brand " : ""
              }`}
            >
              <HomeIcon className='w-6 h-6 ' />
              <p className={`${isExpanded ? "block" : "hidden"} text-xl ml-4`}>
                {link.label}
              </p>
            </a>
          </Link>
        ))}
      </nav>
      <UserCard className='mt-auto' isExpanded={isExpanded} />
    </aside>
  );
};

export default SideNav;
