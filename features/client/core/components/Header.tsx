import { PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditBroaValidationParams } from "../../../shared/lib/validation/edit_broa_validator";
import { createBroaClient } from "../../broa/client";
import EditBroaForm from "../../broa/components/editBroaForm";
import { useBroasStore } from "../../broa/stores/useBroasStore";
import { logoutClient } from "../../user/client";
import { links } from "../data/links";
import useApi from "../hooks/use_api";
import { useAuthStore } from "../stores/authStore";
import Button from "./Button";
import HeaderUser from "./HeaderUser";
import Loading from "./Loading";
import Modal from "./Modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { replace, pathname } = useRouter();

  const { user, setUser } = useAuthStore();
  const { addBroa, setBroas, broas } = useBroasStore();

  const createBroaMutation = useApi<typeof createBroaClient>();
  const logoutQuery = useApi<typeof logoutClient>();

  useEffect(() => {
    if (!createBroaMutation.data) return;

    addBroa(createBroaMutation.data);
    createBroaMutation.reset();
    setIsOpen(false);
  }, [createBroaMutation.data]);

  const handleOnSubmit = async (
    data: Omit<EditBroaValidationParams, "userId">
  ) => {
    const newBroa = await createBroaMutation.request(
      createBroaClient({ ...data, userId: user!.id })
    );

    if (!newBroa) return;
    addBroa(newBroa);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    const data = await logoutQuery.request(logoutClient());
    if (!data) return;
    setUser(null);
    replace("/");
  };

  return (
    <header className='sticky top-0 z-30  bg-white h-24 w-full px-8'>
      <div className='max-w-[102.4rem] mx-auto flex justify-between items-center w-full h-full'>
        <Link href={links.home} passHref>
          <h1 className='text-5xl font-medium logo-font cursor-pointer'>
            Broas
          </h1>
        </Link>
        {user && (
          <Button
            className='ml-auto mr-8'
            title='criar broa'
            Icon={PlusCircleIcon}
            onClick={() => setIsOpen(true)}
          >
            Criar
          </Button>
        )}
        {!pathname.includes(links.profile) && (
          <HeaderUser
            user={user}
            onLogout={handleLogout}
            isLoading={logoutQuery.loading}
          />
        )}
        <Modal
          title='criar broa'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <EditBroaForm
            onSubmit={handleOnSubmit}
            onCancel={() => setIsOpen(false)}
          />
          <Loading isLoading={createBroaMutation.loading} />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
