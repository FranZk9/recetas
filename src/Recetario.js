import React from 'react'
import Receta from './Receta'

export default function Recetario({recetas, seleccionarReceta}) {
  return (
    recetas.map(receta => {
        return <Receta key={receta.id} seleccionarReceta={seleccionarReceta} receta={receta}/>
    })
  )
}
