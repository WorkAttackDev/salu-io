import useAuth from "@/client/user/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { linksObj } from "../data/links";
import Button from "./Button";
import Loading from "./Loading";
import MainLayout from "./MainLayout";
import SectionHeader from "./SectionHeader";
import SideNav from "./SideNav";

// import { Container } from './styles';

type Props = {
  children: React.ReactNode;
};

const AuthChecker = ({ children }: Props) => {
  const { isLoading, user } = useAuth();
  const { pathname } = useRouter();

  const isAuthRoute = pathname.includes("/auth");

  return (
    <>
      {!isAuthRoute && <SideNav />}

      {user || isAuthRoute ? (
        <>{children}</>
      ) : (
        <MainLayout>
          <SectionHeader
            title='Inicie Sessão para continuar'
            className='mb-8'
          />
          <Link href={linksObj.login.url}>
            <a>
              <Button>Iniciar Sessão</Button>
            </a>
          </Link>
        </MainLayout>
      )}

      {isLoading && <Loading isLoading={isLoading} />}
    </>
  );
};

export default AuthChecker;
