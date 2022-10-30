import React, { useState } from 'react'

export default function Receta({receta, seleccionarReceta}) {
  function handleClick(){
    seleccionarReceta(receta.id)
  }
  const [show, setShow] = useState(false);

  return (
    <>
      <div id="containerReceta" class="container">
        <label>
          <div id = "nombreR">
            <input type="checkbox" class="checkmark" checked={receta.seleccionar} onChange={handleClick}/>
            {receta.nombre}
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
