"use client"
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { useRouter } from 'next/navigation'
import { CREATE_EVENTO } from '@/query/eventoQuery';

export default function CreateeEvento() { // Asegúrate de usar 
    const [isLoading, setIsLoading] = useState(false);

    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [lugar, setLugar] = useState("");
    const router = useRouter();

    const [CreateEvento] = useMutation(CREATE_EVENTO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !fecha || !lugar) {
            alert("Por favor, complete todos los campos.");
            return; // Detiene la ejecución de la función si algún campo está vacío
        }
        setIsLoading(true)
        try {
            const { data } = await CreateEvento({
                variables: { nombre, fecha, lugar }
            });
            console.log('Evento create:', data.createEvento);
            router.push('/evento');
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
                    { label: 'Crear evento', href: '/evento/create' },
                ]}
            />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nombre
                                    </label>
                                    <input type="text" placeholder="Nombre" className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Fecha
                                    </label>
                                    <input type="datetime-local" placeholder="Fecha" className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Lugar
                                    </label>
                                    <input type="text" placeholder="Lugar" className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" value={lugar} onChange={(e) => setLugar(e.target.value)} />
                                </div>
                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Crear Evento'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
