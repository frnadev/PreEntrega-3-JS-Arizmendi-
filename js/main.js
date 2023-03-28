const productos = [
    {
        id: "producto-1",
        titulo: "Producto 1",
        imagen: "../img/placeholder.png",
        categoria: {
            nombre: "Productos",
            id: "productos"
        },
        precio: 200
    },
    {
        id: "producto-2",
        titulo: "Producto 2",
        imagen: "../img/placeholder.png",
        categoria: {
            nombre: "Productos",
            id: "productos"
        },
        precio: 200
    },
    {
        id: "producto-3",
        titulo: "Producto 3",
        imagen: "../img/placeholder.png",
        categoria: {
            nombre: "Productos",
            id: "productos"
        },
        precio: 200
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const mainTitle = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".producto-add");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-im" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-details">
            <h3 class="producto-title">${producto.titulo}</h3>
            <p class="producto-price">$${producto.precio}</p>
            <button class="producto-add" id="${producto.id}">Llevar</button>
        </div>
    `;

      contenedorProductos.append(div);  
    });
};

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click" , (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }
        

       

    })
});

function agregarBotones() {
    botonesAgregar = document.querySelectorAll(".producto-add");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

let productosEnElCarrito;

let productosEnElCarritoLocal = localStorage.getItem("productos-en-el-carrito");


if (productosEnElCarritoLocal) {
    productosEnElCarrito = JSON.parse(productosEnElCarritoLocal);
    sumarNumero();
} else {
    productosEnElCarrito = [];
};


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEnCarrito = productos.find(producto => producto.id === idBoton);

    if(productosEnElCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnElCarrito.findIndex(producto => producto.id === idBoton);
        productosEnElCarrito[index].cantidad++;
    } else {
        productoEnCarrito.cantidad = 1;
        productosEnElCarrito.push(productoEnCarrito);
    }

    sumarNumero();

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnElCarrito));
};

function sumarNumero() {
    let nuevoNumero = productosEnElCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
};