"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs from "../ui/breadcrumbs";
import { CreateTipoDonacion } from "../ui/buttons";
import TableTipoDonacion from "../ui/tipodonacion/tableTipoDonacion";


function TipoDonacionPage() {

    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de tipos de donaciones', href: '/tipodonacion' },
                ]}
            />
            <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* <Buscador onBuscar={handleBuscar} /> */}
                    <CreateTipoDonacion />
                </div>
                <TableTipoDonacion />
            </div>
        </DefaultLayout>
    );
};
export default TipoDonacionPage;

