import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBroasByUserIdClient } from "../../features/client/broa/client";
import ListBroas from "../../features/client/broa/components/ListBroas";
import { useBroasStore } from "../../features/client/broa/stores/useBroasStore";
import Button from "../../features/client/core/components/Button";
import MainLayout from "../../features/client/core/components/MainLayout";
import Modal from "../../features/client/core/components/Modal";
import { links } from "../../features/client/core/data/links";
import useApi from "../../features/client/core/hooks/use_api";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientValidationError } from "../../features/client/core/utils/client_errors";
import {
  editUserClient,
  logoutClient,
} from "../../features/client/user/client";
import EditUserForm from "../../features/client/user/components/EditUserForm";
import { BroaSortBy } from "../../features/shared/broas.types";
import {
  editUserValidate,
  EditUserValidationParams,
} from "../../features/shared/lib/validation/edit_user_validator";
import { MyUser } from "../../features/shared/models/my_user";

const Avatar = ({ user }: { user: MyUser | null }) => {
  return (
    <div className='relative flex justify-center items-center overflow-hidden z-10 rounded-full w-32 h-32 bg-brand-gray-1 text-white text-2xl leading-none border-2 border-brand-gray-1 mb-2'>
      {user?.picture ? (
        <Image
          width={192}
          height={192}
          layout='intrinsic'
          objectFit='cover'
          alt='user image'
          src={user.picture}
        />
      ) : (
        user?.userName.substring(0, 3) || "broa"
      )}
    </div>
  );
};

const ProfilePage: NextPage = ({}) => {
  const { user, setUser } = useAuthStore();
  const { broas, broasPagination, broaFilter, setFilters } = useBroasStore();

  const { replace } = useRouter();

  const { setErrors, setIsOpen } = useErrorStore();

  const [showModal, setShowModal] = useState(false);

  const { loading, request } = useApi<typeof getBroasByUserIdClient>();

  const logoutQuery = useApi<typeof logoutClient>();

  const editUserMutation = useApi<typeof editUserClient>();

  useEffect(() => {
    if (!user) return;
    setFilters({ sortBy: "recent" });

    request(
      getBroasByUserIdClient(user.id, {
        page: 0,
        sortBy: "recent",
      })
    );
  }, [user]);

  useEffect(() => {
    if (!logoutQuery.error && !editUserMutation.error) return;
    setErrors(logoutQuery.error || editUserMutation.error || []);
    setIsOpen(true);
  }, [logoutQuery.error, editUserMutation.error]);

  const handleLogout = async () => {
    const res = await logoutQuery.request(logoutClient());

    if (!res) return;
    replace(links.login);
  };

  const handleSubmit = async (
    formValues: Omit<EditUserValidationParams, "id">
  ) => {
    try {
      const validatedData = editUserValidate({ ...formValues, id: user?.id });
      const res = await editUserMutation.request(editUserClient(validatedData));

      if (!res) return;

      setUser(res);
      setShowModal(false);
    } catch (error) {
      handleClientValidationError(error);
    }
  };

  const handleSearch = async (search: string) => {
    if (!user) return;

    if (!search) {
      if (!broaFilter.wrongVersion) return;

      setFilters({ wrongVersion: undefined });
      await request(getBroasByUserIdClient(user.id));
      return;
    }

    setFilters({ wrongVersion: search });
    await request(getBroasByUserIdClient(user.id, { wrongVersion: search }));
  };

  const handleSortBy = async (sortBy: BroaSortBy) => {
    if (!user) return;
    setFilters({ sortBy });

    await request(getBroasByUserIdClient(user.id, { sortBy }));
  };

  const handleGetNextBoas = async () => {
    if (!user) return;

    const bp = broasPagination;
    const bfb = broaFilter;

    if (bp.page + 1 >= Math.ceil(bp.total / bp.limit)) return;
    await request(
      getBroasByUserIdClient(user.id, {
        page: bp.page + 1,
        wrongVersion: bfb.wrongVersion,
        sortBy: bfb.sortBy,
      })
    );
  };

  const handleGetPreviousBoas = async () => {
    if (!user) return;

    const bp = broasPagination;
    const bfb = broaFilter;

    if (bp.page < 0) return;
    await request(
      getBroasByUserIdClient(user.id, {
        page: bp.page - 1,
        wrongVersion: bfb.wrongVersion,
        sortBy: bfb.sortBy,
      })
    );
  };

  return (
    <MainLayout className='grid gap-12'>
      <section className='mx-auto grid gap-2 justify-items-center justify-center bg-white rounded-base shadow-sm px-4 py-8 md:px-8'>
        <Avatar user={user}></Avatar>
        <p className='text-2xl'>{user?.name}</p>
        <p className='text-lg'>@{user?.userName}</p>
        <p className='text-xl'>{user?.email}</p>
        <div className='flex flex-wrap justify-center mt-4'>
          <Button
            theme='secondary'
            className='m-2'
            onClick={() => setShowModal(true)}
          >
            editar perfil
          </Button>
          <Button
            theme='secondary'
            className='m-2'
            onClick={handleLogout}
            isLoading={logoutQuery.loading}
          >
            terminar sessão
          </Button>
          <Button theme='secondary' className='m-2 hover:bg-red-500'>
            apagar perfil
          </Button>
        </div>
      </section>

      <ListBroas
        user={user}
        broas={broas}
        onNextPage={handleGetNextBoas}
        onPrevPage={handleGetPreviousBoas}
        pagination={broasPagination}
        onSearch={handleSearch}
        onSortBy={handleSortBy}
        isLoading={loading}
      />

      <Modal
        isOpen={showModal}
        title='editar usuário'
        onClose={() => setShowModal(false)}
      >
        <EditUserForm
          user={user}
          onSubmit={handleSubmit}
          isLoading={editUserMutation.loading}
        />
      </Modal>
    </MainLayout>
  );
};

export default ProfilePage;
