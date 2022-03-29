import { useState } from 'react'
import { Link } from 'react-router-dom'

const Registrar = () => {
  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu cuenta y administra tus {""}
            <span className="text-black">pacientes</span>
          </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form>
            <div className="my-5">
              <label htmlFor="" 
              className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input type="text"
              placeholder="E-mail de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <div className="my-5">
              <label htmlFor="" 
              className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <div className="my-5">
              <label htmlFor="" 
              className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <div className="my-5">
              <label htmlFor="" 
              className="uppercase text-gray-600 block text-xl font-bold">
                Repite tu password
              </label>
              <input type="password"
              placeholder="Tu password (otra vez)"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <input type="submit"
            value="Registrarme"
            className="bg-indigo-700 w-full py-3 px-3
            rounded-xl text-white uppercase
            font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
            />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
            className='block text-center my-5 text-gray-500'
            to="/">Ya tienes una cuenta? Inicia sesión</Link >
            <Link 
            className='block text-center my-5 text-gray-500'
            to="/olvide-password">Olvide mi password</Link >
          </nav>
        </div>
    </>
  )
}

export default Registrar