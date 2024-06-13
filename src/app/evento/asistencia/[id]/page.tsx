"use client"
import { useEffect, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumbs from '@/app/ui/breadcrumbs';
// import { useRouter } from 'next/navigation'
import { MIEMBRO } from '@/types/miembro';
import { GET_EVENTO_BY_ID } from '@/query/eventoQuery';
import { GET_MIEMBROS_SIN_FOTO } from '@/query/miembroQuery';
import { CREATE_ASISTENCIA_EVENTO_MIEMBRO, GET_ASISTENCIA_EVENTOS } from '@/query/asistenciaQuery';
import RemoveBtnAsistencia from '@/app/ui/evento/RemoveBtnAsistencia';
import { ASISTENCIA } from '@/types/asistencia';

export default function CreateeAsistencia({ params }) { // Asegúrate de usar 
    const { id } = params;
    const { data: eventoData } = useSuspenseQuery(GET_EVENTO_BY_ID, { variables: { id } });
    const evento = eventoData.eventoById;
    const { data: miembrosData } = useSuspenseQuery(GET_MIEMBROS_SIN_FOTO, { variables: { id } });
    const miembros = miembrosData.findAllMiembros;
    const [isLoading, setIsLoading] = useState(false);

    const [miembro, setMiembro] = useState("");
    // const router = useRouter();
    const { data, refetch } = useSuspenseQuery(GET_ASISTENCIA_EVENTOS, { variables: { eventoId: evento.id } });
    const asistencias = data.asistenciasPorEventoMiembro;
    const [CreateAsistencia] = useMutation(CREATE_ASISTENCIA_EVENTO_MIEMBRO);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!miembro) {
            alert("Por favor, complete todos los campos.");
            return; // Detiene la ejecución de la función si algún campo está vacío
        }
        setIsLoading(true)
        try {
            // console.log(miembro);
            const { data } = await CreateAsistencia({
                variables: { eventoId: evento.id, miembroId: miembro }, onCompleted() {
                    refetch()
                },
            });
        } catch (error) {
            console.error('Error al crear el evento:', error);
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    };
    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de eventos', href: '/evento' },
                    { label: `Asistencia ${evento.nombre}`, href: `/evento/asistencia/${evento.id}` },
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
                                            Fecha del evento
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="datetime-local"
                                                disabled
                                                value={evento.fecha}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        {/* <div className="mb-4.5"> */}
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Lugar
                                        </label>
                                        <div className="relative">
                                            <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                                                {evento.lugar}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Miembro
                                        </label>
                                        <select className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={miembro} onChange={(e) => setMiembro(e.target.value)}>
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
                                            *
                                        </label>
                                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Marcar asistencia'}</button>
                                    </div>
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
                                                    Registro
                                                </th>
                                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {asistencias.map((asistencia: ASISTENCIA) => (
                                                <tr key={asistencia.id}>
                                                    <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                                                        <p className="text-left rounded-full px-4 bg-opacity-10 py-1 text-sm font-medium">
                                                            {asistencia.miembro.ci}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {asistencia.miembro.nombre} {asistencia.miembro.apellido}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <input type="datetime-local" value={asistencia.fecha} className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" readOnly disabled />
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            {/* Asegúrate de pasar los props correctamente */}
                                                            <RemoveBtnAsistencia eventoId={evento.id} id={asistencia.id} refetch={refetch} />
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
