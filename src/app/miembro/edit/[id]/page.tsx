"use client"
import EditUsuarioMiembro from '@/app/ui/miembro/EditUsuarioMiembro';


export default function UpdateeMiembro({ params }) { // Asegúrate de usar "UpdateEvento" en lugar de "updateEvento"
    const { id } = params;
    return (
        <EditUsuarioMiembro id={id}/>
    );
};

