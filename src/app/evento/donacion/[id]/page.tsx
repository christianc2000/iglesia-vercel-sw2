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

const sumarMontosDonaciones = (donaciones) => {
    let total = 0;
    donaciones.forEach((donacion) => {
        const montoFloat = parseFloat(donacion.monto);
        if (!isNaN(montoFloat)) {
            total += montoFloat;
        }
    });
    return total;
};

export default function CreateeDonacion({ params }) { // Asegúrate de usar 
    const { id } = params;
    const { data: eventoData } = useSuspenseQuery(GET_EVENTO_BY_ID, { variables: { id } });
    const evento = eventoData.eventoById;
    const { data: miembrosData } = useSuspenseQuery(GET_MIEMBROS_SIN_FOTO, { variables: { id } });
    const miembros = miembrosData.findAllMiembros;
    const { data: tipoDonacionData } = useSuspenseQuery(GET_TIPO_DONACIONES, { variables: { id } })
    const tipoDonaciones = tipoDonacionData.findAllTipoDonacions;
    const [isLoading, setIsLoading] = useState(false);

    const [miembro, setMiembro] = useState("");
    const [tipoDonacion, setTipoDonacion] = useState("");
    const [monto, setMonto] = useState("");
    // const router = useRouter();
    const { data, refetch } = useSuspenseQuery(GET_DONACION_EVENTOS, { variables: { eventoId: evento.id } });
    const donaciones = data.donacionesPorEventoMiembro;
    const [CreateDonacion] = useMutation(CREATE_DONACION);
    // Llamamos a la función para obtener la suma de los montos de las donaciones
    const totalMontosDonaciones = sumarMontosDonaciones(donaciones);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!miembro || !tipoDonacion || !monto) {
            alert("Por favor, complete todos los campos.");
            return; // Detiene la ejecución de la función si algún campo está vacío
        }
        setIsLoading(true);
        try {
            const { data } = await CreateDonacion({
                variables: { monto, eventoId: evento.id, miembroId: miembro, tipoDonacionId: tipoDonacion }, onCompleted() {
                    refetch();
                },
            });
        } catch (error) {
            console.error('Error al crear la donación:', error);
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    };
    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de eventos', href: '/evento' },
                    { label: `Donaciones ${evento.nombre}`, href: `/evento/donacion/${evento.id}` },
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
                                    <div className="w-full sm:w-1/2">
                                        {/* <div className="mb-4.5"> */}
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Monto Recaudado
                                        </label>
                                        <div className="relative">
                                            <p className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                                                {totalMontosDonaciones} Bs
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
                                            Tipo de donación
                                        </label>
                                        <select className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={tipoDonacion} onChange={(e) => setTipoDonacion(e.target.value)}>
                                            <option value="" disabled>Selecciona un Tipo de Donación</option>
                                            {tipoDonaciones.map((tp: TIPODONACION) => (
                                                <option key={tp.id} value={tp.id}>
                                                    {tp.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="correo"
                                        >
                                            Monto
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 py-3">
                                                Bs.
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                name="monto"
                                                id="monto"
                                                placeholder="0.00"
                                                value={monto} onChange={(e) => setMonto(e.target.value)}
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
                                                    Tipo de donación
                                                </th>
                                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                                    Monto
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
                                            {donaciones.map((donacion: DONACION) => (
                                                <tr key={donacion.id}>
                                                    <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                                                        <p className="text-left rounded-full px-4 bg-opacity-10 py-1 text-sm font-medium">
                                                            {donacion.miembro.ci}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {donacion.miembro.nombre} {donacion.miembro.apellido}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {donacion.tipoDonacion.nombre}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                                            {donacion.monto}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <input type="datetime-local" value={donacion.fecha} className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" readOnly disabled />
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            <RemoveBtnDonacion id={donacion.id} refetch={refetch} />
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
