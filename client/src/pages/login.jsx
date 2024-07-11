import React from 'react';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import fondoImg from '../assets/images/camionLogin.jpg';
import Swal from 'sweetalert2';


function LoginPage() {
    const { login, errors: loginErrors } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((user) => {
        login(user);
        if (login(user)) {
            navigate("/Inicio");
            Swal.fire({
              icon: 'success',
              title: '¡Inicio de sesión exitoso!',
              text: 'Bienvenido de vuelta',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Acceso denegado',
              text: 'No tienes permiso para acceder.',
            });
          }
    });



    return (
        <div className="flex h-screen">
            <div className="w-2/5 h-full">
                <img src={fondoImg} className="object-cover h-full w-full" alt="Fondo" />
            </div>
            <div className="w-3/5 flex justify-center items-center">
                <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-lg hover:shadow-2xl hover:shadow-gray-700 transition duration-200 ease-in-out max-w-md h-80 w-96">
                    <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Iniciar sesión</h1>

                    <form onSubmit={onSubmit} className="mt-4">
                    {loginErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white text-center m-2 rounded-md" key={i}>
                {error}
              </div>
            ))}
                        <div className="mb-4">
                            <input
                                className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email"
                                type="email"
                                placeholder="Correo electrónico"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <p className='text-red-600'>El email es requerido</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <p className='text-red-600'>La contraseña es requerida</p>}
                        </div>
                        <button
                            type="submit"
                            id="botonIngresar"
                            className="rounded-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-4 w-full mt-4 transition duration-300 ease-in-out"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
