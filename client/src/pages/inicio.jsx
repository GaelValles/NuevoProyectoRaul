import React, { useEffect, useState } from 'react';
import Sidepage from "../components/sidebar";
import { getAllPermisos } from '../api/auth.permiso';
import { getAllCamiones } from '../api/auth.camion';
import { useAuth } from '../context/auth.context';

function InicioPage() {
    const { user } = useAuth();
    const [permisos, setPermisos] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPermisos = async () => {
            try {
                const response = await getAllPermisos();
                setPermisos(response.data);
            } catch (error) {
                console.error('Error al obtener los permisos:', error);
            }
        };

        const fetchCamiones = async () => {
            try {
                const response = await getAllCamiones();
                setCamiones(response.data);
            } catch (error) {
                console.error('Error al obtener los camiones:', error);
            }
        };

        fetchPermisos();
        fetchCamiones();
        setLoading(false);
    }, []);

    const today = new Date();

    const categorizeItems = (items, dateField) => {
        const categorized = {
            oneWeek: [],
            oneMonth: [],
            moreThanMonth: [],
            expired: []
        };

        items.forEach(item => {
            const finalDate = new Date(item[dateField]);
            const daysDiff = (finalDate - today) / (1000 * 3600 * 24);

            if (finalDate < today) {
                categorized.expired.push(item);
            } else if (daysDiff <= 7) {
                categorized.oneWeek.push(item);
            } else if (daysDiff <= 30) {
                categorized.oneMonth.push(item);
            } else {
                categorized.moreThanMonth.push(item);
            }
        });

        return categorized;
    };

    const categorizeCamiones = (camiones) => {
        const categorized = {
            oneWeek: [],
            oneMonth: [],
            moreThanMonth: [],
            expired: []
        };

        camiones.forEach(camion => {
            const lastMaintenanceDate = new Date(camion.mantenimiento);
            const creationDate = new Date(camion.fechaCreacion);
            const daysSinceLastMaintenance = (today - lastMaintenanceDate) / (1000 * 3600 * 24);
            const daysSinceCreation = (today - creationDate) / (1000 * 3600 * 24);

            const isPreventiveMaintenanceDue = daysSinceLastMaintenance >= 90 && daysSinceLastMaintenance < 365;
            const isAnnualMaintenanceDue = daysSinceCreation >= 365;

            if (isPreventiveMaintenanceDue || isAnnualMaintenanceDue) {
                const nextMaintenanceDate = isAnnualMaintenanceDue ? new Date(creationDate.setFullYear(creationDate.getFullYear() + 1)) : new Date(lastMaintenanceDate.setDate(lastMaintenanceDate.getDate() + 90));
                const daysDiff = (nextMaintenanceDate - today) / (1000 * 3600 * 24);

                if (daysDiff < 0) {
                    categorized.expired.push({ ...camion, type: isAnnualMaintenanceDue ? 'Anual' : 'Preventivo' });
                } else if (daysDiff <= 30) {
                    categorized.oneMonth.push({ ...camion, type: isAnnualMaintenanceDue ? 'Anual' : 'Preventivo' });
                }
            }
        });

        return categorized;
    };

    const permisosCategorized = categorizeItems(permisos, 'fechaFinal');
    const camionesCategorized = categorizeCamiones(camiones);

    return (
        <div className="flex">
            <Sidepage />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen ml-[300px]">
                <h2 className="text-2xl font-semibold mb-4 text-right">Bienvenido, {user.nombreCompleto}!</h2>
                {loading ? (
                        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
                            <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
                        </div>
                ) : (
                    <div>
                        {/* Permisos */}
                        <h1 className="text-3xl font-bold mb-6 text-center">Permisos</h1>  
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Permisos Próximos a Vencer</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">1 Semana</h3>
                                    {permisosCategorized.oneWeek.length > 0 ? permisosCategorized.oneWeek.map(permiso => (
                                        <div key={permiso._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                            <h3 className="text-xl font-bold">{permiso.titulo}</h3>
                                            <p className="text-gray-600">{permiso.descripcion}</p>
                                            <p className="text-gray-600">Fecha Final: {new Date(permiso.fechaFinal).toLocaleDateString()}</p>
                                        </div>
                                    )) : (
                                        <p>No hay permisos próximos a vencer en 1 semana.</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">1 Mes</h3>
                                    {permisosCategorized.oneMonth.length > 0 ? permisosCategorized.oneMonth.map(permiso => (
                                        <div key={permiso._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                            <h3 className="text-xl font-bold">{permiso.titulo}</h3>
                                            <p className="text-gray-600">{permiso.descripcion}</p>
                                            <p className="text-gray-600">Fecha Final: {new Date(permiso.fechaFinal).toLocaleDateString()}</p>
                                        </div>
                                    )) : (
                                        <p>No hay permisos próximos a vencer en 1 mes.</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Más de 1 Mes</h3>
                                    {permisosCategorized.moreThanMonth.length > 0 ? permisosCategorized.moreThanMonth.map(permiso => (
                                        <div key={permiso._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                            <h3 className="text-xl font-bold">{permiso.titulo}</h3>
                                            <p className="text-gray-600">{permiso.descripcion}</p>
                                            <p className="text-gray-600">Fecha Final: {new Date(permiso.fechaFinal).toLocaleDateString()}</p>
                                        </div>
                                    )) : (
                                        <p>No hay permisos próximos a vencer en más de 1 mes.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Permisos Vencidos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {permisosCategorized.expired.length > 0 ? permisosCategorized.expired.map(permiso => (
                                    <div key={permiso._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                        <h3 className="text-xl font-bold">{permiso.titulo}</h3>
                                        <p className="text-gray-600">{permiso.descripcion}</p>
                                        <p className="text-gray-600">Fecha Final: {new Date(permiso.fechaFinal).toLocaleDateString()}</p>
                                    </div>
                                )) : (
                                    <p>No hay permisos vencidos.</p>
                                )}
                            </div>
                        </div>
                        {/* Camiones */}
                        <div className="mt-8">
                            <h1 className="text-3xl font-bold mb-6 text-center">Camiones</h1> 
                            <h2 className="text-2xl font-semibold mb-4">Camiones Próximos a Mantenimiento</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Este mes</h3>
                                    {camionesCategorized.oneMonth.length > 0 ? camionesCategorized.oneMonth.map(camion => (
                                        <div key={camion._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                            <h3 className="text-xl font-bold">{camion.marca} {camion.modelo}</h3>
                                            <p className="text-gray-600">Tipo de Mantenimiento: {camion.type}</p>
                                        </div>
                                    )) : (
                                        <p>No hay camiones próximos a mantenimiento en 1 mes.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Camiones con Mantenimiento Vencido</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {camionesCategorized.expired.length > 0 ? camionesCategorized.expired.map(camion => (
                                    <div key={camion._id} className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mb-4">
                                        <h3 className="text-xl font-bold">{camion.marca} {camion.modelo}</h3>
                                        <p className="text-gray-600">Tipo de Mantenimiento: {camion.type}</p>
                                    </div>
                                )) : (
                                    <p>No hay camiones con mantenimiento vencido.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InicioPage;

