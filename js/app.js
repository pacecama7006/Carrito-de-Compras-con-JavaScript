// Variables
// Selecciono el carrito
const carrito = document.querySelector('#carrito');
// Selecciono el tbdoy de la table que sirve como contenedor del carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// Selecciono el botón para vaciar el carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
// Selecciono el listado de cursos
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();
// Función que sirve para escuchar los listeners
function cargarEventListeners() {
    // Listener a la listaCursos cuando presionas Agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
        
};
// Fin cargarEventListeners

// Funciones
function agregarCurso(e) {
    // Pruebo comunicación
    // console.log('Presionando en cursos');

    e.preventDefault();
    // Veo las clases en donde presiono
    // console.log(e.target.classList);

    // Si el elemento que presiono tiene la clase agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log('Agregando al carrito');
        // Veo que curso estoy dando click
        // console.log(e.target);

        // Con traversting voy hasta el div card que es el elemento padre del padre del boton
        // console.log(e.target.parentElement.parentElement);

        const cursoSeleccionado = e.target.parentElement.parentElement;
        // Llamada a función leerDatosCurso
        leerDatosCurso(cursoSeleccionado);
    }
}
// Fin agregarCurso

// Función que lee el contenido en donde hicimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // Verifico comunicación
    // console.log(curso);

    // Creación de objeto con el contenido del curso seleccionado
    const infoCurso = {
        // Obtengo el src de la imagen
        imagen: curso.querySelector('img').src,
        // Obtengo el contenido del h4
        titulo: curso.querySelector('h4').textContent,
        // Obtengo el contenido del precio del span
        precio: curso.querySelector('.precio span').textContent,
        // obtengo el valor del data-id del enlace
        id: curso.querySelector('a').getAttribute('data-id'),
        // Veces que seleccionan el curso. La 1a vez vale 1
        cantidad: 1
    }
    // Veo como se conforma el objeto
    console.log(infoCurso);
    
}