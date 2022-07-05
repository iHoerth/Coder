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

const getDataBase = () => console.log('LISTA DE ALUMNOS',listaDeAlumnos);

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
form.appendChild(nombreFormulario);

const apellidoFormulario = document.createElement('input');
apellidoFormulario.type = 'text';
apellidoFormulario.placeholder = 'Apellido/s';
form.appendChild(apellidoFormulario);

const dniFormulario = document.createElement('input');
dniFormulario.type = 'text';
dniFormulario.placeholder = 'Dni';
form.appendChild(dniFormulario);

const cursoFormulario = document.createElement('input');
cursoFormulario.type = 'text';
cursoFormulario.placeholder = 'Curso';
form.appendChild(cursoFormulario);

const botonFormulario = document.createElement('input');
botonFormulario.value = 'AGREGAR ALUMNO'
botonFormulario.type = 'submit';
form.appendChild(botonFormulario);

//Declaracion de Variables para validacion de datos
const letrasExpReg = /^[a-zA-Z]+$/;
const numsExpReg = /^[0-9]+$/;
//

const toTitleCase = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

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
  // Aca falta : botones tipo interfaz para modificar datos del alumno, quizas para removerlo, y despues una seccion de notas.
}

const validacionDatos = (e) => {  // capaz que esta funcion se puede generalizar, tipo le pasas el campo, la expregular y evaluas campo con exp regular de forma general....
  // por ahora la voy a dejar asi y terminar el programa. Despues si hay tiempo la rehago.
  
  //Si o si modificar para que verifique el campo fuera de foco con el evento.

  if(nombreFormulario.value === '' || apellidoFormulario.value === '' || dniFormulario.value === '' || cursoFormulario.value === ''){
    alert('Debes completar todos los campos para continuar.');
    return false;
  } else {
    if(!(letrasExpReg.test(nombreFormulario.value))){
      alert('El campo NOMBRE debe contener solamente letras.');
      nombreFormulario.value = '';
      return false; //hago estos returns false en cada if para despues poder cortar el submit en 128, porque sino se rompe todo. No se si hay una mejor manera de hacerlo.
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
    const nuevoAlum = new Alumno(toTitleCase(nombreFormulario.value), toTitleCase(apellidoFormulario.value), Number(dniFormulario.value), Number(cursoFormulario.value));
    for(element of form){  //form es un iterable porque es un HTML collection (CREO XD)
      if(!(element.type === 'submit')){
        element.value = '';
      }
    }
    listaDeAlumnos.push(nuevoAlum); // agregar a la 'base de datos'
    renderizarAlumno(nuevoAlum); // mostrarle al usuario los cambios
  }
})





