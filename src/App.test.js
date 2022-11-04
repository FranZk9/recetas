import { render, screen , fireEvent, getByTestId, renderHook} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {Receta, editarReceta} from './Receta';
import Recetario from './Recetario';

describe('(0) Render', ()=>{
  test('(00) renderizar App', () => {
    const mockFn = jest.fn()
    render(<App createTask={mockFn}/>)
  })
})

describe("(1) Agregar", () =>{
  it("(11) Prueba agregar receta con campos obligatorios + imagen", () =>{
      const testData = {
          nombre: "Receta de prueba con foto",
          ingredientes: "Ingredientes de prueba",
          instrucciones: "Instrucciones de prueba",
          imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
          seleccionar: false
      }

      const mockFn = jest.fn();
      render(<App createTask={mockFn}/>);

      const inputNombre = screen.getByLabelText("Nombre de receta");
      const inputIngredientes = screen.getByLabelText("Ingredientes");
      const inputInstrucciones = screen.getByLabelText("Instrucciones");
      const inputUrl = screen.getByLabelText("URL de imagen");
      const btnAgregar = screen.getByRole("button", {
          name: /Añadir/i
      });


      userEvent.clear(inputNombre);
      userEvent.type(inputNombre, testData.nombre);

      userEvent.clear(inputIngredientes);
      userEvent.type(inputIngredientes, testData.ingredientes);

      userEvent.clear(inputInstrucciones);
      userEvent.type(inputInstrucciones, testData.instrucciones);

      userEvent.clear(inputUrl);
      userEvent.type(inputUrl, testData.imagen);

      userEvent.click(btnAgregar);

  });

  it("(12) Prueba agregar receta con campos obligatorios y sin imagen", () =>{
      const testData = {
          nombre: "Receta de prueba sin foto",
          ingredientes: "Otros ingredientes de prueba",
          instrucciones: "Otras instrucciones de prueba",
          imagen: "",
          seleccionar: false
      }

      const mockFn = jest.fn();
      render(<App createTask={mockFn} />);

      const inputNombre = screen.getByLabelText("Nombre de receta");
      const inputIngredientes = screen.getByLabelText("Ingredientes");
      const inputInstrucciones = screen.getByLabelText("Instrucciones");
      const inputUrl = screen.getByLabelText("URL de imagen");
      const btnAgregar = screen.getByRole("button", {
          name: /Añadir/i
      });


      userEvent.clear(inputNombre);
      userEvent.type(inputNombre, testData.nombre);

      userEvent.clear(inputIngredientes);
      userEvent.type(inputIngredientes, testData.ingredientes);

      userEvent.clear(inputInstrucciones);
      userEvent.type(inputInstrucciones, testData.instrucciones);

      userEvent.clear(inputUrl);
      userEvent.type(inputUrl, testData.imagen);

      userEvent.click(btnAgregar);
  });
})

describe('(3) Ver', ()=>{
  test('(31) Mostrar más información', ()=> {
    const mockFn = jest.fn()
    render(<App createTask={mockFn}/>)
    const btnInfo = screen.getByTestId('masinfo')
    userEvent.click(btnInfo)
  })
})

describe('(4) Eliminar', ()=>{
  beforeEach(() => {
    const mockFn = jest.fn()
    render(<App createTask={mockFn}/>)
  })
  it('(41) (42) checkear y borrar', ()=>{
    const checkear = screen.getByTestId('check')
    userEvent.click(checkear)
    userEvent.click(checkear)
    const btnInfo = screen.getByTestId('eliminarBtn')
    userEvent.click(btnInfo)
  })
})

/* describe('(2) editar',()=>{
  beforeEach(()=>{
    const mockFn = jest.fn()
    render(<App createTask={mockFn}/>)
  })
  it('1 editar nombre', ()=>{
    const botonEdit = screen.getByTestId('btnEditar')
    const botonGuardar = screen.getByTestId('btnGuardar')
    userEvent.click(botonEdit)
    const nombreNew = screen.getAllByTestId('editN')
    const recetitaTest = {
      nombreEditado: 'nombre ha sido editado'
    }
    userEvent.clear(nombreNew)
    userEvent.type(nombreNew,recetitaTest.nombreEditado)
    userEvent.click(botonGuardar)
  })
}) */
