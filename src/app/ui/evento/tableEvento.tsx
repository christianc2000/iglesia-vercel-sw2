import { gql, useSuspenseQuery } from '@apollo/client';
import { EVENTO } from "@/types/evento";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { useEffect } from "react";
import { GET_EVENTOS } from '@/query/eventoQuery';


const TableEvento = () => {
    const { data, refetch } = useSuspenseQuery(GET_EVENTOS);
    const eventos = data.findAllEventos;

    // console.log(eventos);
    // console.log("Desde el index eventos");
    useEffect(() => {
        // Refrescar los datos de la lista después de la creación del evento
        refetch();
    }, []);
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                ID
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Nombre
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Fecha
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Lugar
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map((evento: EVENTO) => (
                            <tr key={evento.id}>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark xl:pl-11">
                                    <p
                                        className={`text-left rounded-full px-4 bg-opacity-10 py-1 text-sm font-medium`}>
                                        {evento.id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                                        {evento.nombre}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <input type="datetime-local" value={evento.fecha} className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" disabled readOnly />
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                                        {evento.lugar}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link
                                            href={`/evento/edit/${evento.id}`}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 512 512"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M320 112L368 64 448 144 400 192 320 112ZM128 304L288 144 368 224 208 384 128 304ZM96 336L176 416 64 448 96 336Z" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/evento/show/${evento.id}`}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/evento/asistencia/${evento.id}`}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 36 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path className="clr-i-solid clr-i-solid-path-1" d="M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z"></path><path className="clr-i-solid clr-i-solid-path-2" d="M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z"></path><path className="clr-i-solid clr-i-solid-path-3" d="M32.25,6h-4V9a2.2,2.2,0,0,1-4.4,0V6H12.2V9A2.2,2.2,0,0,1,7.8,9V6h-4A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6ZM25.94,16.58l-9.67,9.67L11,20.94A1.36,1.36,0,0,1,12.9,19l3.38,3.38L24,14.66a1.36,1.36,0,1,1,1.93,1.93Z"></path>
                                              <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/evento/donacion/${evento.id}`}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                               <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                            </svg>
                                        </Link>
                                        <RemoveBtn id={evento.id} refetch={refetch} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableEvento;