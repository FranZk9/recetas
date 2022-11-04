import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Recetario from './Recetario';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "recetario.recetas"
function App() {
  const [recetas, setRecetas] = useState([])
  const refReceta = useRef()
  const refIngredientes = useRef()
  const refInstrucciones = useRef()
  const refImg = useRef()

  function seleccionarReceta(id){
    const nrecetas = [...recetas]
    const receta = nrecetas.find(receta => receta.id === id)
    receta.seleccionar = !receta.seleccionar
    console.log(receta);
    setRecetas(nrecetas)
  }

  function agregarReceta(e){
    const nombre = refReceta.current.value
    const ingredientes = refIngredientes.current.value
    const instrucciones = refInstrucciones.current.value
    const imagen = refImg.current.value
    if (nombre === "" || ingredientes === "" || instrucciones === "" ) return
    setRecetas(prevReceta => {
      return [...prevReceta, { id: uuidv4(), nombre: nombre, ingredientes: ingredientes, instrucciones: instrucciones, imagen: imagen, seleccionar: false}]
    })
    refReceta.current.value = null
    refIngredientes.current.value = null
    refInstrucciones.current.value = null
    refImg.current.value = null

  }

  function eliminarReceta(){
    const nreceta = recetas.filter(receta => !receta.seleccionar)
    setRecetas(nreceta)
  }


  useEffect(() =>{
    const recetasStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (recetasStorage) setRecetas(recetasStorage)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recetas))
  }, [recetas])

  return(
    <>
      <h1 id="h1">RECETARIO</h1>
      <div id="container">
        <div id="recetario">
          <Recetario recetas={recetas} seleccionarReceta={seleccionarReceta}/>
          <div>Eliminar {recetas.filter(receta => receta.seleccionar).length} recetas</div>
          <button id="eliminarBtn" data-testid='eliminarBtn' onClick={eliminarReceta}>Eliminar</button>
        </div>
        
        <div id="formulario">
          <h2 id="h2">Añade una nueva receta</h2>
          <div>
            <label htmlFor="nombreReceta"  className='texto'>Nombre de receta</label>
            <br></br>
            {/* <p className="texto">Nombre de receta</p> */}
            <input id="nombreReceta" ref={refReceta} type="text"></input><br></br>
          </div>
          <div>
            <label htmlFor="ingredientesReceta" className='texto'>Ingredientes</label>
            <br></br>
            {/* <p className="texto">Ingredientes</p> */}
            <textarea id="ingredientesReceta" ref={refIngredientes} type="text"></textarea>
          </div>
          <div>
            <label htmlFor="instruccionesReceta" className='texto'>Instrucciones</label>
            <br></br>
            {/* <p className="texto">Instrucciones</p> */}
            <textarea id="instruccionesReceta" ref={refInstrucciones} type="text"></textarea>
          </div>
          <div>
            <label htmlFor="instruccionesReceta" className='texto'>URL de imagen</label>
            <br></br>
            {/* <p className="texto">URL de imagen</p> */}
            <input id="urlReceta" ref={refImg} type='text'></input>
          </div>
          <button className="button2" onClick={agregarReceta}>Añadir</button>
        </div>
      </div>    
    </>
  )
}

export default App;