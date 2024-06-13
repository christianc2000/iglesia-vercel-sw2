"use client"

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { useSuspenseQuery } from '@apollo/client';
import { GET_EVENTO_BY_ID } from '@/query/eventoQuery';

export default function ShowEvento({ params }) {
  const { id } = params;
  const { data } = useSuspenseQuery(GET_EVENTO_BY_ID, {
    variables: { id }, // Pasa el ID como variable
  });

  const evento = data.eventoById;
  // console.log(evento);
  return (
    <DefaultLayout>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lista de eventos', href: '/evento' },
          { label: 'Mostrar evento', href: '/evento/show' },
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
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">{evento.nombre}</p>
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Fecha
                </label>
                <input type="datetime-local" value={evento.fecha} className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" readOnly />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Lugar
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">{evento.lugar}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

