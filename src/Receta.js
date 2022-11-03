import React, { useRef, useState } from 'react'

export default function Receta({receta, seleccionarReceta}) {
  function handleClick(){
    seleccionarReceta(receta.id)
  }
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const editNombre = useRef()
  const editIngr = useRef()
  const editInst = useRef()

  const editarReceta = () =>{
    let idReceta = receta.id
    let nombreNuevo = editNombre.current.value
    let ingredientesNuevo = editIngr.current.value
    let instruccionesNuevo = editInst.current.value
    const arrayRecetas = JSON.parse(localStorage.getItem("recetario.recetas"))

    for (let i = 0; i < arrayRecetas.length; i++){
      const element = arrayRecetas[i]
      if (element.id === idReceta){
        if (nombreNuevo !== "" && nombreNuevo != null){
          element.nombre = nombreNuevo
        }
        if (ingredientesNuevo !== "" && ingredientesNuevo != null ) {
          element.ingredientes = ingredientesNuevo
        }
        if (instruccionesNuevo !== "" && instruccionesNuevo != null ){
          element.instrucciones = instruccionesNuevo
        }
        break
      }
    }
    localStorage.setItem("recetario.recetas",JSON.stringify(arrayRecetas))
    window.location.reload()
    
    /* setRecetas(() => {
      return [{id: id, nombre: nombreNuevo, ingredientes: ingredientesNuevo, instrucciones: instruccionesNuevo}]
    }) */
    editNombre.current.value = null
    editIngr.current.value = null
    editInst.current.value = null
  }
  return (
    <>
      <div id="containerReceta">
        <label>
          <div id = "nombreR">
            <input type="checkbox" class="checkmark" checked={receta.seleccionar} onChange={handleClick}/>
            {receta.nombre} 
            <button class="button3" type='button' id="editar" onClick={() => setShow2(!show2)}>Editar</button>
            {show2 && <div id='formulario2'>
              <div>Editar nombre<br></br><input ref={editNombre} type='text'></input></div>
              <div>Editar ingredientes<br></br><textarea ref={editIngr} type='text'></textarea></div>
              <div>Editar instrucciones<br></br><textarea ref={editInst} type='text'></textarea></div>
              <br></br><button class='button' type='button' onClick={() => editarReceta()}>{'Guardar cambios'}</button>
              </div>}
          </div>
          <div>
            <p id="ingrT">Ingredientes:</p>
            <p id="ingrC">{receta.ingredientes}</p>
          </div>
          <button class="button" type='button' id="ocultar" onClick={() => setShow(!show)}>{show === true ? 'Menos información' : 'Más información'}</button>
          {show && <div id="inst">
            <p>Instrucciones</p>
            <p>{receta.instrucciones}</p>
          </div>}
          
        </label>
          
      </div>
    </>
  )
}
