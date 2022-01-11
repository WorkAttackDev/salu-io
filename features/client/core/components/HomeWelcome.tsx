import Link from "next/link";
import React from "react";
import { linksObj } from "../data/links";
import Button from "./Button";

// import { Container } from './styles';

const stats = [
  { value: 10, label: "Concluídos" },
  { value: 20, label: "Em andamento" },
  { value: 20, label: "Em carteira" },
];

const HomeWelcome: React.FC = () => {
  return (
    <section className='flex items-start space-x-12'>
      <article className='grid col-span-2 justify-items-start content-start gap-8'>
        <h4 className='text-5xl leading-[4rem]'>
          Benvindo, qual vai ser o Salu do dia?
        </h4>
        <p className='text-xl text-brand-gray-1 leading-8'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          odio praesentium quidem eligendi a in amet repellendus libero nemo?
          Nobis velit perferendis ullam voluptas tenetur natus dicta dolore
          earum accusamus?
        </p>
        <Link href={linksObj.projects.url}>
          <a>
            <Button theme='secondary'>Projetos</Button>
          </a>
        </Link>
      </article>
      {/*  */}
      <section className='relative flex flex-shrink-0 max-w-lg  rounded-lg bg-brand-gray-2/50 before:absolute before:bg-brand-gray before:w-2 before:top-8 before:bottom-8 before:left-0 before:rounded-tr-lg before:rounded-br-lg'>
        <span className='flex flex-col justify-center items-center py-8 px-12'>
          <strong className='text-5xl mb-2'>30%</strong>
          <p>Concluído</p>
        </span>
        <article className='flex flex-wrap justify-around items-baseline space-x-4 space-y-4 py-4 px-8 text-xl border-l border-brand-dark/50'>
          {stats.map((stat) => (
            <p className='flex text-xl text-brand-gray-1'>
              <strong className='text-2xl text-brand-gray mr-2'>
                {stat.value}
              </strong>{" "}
              {stat.label}
            </p>
          ))}
        </article>
      </section>
    </section>
  );
};

export default HomeWelcome;
