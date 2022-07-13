const listaDeAlumnos = [];

class Alumno{
  constructor(nombre,apellido,dni,curso,notas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.curso = curso;
    this.notas = notas; 
  }
}

// Declaracion de variables del DOM
const body = document.body;
const form = document.createElement('form');
form.className = 'formularioNuevoAlumno';
const formContainer = document.getElementsByClassName('formContainer')[0];
formContainer.appendChild(form);
const alumnosContainer = document.getElementsByClassName('alumnosContainer')[0]; 

const nombreFormulario = document.createElement('input');
nombreFormulario.type = 'text';
nombreFormulario.placeholder = 'Nombre/s';
nombreFormulario.name = 'Nombre';
form.appendChild(nombreFormulario);

const apellidoFormulario = document.createElement('input');
apellidoFormulario.type = 'text';
apellidoFormulario.placeholder = 'Apellido/s';
nombreFormulario.name = 'Apellido';
form.appendChild(apellidoFormulario);

const dniFormulario = document.createElement('input');
dniFormulario.type = 'text';
dniFormulario.placeholder = 'Dni';
nombreFormulario.name = 'Dni';
form.appendChild(dniFormulario);

const cursoFormulario = document.createElement('input');
cursoFormulario.type = 'text';
cursoFormulario.placeholder = 'Curso';
nombreFormulario.name = 'Curso';
form.appendChild(cursoFormulario);

const botonFormulario = document.createElement('input');
botonFormulario.value = 'AGREGAR ALUMNO'
botonFormulario.type = 'submit';
form.appendChild(botonFormulario);

//Declaracion de Variables RegExp para validacion de datos
const letrasExpReg = /^[a-zA-Z]+$/;
const numsExpReg = /^[0-9]+$/;


const toTitleCase = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

const getDataBase = () => console.log('LISTA DE ALUMNOS',listaDeAlumnos);

// Funcion que muestra alumnos en el dom.
const renderizarAlumno = (alum) => {
  const nuevoAlum = document.createElement('div');
  nuevoAlum.className = 'alumno';
  alumnosContainer.appendChild(nuevoAlum);

  const datos = document.createElement('div');
  datos.className = 'datos';
  const interfaz = document.createElement('div');
  interfaz.className = 'interfaz';

  nuevoAlum.appendChild(datos,interfaz);

  const nombre = document.createElement('div');
  datos.appendChild(nombre);
  nombre.innerHTML = alum.nombre;

  const apellido = document.createElement('div');
  datos.appendChild(apellido);
  apellido.innerHTML = alum.apellido;

  const dni = document.createElement('div');
  datos.appendChild(dni);
  dni.innerHTML = alum.dni;

  const curso = document.createElement('div');
  datos.appendChild(curso);
  curso.innerHTML = alum.curso;
}

// Funcion que valida datos del formulario
const validarUnicoDni = () => localStorage.getItem(parseInt(dniFormulario.value)) !== null ? true : false;

const validacionDatos = (e) => {  
  
  if(nombreFormulario.value === '' || apellidoFormulario.value === '' || dniFormulario.value === '' || cursoFormulario.value === ''){
    alert('Debes completar todos los campos para continuar.');
    return false;
  } else {
    if(!(letrasExpReg.test(nombreFormulario.value))){
      alert('El campo NOMBRE debe contener solamente letras.');
      nombreFormulario.value = '';
      return false; 
    }

    if(!(letrasExpReg.test(apellidoFormulario.value))){
      alert('El campo APELLIDO debe contener solamente letras.');
      apellidoFormulario.value = '';
      return false;
    }

    if(!(numsExpReg.test(dniFormulario.value))){
      alert('El campo DNI debe contener solamente numeros.');
      dniFormulario.value = '';
      return false;
    }else if(validarUnicoDni()) {
      alert('El DNI ingresado ya existe en la base de datos.');
      dniFormulario.value = '';
      return false;
    }
    
    if(!(numsExpReg.test(cursoFormulario.value))){
      alert('El campo CURSO debe contener solamente numeros.');
      cursoFormulario.value = '';
      return false;
    }
    return true;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!validacionDatos(e)){
    return null;
  } else {
    const nuevoAlum = crearNuevoAlumno();
    renderizarAlumno(nuevoAlum); // mostrarle al usuario los cambios
    limpiarFormulario();
  }
})

const crearNuevoAlumno = () => {
  const nuevoAlum = new Alumno(toTitleCase(nombreFormulario.value), toTitleCase(apellidoFormulario.value), Number(dniFormulario.value), Number(cursoFormulario.value));
  listaDeAlumnos.push(nuevoAlum); // agregar a la 'base de datos'
  localStorage.setItem(`${nuevoAlum.dni}`,JSON.stringify(nuevoAlum));
  return nuevoAlum;
}

const limpiarFormulario = () => {
  for(element of form){  
    (element.type !== 'submit') && (element.value = '');  
  }
}

// Esto es para que cada vez que refresheo la pagina, la lista de alumnos se siga mostrando en el dom sacando la info de localStorage
const renderizarLocalStorage = () => {
  Object.entries(localStorage).forEach(element => {
    renderizarAlumno(JSON.parse(element[1]));
    listaDeAlumnos.push(JSON.parse(element[1]));
  });
}

renderizarLocalStorage();
validarUnicoDni();

