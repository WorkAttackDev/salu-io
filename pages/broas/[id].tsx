import { Broa } from ".prisma/client";
import { TrashIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import {
  deleteBroaClient,
  getBroaByIdClient,
  updateBroaClient,
} from "../../features/client/broa/client";
import EditBroaForm from "../../features/client/broa/components/editBroaForm";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import useApi from "../../features/client/core/hooks/use_api";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { EditBroaValidationParams } from "../../features/shared/lib/validation/edit_broa_validator";

const BroaPage: NextPage = () => {
  const [broa, setBroa] = useState<Broa | null>(null);
  const { query, replace } = useRouter();

  const user = useAuthStore((state) => state.user);

  const updateBroaMutation = useApi<typeof updateBroaClient>();
  const deleteBroaMutation = useApi<typeof deleteBroaClient>();
  const getBroaByIdMutation = useApi<typeof getBroaByIdClient>();

  useEffect(() => {
    const id = query.id as string | undefined;
    if (!id) return;

    (async () => {
      const data = await getBroaByIdMutation.request(getBroaByIdClient(id));
      if (!data) return;
      setBroa(data);
    })();
  }, [query]);

  const handleSubmit = async (data: EditBroaValidationParams) => {
    if (!broa) return;

    const editedBroa = await updateBroaMutation.request(
      updateBroaClient(broa.id, data)
    );
    if (!editedBroa) return;
    replace("/");
  };

  const handleDelete = async () => {
    if (!broa) return;

    const res = await deleteBroaMutation.request(
      deleteBroaClient(broa.id, user!.id)
    );

    if (!res) return;

    replace("/");
  };

  return (
    <MainLayout>
      {broa && (
        <>
          <header className='flex justify-end mx-auto mb-8 max-w-3xl'>
            <button
              title='apagar broa'
              className='group relative z-10 rounded-full w-16 h-16 duration-200 bg-red-500 text-white text-xl leading-none hover:bg-red-700'
              onClick={handleDelete}
            >
              <TrashIcon className='w-8 h-8 m-auto duration-200 group-hover:animate-bounce' />
            </button>
          </header>
          <EditBroaForm
            broa={broa}
            className='mx-auto bg-white shadow-xl rounded-2xl p-8 max-w-3xl'
            onSubmit={(data) => handleSubmit({ ...data, userId: user!.id })}
          />
        </>
      )}
      <Loading
        isLoading={
          getBroaByIdMutation.loading ||
          updateBroaMutation.loading ||
          deleteBroaMutation.loading
        }
      />
    </MainLayout>
  );
};

export default React.memo(BroaPage);
