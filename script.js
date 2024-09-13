document.addEventListener('DOMContentLoaded', () => {
    // Handle header slider
    const sliderImages = document.querySelectorAll('.header-img');
    let currentIndex = 0;

    function showNextSlide() {
        sliderImages[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % sliderImages.length;
        sliderImages[currentIndex].style.display = 'block';
    }

    setInterval(showNextSlide, 3000); // Change slide every 3 seconds

    // Initialize slides
    sliderImages.forEach((img, index) => {
        img.style.display = index === 0 ? 'block' : 'none';
    });

    // Array to store cart items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add items to cart
    function addToCart(productName, productPrice) {
        const product = {
            name: productName,
            price: parseFloat(productPrice)
        };

        // Add product to the cart
        cart.push(product);

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.name} has been added to the cart.`);
    }

    // Add event listeners to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });

    // Function to display cart items on the cart page
    function displayCartItems() {
        const cartList = document.getElementById('cart-list');
        const totalPriceElem = document.getElementById('total-price');

        let totalPrice = 0;
        cartList.innerHTML = '';  // Clear previous items

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
            cartList.appendChild(cartItem);
            totalPrice += item.price;
        });

        totalPriceElem.textContent = totalPrice.toFixed(2);
    }

    // Call displayCartItems only if on the cart page
    if (window.location.pathname.includes('index1.html')) {
        displayCartItems();
    }

    document.querySelector('.contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        var messageDiv = document.getElementById('confirmation-message');
        messageDiv.innerText = "Your message has been sent!";
        messageDiv.classList.add('show');
    });
});

document.getElementById('Order').addEventListener('click', function() {
    var messageDiv = document.getElementById('order-message');
    messageDiv.innerText = "Thank you for your order! Your order will be shipped soon! Check messages for further details.";
    messageDiv.classList.add('show');
});

document.getElementById('clear-cart').addEventListener('click', function() {
    // Clear the cart items
    document.getElementById('cart-list').innerHTML = '';
    // Reset the total price
    document.getElementById('total-price').innerText = '0.00';
    // Clear the cart in localStorage
    localStorage.removeItem('cart');
    // Hide the order message
    document.getElementById('order-message').classList.remove('show');
});
