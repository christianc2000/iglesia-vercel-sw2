import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs from "../breadcrumbs";
import { useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { useRouter } from 'next/navigation'
import { GET_MIEMBRO_BY_ID } from "@/query/miembroQuery";
import { GET_USUARIO_BY_ID } from "@/query/usuarioQuery";

export default function ShowUsuarioMiembro({ id }) { // Asegúrate de usar "UpdateEvento" en lugar de "updateEvento"
  const { data: miembroData } = useSuspenseQuery(GET_MIEMBRO_BY_ID, { variables: { id } });
  const miembro = miembroData.miembroById;
  const { data: usuarioData } = useSuspenseQuery(GET_USUARIO_BY_ID, { variables: { miembroId: id } });
  const usuario = usuarioData.usuarioByMiembroId;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Lista de miembros', href: '/miembro' },
            { label: 'Mostrar miembro', href: '/miembro/show' },

          ]}
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Información Personal
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="ci"
                  >
                    CI
                  </label>
                  <div className="relative">
                    <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      {miembro.ci}
                    </p>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Nombre"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {miembro.nombre}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {miembro.apellido}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="celular"
                    >
                      Celular
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {miembro.celular}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Nombre"
                    >
                      Género
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {miembro.genero=="M"?"Masculino":"Femenino"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fechaNacimiento"
                  >
                    Fecha de nacimiento
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      value={miembro.fechaNacimiento} readOnly
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fechaNacimiento"
                    >
                      Rol
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {usuario.rol=="A"?"Administrador":"General"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fechaNacimiento"
                    >
                      Estado
                    </label>
                    <div className="relative">
                      <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        {usuario.estado=="A"?"Activo":"Inactivo"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="correo"
                  >
                    Correo
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <p className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      {usuario.correo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Tu foto
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="h-50 w-50 bg-black rounded-full overflow-hidden flex items-center justify-center">
                    {miembro.foto && (
                      <img
                        className="w-full h-full object-contain"
                        src={miembro.foto}
                        alt="Foto de perfil"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};