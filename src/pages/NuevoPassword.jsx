import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [alerta, setAlerta ] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const { token } = useParams()

    useEffect(() => {
      const comprobarToken = async () => {
        try {
          await clienteAxios(`/veterinarios/olvide-password/${token}`)
          setTokenValido(true)
          setAlerta({
            msg: "Coloca tu nueva contraseña"
          })
        } catch (error) {
          setAlerta({msg: 'Hubo un error con el enlace' , error: true})
        }
      }
      comprobarToken()
    }, [])

    const handleSubmit = async e => {
      e.preventDefault()
      if(password.length < 6) {
        setAlerta({
          msg: 'La contraseña debe contener al menos 6 caracteres',
          error: true
        })
        return
      }

      try {
        const url = `/veterinarios/olvide-password/${token}`
        const { data } = await clienteAxios.post(url, { password })
        setAlerta({msg: data.msg})
        setPasswordModificado(true)
      } catch (error) {
        console.log(error)
        setAlerta({msg: 'Hubo un error al cambiar la contraseña', error:true})
      }
    }
    
    const { msg } = alerta
    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Recupera tu acceso y no pierdas tus {""}
            <span className="text-black">pacientes</span>
          </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alerta
          alerta={alerta}
        />}
        { tokenValido && 
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="" 
            className="uppercase text-gray-600 block text-xl font-bold">
              Nueva contraseña
            </label>
            <input type="password"
            placeholder="Tu nueva contraseña"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input type="submit"
            value="Reestablecer"
            className="bg-indigo-700 w-full py-3 px-3
            rounded-xl text-white uppercase
            font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
          />
        </form>
        }
        { passwordModificado && 
          <nav className='mt-10 lg:flex lg:justify-between'>
          <Link 
          className='block text-center my-5 text-gray-500'
          to="/"
          >Iniciar sesión
          </Link >
          </nav>
        }
        </div>
      </>
    )
}

export default NuevoPassword