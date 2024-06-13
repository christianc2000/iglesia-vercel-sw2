"use client";

import {FINALIZAR_MIEMBRO_MINISTERIO } from "@/query/miembroministerioQuery";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function FinalizarBtnMiembroMinisterio({ id, refetch }) {
    const [FinalizarMiembroMinisterio] = useMutation(FINALIZAR_MIEMBRO_MINISTERIO,{
        onCompleted() {
            // Redirige después de eliminar el evento
            refetch()
        },
    });
    
    const finalizarMiembroMinisterio = async () => {
        const confirmed = confirm("¿Estás seguro de finalizar el cargo del miembro en el ministerio?");

        if (confirmed) {
            try {
                await FinalizarMiembroMinisterio({
                    variables: { id }
                });
                // Llama a la función de refetching para actualizar la lista de eventos
                refetch();
            } catch (error) {
                console.error('Error al eliminar el cargo del miembro en el ministerio:', error);
            }
        }
    };

    return (
        <button onClick={finalizarMiembroMinisterio} className="hover:text-primary">
            <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 1920 1920"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M797.32 985.882 344.772 1438.43l188.561 188.562 452.549-452.549 452.548 452.549 188.562-188.562-452.549-452.548 452.549-452.549-188.562-188.561L985.882 797.32 533.333 344.772 344.772 533.333z"/>
            </svg>
        </button>
    );
}