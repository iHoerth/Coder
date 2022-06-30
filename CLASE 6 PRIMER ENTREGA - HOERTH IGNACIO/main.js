// PRIMER ENTREGA DEL PROYECTO FINAL
// IGNACIO HOERTH
// JS #37725

alert('PROGRAMA QUE SIMULA UNA BASE DE DATOS DE ALUMNOS Y SUS NOTAS.');

//Declaracion de variables
const listaDeAlumnos = [];
const listaDeMaterias = [
  'ANALISIS',
  'ALGEBRA',
  'QUIMICA',
  'FISICA',
  'ALGORITMOS'
];

let validate = true;


class Alumno{
  constructor(nombre,dni,materias){
    this.nombre = nombre;
    this.dni = dni;
    this.materias = materias; //*
  }
}
//*  materias va a ser un objeto que tendra la siguiente forma:  
    // materias: {
    // fisica: [nota1,nota2,nota3],
    // algebra: [nota1,nota2,nota3],
    // quimica: [nota1,nota2,nota3],
    // etc,
    // }

//Me invente estos alumnos para tener una "base de datos" inicial para hacer pruebas.
const alumno1 = new Alumno('Alumno1','0001',{FISICA:[6,7,8],ALGEBRA:[6,4,5]});  
const alumno2 = new Alumno('Alumno2','0002',{ALGORITMOS:[10,10,10],ANALISIS:[7,8,5]});
listaDeAlumnos.push(alumno1);
listaDeAlumnos.push(alumno2);

const getDataBase = () => console.log('LISTA DE ALUMNOS',listaDeAlumnos,'\nLISTA DE MATERIAS',listaDeMaterias);

const addAlumno = () => {
  const alum = new Alumno();
  
  for(let prop in alum){
    if(prop == 'materias'){ // Las materias te las solicita abajo, en addNota(). Ahi te pide la materia y la nota que queres agregar. Sino tendria que pedir tooodo junto aca, materias y notas, y era demasiado.
      alum[prop] = {};
      break; // break para que cuando prop sea materias, no salte el prompt.
    }
    alum[prop] = prompt(`Ingrese ${prop} :`);
  }
  
  listaDeAlumnos.push(alum);
}


const buscarAlumno = () => {
  // Pido DNI
  const dniIngresado = prompt('Ingrese DNI del alumno : ');
  // Metodo Array.find() para ver que ese DNI exista en mi array de objetos.
  const alum = listaDeAlumnos.find(alum => alum.dni === dniIngresado);
  // como el metodo Array.find() devuelve undefined si no encuentra el elemento, chequeo con un condicional:
  if(typeof(alum) === 'undefined'){
    alert('Alumno no encontrado en la base de datos.');
    return null; // como no encontro el alumno, me parecio mas adecuado un return null que return undefined por defecto.
  } else {
    // alert(`Alumno encontrado : ${alum.nombre}.\nMaterias: ${alum.materias}`);
    alert(consultarNotas(alum));
    return alum;
  }
}

const consultarNotas = (alum) => {
  let result = `Alumno encontrado\nNombre: ${alum.nombre}.\n`;
  for(let key in alum.materias){
    result += key + ": " + alum.materias[key] + `\n`;
  }
  return result;
}

const addNota = () => {
  console.log('Materias posibles:',listaDeMaterias); //para mostrar la lista y que sea mas facil de usar el programa
  alert('Para agregar notas, el alumno debe existir en la base de datos. Consulte con el DNI del alumno si ya esta registrado.');


  const alum = buscarAlumno(); //invoco a buscar alumno para que me traiga un alumno al cual agregarle notas.
  if(alum === null) {return}; // si alum es null finalizo la funcion aca, porque no puede agregar notas de un alumno inexistente.
  
  let nuevaMateria = prompt('Ingrese materia :').toUpperCase();
  while(!(nuevaMateria === listaDeMaterias.find(e => e === nuevaMateria))){   // chequeamos que la materia exista, es un array que declare arriba de todo.
    alert('Por favor, ingrese una materia existente.');
    nuevaMateria = prompt('Ingrese materia :').toUpperCase();
  }
  const nota = Number(prompt(`Ingrese la nota de su ultimo parcial de ${nuevaMateria} :`)); 

  typeof(alum.materias[nuevaMateria]) === 'undefined' ? alum.materias[nuevaMateria] = [] : null; // esto porque si todavia no tiene notas en esa materia, el tipo de dato era undefined y entonces no podia pushear mas abajo, capaz podria solucionarlo con una variable global inicializada como array vacio?.

  alum.materias[nuevaMateria].push(nota);
  console.log(alum.materias[nuevaMateria]);
} //creo que seria mejor definir otra funcion que inscriba al alumno en materias. Que addNota solamente te deje agregar notas de materias en las que YA este inscripto el alumno. Y otra funcion que inscriba al alumno en la materia.



getDataBase();

