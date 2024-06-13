"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableEvento from "@/app/ui/evento/tableEvento";
import { CreateEvento } from "../ui/buttons";
import Breadcrumbs from "../ui/breadcrumbs";


function EventoPage() {

    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de eventos', href: '/evento' },
                ]}
            />
            <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* <Buscador onBuscar={handleBuscar} /> */}
                    <CreateEvento />
                </div>
                <TableEvento />
            </div>
        </DefaultLayout>
    );
};
export default EventoPage;

