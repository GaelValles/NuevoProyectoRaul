import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import SidePage from "../components/sidebar";
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import doc from '../assets/images/doc.png';

Modal.setAppElement('#root');

function PerfilProfesorPage() {
    const { id } = useParams();
    const { getCamionById } = useAuth();
    const [camion, setCamion] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCamion = async () => {
            const camionData = await getCamionById(id);
            setCamion(camionData);
            console.log("El camion es", camionData);
        };
        fetchCamion();
    }, [id, getCamionById]);

    if (!camion) {
        return         <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
        <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>;
    }

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent(null);
    };

    const renderDocument = (url) => {
        return (
            <div className="pdf-container mt-2 cursor-pointer" onClick={() => openModal(<Document file={url} onLoadError={handleLoadError}><Page pageNumber={1} /></Document>)}>
                <Document file={url} onLoadError={handleLoadError}>
                    <Page pageNumber={1} />
                </Document>
            </div>
        );
    };

    const handleLoadError = (error) => {
        console.error('Error al cargar el documento PDF:', error);
    };

    const handleUpdate = () => {
        navigate(`/editarCamion/${id}`);
    };

    const renderDocumentOrPlaceholder = (url) => {
        if (url.endsWith('.pdf')) {
            return renderDocument(url);
        } else {
            return (
                <img 
                    src={url} 
                    alt="Documento" 
                    className="mt-2 w-24 h-24 rounded-lg shadow-md cursor-pointer" 
                    onClick={() => openModal(<img src={url} alt="Documento" className="w-full h-auto rounded-lg" />)} 
                />
            );
        }
    };

    const renderFile = (url) => {
        if (!url) {
            return <img src={doc} alt="Documento" className="mt-2 w-24 h-24 rounded-lg shadow-md" />;
        }
        return (
            <div className="mt-2 cursor-pointer">
                {renderDocumentOrPlaceholder(url)}
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidePage />
            <div className="flex-1 p-6 lg:ml-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl text-black">Datos del camion</h1>
                    <button 
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Actualizar
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-6">
                        <h2 className="text-2xl font-semibold">{camion.marca} {camion.modelo}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <strong>Color:</strong>
                            <p>{camion.color}</p>
                        </div>
                        <div>
                            <strong>Placas México:</strong>
                            <p>{camion.placasMx}</p>
                        </div>
                        <div>
                            <strong>Placas USA:</strong>
                            <p>{camion.placasUsa}</p>
                        </div>
                        <div>
                            <strong>Numero de ECO:</strong>
                            <p>{camion.numEco}</p>
                        </div>
                        <div>
                            <strong>Numero de serie:</strong>
                            <p>{camion.numSerie}</p>
                        </div>
                        <div>
                            <strong>Utimo mantenimiento:</strong>
                            <p>{camion.mantenimiento}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Documento"
                className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg p-4">
                    <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 mb-4">Cerrar</button>
                    {modalContent}
                </div>
            </Modal>
        </div>
    );
}

export default PerfilProfesorPage;
