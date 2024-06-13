"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CreateCargo } from "../ui/buttons";
import Breadcrumbs from "../ui/breadcrumbs";
import TableCargo from "../ui/cargo/tableCargo";


function CargoPage() {

    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de cargos', href: '/cargo' },
                ]}
            />
            <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* <Buscador onBuscar={handleBuscar} /> */}
                    <CreateCargo/>
                </div>
                <TableCargo />
            </div>
        </DefaultLayout>
    );
};
export default CargoPage;

