import Head from "next/head";
import React from "react";

// import { Container } from './styles';

const MetaInfo: React.FC = () => {
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>Salu.io - workattack gestor de projetos</title>
      <meta name='title' content='Salu.io - workattack gestor de projetos' />
      <meta
        name='description'
        content='Salu.io - workattack gestor de projetos'
      />

      {/* Open Graph / Facebook  */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://salu-io.vercel.app/' />
      <meta
        property='og:title'
        content='Salu.io - workattack gestor de projetos'
      />
      <meta
        property='og:description'
        content='Salu.io - workattack gestor de projetos'
      />
      <meta property='og:image' content='/01.jpeg' />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://salu-io.vercel.app/' />
      <meta
        property='twitter:title'
        content='Salu.io - workattack gestor de projetos'
      />
      <meta
        property='twitter:description'
        content='Salu.io - workattack gestor de projetos'
      />
      <meta property='twitter:image' content='/01.jpeg'></meta>

      {/* extra */}
      <meta name='keywords' content='workattack, management, tool' />
      <meta name='robots' content='index, nofollow' />
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='Portuguese' />
      <meta name='author' content='Work Attack' />
    </Head>
  );
};

export default MetaInfo;
