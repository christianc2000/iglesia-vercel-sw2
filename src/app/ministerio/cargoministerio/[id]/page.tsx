"use client"
import { useState } from 'react';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumbs from '@/app/ui/breadcrumbs';
// import { useRouter } from 'next/navigation'
import { MIEMBRO } from '@/types/miembro';
import { GET_EVENTO_BY_ID } from '@/query/eventoQuery';
import { GET_MIEMBROS_SIN_FOTO } from '@/query/miembroQuery';
import { GET_TIPO_DONACIONES } from '@/query/tipodonacionQuery';
import { TIPODONACION } from '@/types/tipodonacion';
import { CREATE_DONACION, GET_DONACION_EVENTOS } from '@/query/donacionQuery';
import { DONACION } from '@/types/donacion';
import RemoveBtnDonacion from '@/app/ui/evento/RemoveBtnDonacion';
import { GET_MINISTERIO_BY_ID } from '@/query/ministerioQuery';
import { GET_CARGOS } from '@/query/cargoQuery';
import { CREATE_MIEMBRO_MINISTERIO, GET_MIEMBRO_MINISTERIO_CARGOS } from '@/query/miembroministerioQuery';
import { CARGO } from '@/types/cargo';
import { MIEMBROMINISTERIO } from '@/types/miembroministerio';
import FinalizarBtnMiembroMinisterio from '@/app/ui/ministerio/FinalizarBtnMiembroMinisterio';
import RemoveBtnMiembroMinisterio from '@/app/ui/ministerio/RemoveBtnMiembroMinisterio';


export default function CreateeMiembroMinisterio({ params }) { // Asegúrate de usar 
    const { id } = params;
    const { data: ministerioData } = useSuspenseQuery(GET_MINISTERIO_BY_ID, { variables: { id } });
    const ministerio = ministerioData.ministerioById;
    const { data: miembrosData } = useSuspenseQuery(GET_MIEMBROS_SIN_FOTO, { variables: { id } });
    const miembros = miembrosData.findAllMiembros;
    const { data: cargoData } = useSuspenseQuery(GET_CARGOS, { variables: { id } })
    const cargos = cargoData.findAllCargos;
    const [isLoading, setIsLoading] = useState(false);

    const [miembro, setMiembro] = useState("");
    const [cargo, setCargo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    // const router = useRouter();
    const { data, refetch } = useSuspenseQuery(GET_MIEMBRO_MINISTERIO_CARGOS, { variables: { ministerioId: ministerio.id } });
    const miembroMinisterios = data.miembroMinisteriosPorMinisterioCargo;
    const [CreateMiembroMinisterio] = useMutation(CREATE_MIEMBRO_MINISTERIO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!miembro || !cargo || !fechaInicio) {
            alert("Por favor, complete todos los campos.");
            return; // Detiene la ejecución de la función si algún campo está vacío
        }
        setIsLoading(true);
        try {
            const { data } = await CreateMiembroMinisterio({
                variables: { fechaInicio, ministerioId: ministerio.id, miembroId: miembro, cargoId: cargo }, onCompleted() {
                    refetch();
                },
            });
        } catch (error) {
            console.error('Error al crear la miembro ministerio:', error);
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    };
    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de ministerios', href: '/ministerio' },
                    { label: `${ministerio.nombre}`, href: `/evento/ministerio/${ministerio.id}` },
                ]}
            />

            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="p-6.5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Miembro
                                        </label>
                                        <select className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" value={miembro} onChange={(e) => setMiembro(e.target.value)}>
                                            <option value="" disabled>Selecciona un miembro</option>
                                            {miembros.map((m: MIEMBRO) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.nombre} {m.apellido}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Cargo
                                        </label>
                                        <select className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                            <option value="" disabled>Selecciona un Cargo</option>
                                            {cargos.map((c: CARGO) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="correo"
                                        >
                                            Fecha Inicio
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="datetime-local"
                                                name="fechaInicio"
                                                id="fechaInicio"
                                                value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5.5">
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Agregar donación'}</button>
                                </div>
                            </form>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                                    CI
                                                </th>
                                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                                    Miembro
                                                </th>
                                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                                    Cargo
                                                </th>
                                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                                    Fecha Inicio
                                                </th>
                                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                                    Fecha Fin
                                                </th>
                                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {miembroMinisterios.map((mm: MIEMBROMINISTERIO) => (
                                                <tr key={mm.id}>
                                                    <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                                                        <p className="text-left rounded-full px-4 bg-opacity-10 py-1 text-sm font-medium">
                                                            {mm.miembro.ci}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {mm.miembro.nombre} {mm.miembro.apellido}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {mm.cargo.nombre}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <input type="datetime-local" value={mm.fechaInicio} className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" readOnly disabled />
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        {mm.fechaFin != "" ? (
                                                            <input
                                                                type="datetime-local"
                                                                value={mm.fechaFin}
                                                                className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
                                                                readOnly
                                                                disabled
                                                            />
                                                        ) : (
                                                            <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">Vigente</p>
                                                        )}
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            {mm.fechaFin == "" ? (
                                                                <>
                                                                    <FinalizarBtnMiembroMinisterio id={mm.id} refetch={refetch} />
                                                                    <RemoveBtnMiembroMinisterio id={mm.id} refetch={refetch} />
                                                                </>
                                                            ) : (
                                                                <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">Sin Acciones</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
