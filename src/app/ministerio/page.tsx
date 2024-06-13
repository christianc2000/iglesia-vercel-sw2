"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs from "../ui/breadcrumbs";
import { CreateMinisterio } from "../ui/buttons";
import TableMinisterio from "../ui/ministerio/tableMinisterio";


function MinisterioPage() {

    return (
        <DefaultLayout>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Lista de ministerios', href: '/ministerio' },
                ]}
            />
            <div className="flex flex-col gap-4">
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* <Buscador onBuscar={handleBuscar} /> */}
                    <CreateMinisterio />
                </div>
                <TableMinisterio />
            </div>
        </DefaultLayout>
    );
};
export default MinisterioPage;

