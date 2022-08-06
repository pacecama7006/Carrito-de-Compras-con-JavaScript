// Variables
// Selecciono el carrito
const carrito = document.querySelector('#carrito');
// Selecciono el tbdoy de la table que sirve como contenedor del carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// Selecciono el botón para vaciar el carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
// Selecciono el listado de cursos
const listaCursos = document.querySelector('#lista-cursos');
// Arreglo que contiene los elementos del carrito
let articulosCarrito = [];

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
    // console.log(infoCurso);

    // Revisa si un curso ya existe en el carrito. Utilizo .some que me permite iterar
    // sobre un arreglo de objetos y verificar si un elemento existe en él
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    // console.log(existe);

    // Si existe, actualizamos la cantidad, en caso contrario tomamos el nuevo arreglo
    // del map como curso
    if (existe) {
        // Actualizamos la cantidad
        // Creamos un map para crear un nuevo arreglo de artículos carrito
        const cursos = articulosCarrito.map(curso => {
            // Buscamos el artículo duplicado
            if (curso.id === infoCurso.id) {
                // Agrego en 1 la cantidad
                curso.cantidad++;
                // retornamos el curso con la cantidad modificada
                return curso;
            }else{
                // retornamos el resto de los cursos sin agregar cantdad
                return curso;
            }
        });
        // Agregamos la actualización al carrito
        articulosCarrito = [...cursos];

    } else {
        // Agregamos el curso al carrito
        // Agrega elementos al arreglo de carrito. Tomo una copia porque necesito la referencia
        // de los artículos que se van agregando, por eso utilizo spread y le agrego el objeto
        // infoCurso
        articulosCarrito = [...articulosCarrito, infoCurso];
        // Veo como se va formando el arrego
        // console.log(articulosCarrito);
    }

    // Llamada a carritoHTML
    carritoHTML();
    
};
// Fin leerDatosCurso

// Muestra el carrito en el HTML
function carritoHTML() {
    // limpiar el HTML, para que no se muestren todas las copias del carrito
    limpiarHTML();
    // Recorro el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        // veo lo que tiene el curso
        // console.log(curso);
        
        // Variable haciendo destructuring para tener los valores del curso
        const {imagen, titulo, precio, cantidad, id} = curso;
        
        // Creo un trow para ir mostrando los elementos
        const row = document.createElement('tr');
        // Construyo el contenido de la fila
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" ></img>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        
        // Agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    });
};
// Fin carritoHTML

// Elimina los cursos del Tbody
function limpiarHTML() {
    // Forma lenta de limpiar el carrito
    contenedorCarrito.innerHTML = '';

    // Forma óptima
    // Mientras el contenedor tenga un elemento
    while (contenedorCarrito.firstChild) {
        // Elimino por referencia
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
