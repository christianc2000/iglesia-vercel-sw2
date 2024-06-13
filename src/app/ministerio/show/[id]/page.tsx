"use client"

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { gql, useSuspenseQuery } from '@apollo/client';


const GET_MINISTERIO_BY_ID = gql`
  query GetMinisterioById($id: ID!) {
    ministerioById(id: $id) {
      id
      nombre
      descripcion
    }
  }
`;
export default function ShowMinisterio({ params }) {
  const { id } = params;
  const { data } = useSuspenseQuery(GET_MINISTERIO_BY_ID, {
    variables: { id }, // Pasa el ID como variable
  });

  const ministerio = data.ministerioById;
  console.log(ministerio);
  return (
    <DefaultLayout>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lista de Ministerios', href: '/ministerio' },
          { label: 'Mostrar Ministerio', href: '/ministerio/show' },
        ]}
      />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">{ministerio.nombre}</p>
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Descripción
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">{ministerio.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

