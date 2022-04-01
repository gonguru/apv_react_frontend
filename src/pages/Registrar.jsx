import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')

  const [ alerta, mostrarAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')) {
      mostrarAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }
    
    if(password !== repetirPassword) {
      mostrarAlerta({ msg: 'Los password no son iguales', error: true });
      return;
    }

    if(password.length < 6) {
      mostrarAlerta({ msg: 'El password es muy corto', error: true });
      return;
    }
     
    mostrarAlerta({})

    //Crear el usuario en la api
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password })
      mostrarAlerta({msg: 'Cuenta creada correctamente, revisa tu email para confirmar', error: false})
    } catch (error) {
      mostrarAlerta({msg: error.response.data.msg, error: true})
    }

  }

  const { msg } = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu cuenta y administra tus {""}
            <span className="text-black">pacientes</span>
          </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          { msg && <Alerta
            alerta={alerta}
          />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label htmlFor="" 
              className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input type="email"
              placeholder="E-mail de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={nombre}
              onChange={e => setNombre(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
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