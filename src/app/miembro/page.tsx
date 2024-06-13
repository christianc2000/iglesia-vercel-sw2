"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs from "../ui/breadcrumbs";
import { CreateMiembro } from "../ui/buttons";
import TableMiembro from "../ui/miembro/tableMiembro";


function MiembroPage() {

    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de miembros', href: '/miembro' },
                ]}
            />
            <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* <Buscador onBuscar={handleBuscar} /> */}
                    <CreateMiembro />
                </div>
                <TableMiembro />
            </div>
        </DefaultLayout>
    );
};
export default MiembroPage;

