document.addEventListener('DOMContentLoaded', function() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerText = 'Bienvenido, ' + loggedInUser.username + '!';
    } else {
        window.location.href = 'index.html';
    }

    const cardContainer = document.getElementById('card-container');
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    const products = [
        {
            id: 1,
            imagen: 'descarga2.jpeg',
            nombre: 'Travis Scott',
            precio: '$48,000.00',
            descripcion: `
            Descubre la moda con los unicos y exclusivos Travis Scott.`,
            existencia: 3
        },
        {
            id: 2,
            imagen: 'descarga3.jpeg',
            nombre: 'Jordan retro 4 A ma maniere',
            precio: '$18,000.00',
            descripcion: `
            Air Jordan 4 Retro A ma maniere el color morado le da un toco lujoso, este tenis echo de piel`,
            existencia: 4
        },
        {
        id:3,
        imagen:'af1tw.jpg',
        nombre:'Nike air force one',
        precio:'$2,000.00',
        descripcion: 'Este tenis medio economico para poder lucir elegante sin tener que usar zapatos',
        existencia:15
        }
    ];

    // Cargar productos en tarjetas
    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h3>${product.nombre}</h3>
                </div>
                <div class="card-back">
                    <h3>${product.nombre}</h3>
                    <p>${product.precio}</p>
                    <p>${product.descripcion}</p>
                    <p>Existencia: ${product.existencia}</p>
                    <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    let cartCount = 0;
    let cart = [];

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.product.id === productId);
    
        if (product) {
            if (cartItem) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                cartItem.cantidad++;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.push({ product, cantidad: 1 });
            }
            // Actualizar el contador del carrito
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
        }
    };

    document.getElementById('cartButton').addEventListener('click', function() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product.imagen}" alt="${item.product.nombre}" class="cart_img">
                </div>
                <div class="cart-item-details text-center">
                    <h5>${item.product.nombre}</h5>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <button class="btn btn-outline-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    });

    window.removeFromCart = function(index) {
        if (index >= 0 && index < cart.length) {
            const cartItem = cart[index];
            // Disminuir la cantidad del producto en el carrito
            cartItem.cantidad--;
            // Si la cantidad llega a cero, eliminar el producto del carrito
            if (cartItem.cantidad === 0) {
                cart.splice(index, 1);
            }
            // Actualizar el contador del carrito
            cartCount--;
            document.getElementById('cartCount').textContent = cartCount;
            // Actualizar la vista del carrito sin cerrar el modal
            updateCartItems();
        }
    };
    
    function updateCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product.imagen}" alt="${item.product.nombre}" class="cart_img">
                </div>
                <div class="cart-item-details text-center">
                    <h5>${item.product.nombre}</h5>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <button class="btn btn-outline-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
});
