import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getProfesorRequest, updateProfesorRequest } from "../api/auth.profesor";
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

Modal.setAppElement('#root');

function PerfilProfesorPage() {
    const { id } = useParams();
    const [profesor, setProfesor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfesor = async () => {
            try {
                const response = await getProfesorRequest(id);
                setProfesor(response.data);
            } catch (error) {
                console.error("Error fetching profesor:", error);
                navigate('/inicioProfesor');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProfesor();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
                <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
            </div>
        );
    }

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const openEditModal = () => {
        // Pre-populate form with current values
        setValue('nombre_completo', profesor.nombre_completo);
        setValue('correo', profesor.correo);
        setValue('telefono', profesor.telefono);
        setModalContent(
            <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Actualizar Datos</h2>
                <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            {...register('nombre_completo', { required: true })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo
                        </label>
                        <input
                            type="email"
                            {...register('correo', { 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                            })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            {...register('telefono', { required: true })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setModalIsOpen(false)}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        );
        setModalIsOpen(true);
    };

    const onSubmitUpdate = async (data) => {
        try {
            const response = await updateProfesorRequest(id, data);
            setProfesor(response.data);
            setModalIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Los datos han sido actualizados correctamente'
            });
        } catch (error) {
            console.error("Error updating profesor:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron actualizar los datos'
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6 lg:ml-64">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Perfil del Profesor</h1>
                    <button
                        onClick={openEditModal}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <i className="bi bi-pencil-square mr-2"></i>
                        Editar Datos
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                                {profesor?.foto_perfil?.secure_url ? (
                                    <img
                                        src={profesor.foto_perfil.secure_url}
                                        alt="Foto de perfil"
                                        className="w-full h-full object-cover"
                                        onClick={() => openModal(
                                            <img 
                                                src={profesor.foto_perfil.secure_url} 
                                                alt="Foto de perfil" 
                                                className="max-w-full h-auto"
                                            />
                                        )}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-4xl text-blue-600">
                                            {profesor?.nombre_completo?.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profesor?.nombre_completo}</h2>
                                <p className="text-gray-600">{profesor?.correo}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Información de Contacto</h3>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Teléfono:</span> {profesor?.telefono}</p>
                                    <p><span className="font-medium">Correo:</span> {profesor?.correo}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Documentos</h3>
                                <div>
                                    {profesor?.cv?.secure_url && (
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">CV:</span>
                                            <button
                                                onClick={() => window.open(profesor.cv.secure_url, '_blank')}
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Ver CV
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg p-4 max-w-2xl max-h-[90vh] overflow-auto">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {modalContent}
                </div>
            </Modal>
        </div>
    );
}

export default PerfilProfesorPage;
 