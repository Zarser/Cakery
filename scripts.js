// Function to load header and footer
async function loadHeaderAndFooter() {
    try {
        const header = await fetch('header.html');
        const footer = await fetch('footer.html');

        // Check if the response is OK
        if (!header.ok || !footer.ok) {
            throw new Error('Failed to load header or footer');
        }

        document.getElementById('header').innerHTML = await header.text();
        document.getElementById('footer').innerHTML = await footer.text();

        // Attach event listener for cart modal and search after header is loaded
        initializeCartIcon();
        initializeSearchFunctionality();
    } catch (error) {
        console.error('Error loading header or footer:', error);
    }
}

// Function to search products
function searchProducts(keyword) {
    const filteredCupcakes = cupcakes.filter(cupcake =>
        cupcake.title.toLowerCase().includes(keyword.toLowerCase())
    );

    const filteredWeddingCakes = weddingCakes.filter(cake =>
        cake.title.toLowerCase().includes(keyword.toLowerCase())
    );

    // Get container elements
    const cupcakesContainer = document.getElementById('cupcakes-container');
    const weddingCakesContainer = document.getElementById('weddingcakes-container');

    // Check if the container elements exist
    if (!cupcakesContainer && !weddingCakesContainer) {
        console.error('Product containers do not exist on this page.');
        return; // Exit the function if the containers are not found
    }

    // Clear current displayed products
    if (cupcakesContainer) {
        cupcakesContainer.innerHTML = '';
        // Display the filtered cupcakes
        displayProducts(filteredCupcakes, 'cupcakes-container');
    }

    if (weddingCakesContainer) {
        weddingCakesContainer.innerHTML = '';
        // Display the filtered wedding cakes
        displayProducts(filteredWeddingCakes, 'weddingcakes-container');
    }
}

// Function to display products dynamically
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    products.forEach(product => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="img/${product.title.toLowerCase().includes('cupcake') ? 'cupcakes' : 'weddingcakes'}/${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Function to initialize search functionality
function initializeSearchFunctionality() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton && searchInput) {
        // Event listener for search button click
        searchButton.addEventListener('click', function () {
            const keyword = searchInput.value;
            if (keyword) { // Check if there's a keyword to search
                searchProducts(keyword);
            }
        });

        // Optional: Trigger search on Enter key press
        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                const keyword = searchInput.value;
                if (keyword) { // Check if there's a keyword to search
                    searchProducts(keyword);
                }
            }
        });
    } else {
        console.error('Search elements are not available.');
    }
}

// Product data for demonstration
const cupcakes = [
    { title: "Chocolate Cupcake", price: 2.50, image: "1.jpg" },
    { title: "Vanilla Cupcake", price: 2.50, image: "2.jpg" },
    { title: "Red Velvet Cupcake", price: 3.00, image: "3.jpg" },
    { title: "Lemon Cupcake", price: 2.75, image: "4.jpg" },
    { title: "Strawberry Cupcake", price: 3.00, image: "5.jpg" },
    { title: "Red Velvet Cupcake", price: 3.00, image: "3.jpg" },
    { title: "Lemon Cupcake", price: 2.75, image: "4.jpg" },
    { title: "Strawberry Cupcake", price: 3.00, image: "5.jpg" },
];

const weddingCakes = [
    { title: "Elegant White Wedding Cake", price: 150.00, image: "1.jpg" },
    { title: "Rustic Wedding Cake", price: 175.00, image: "2.jpg" },
    { title: "Floral Wedding Cake", price: 200.00, image: "3.jpg" },
    { title: "Modern Wedding Cake", price: 180.00, image: "4.jpg" },
    { title: "Simple Tiered Wedding Cake", price: 160.00, image: "5.jpg" },
    { title: "Floral Wedding Cake", price: 200.00, image: "3.jpg" },
    { title: "Modern Wedding Cake", price: 180.00, image: "4.jpg" },
    { title: "Simple Tiered Wedding Cake", price: 160.00, image: "5.jpg" },
];

// Cart array, load from localStorage if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart icon badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-count'); // Ensure this element exists in your header
    if (cartBadge) {
        cartBadge.textContent = cart.length;

        // Hide the badge if no items are in the cart
        if (cart.length === 0) {
            cartBadge.style.display = 'none';
        } else {
            cartBadge.style.display = 'inline-block';
        }

        // Update the cart modal
        updateCartModal();
    } else {
        console.error('cart-count element is null. Ensure it exists in the header.');
    }
}

// Function to update the cart modal with the items
function updateCartModal() {
    const cartModalBody = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');

    if (!cartModalBody) {
        console.error('cart-items-container element is null');
        return;
    }
    if (!cartTotal) {
        console.error('cart-total element is null');
        return;
    }

    cartModalBody.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartModalBody.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = 'Total: $0.00'; // Reset total
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            cartModalBody.innerHTML += `
                <div class="cart-item">
                    <img src="img/${item.title.toLowerCase().includes('cupcake') ? 'cupcakes' : 'weddingcakes'}/${item.image}" alt="${item.title}">
                    <div class="flex-grow-1">
                        <p class="mb-0">${item.title} - $${item.price.toFixed(2)}</p>
                    </div>
                    <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Attach event listeners for removing items from the cart
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1); // Remove the item from cart
            saveCart(); // Save the updated cart
            updateCartBadge(); // Update the cart badge and modal
        });
    });
}

// Initialize cart icon and modal event listener
function initializeCartIcon() {
    // Hide cart badge initially if empty
    updateCartBadge();

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.parentNode.parentNode.querySelector('img').getAttribute('src').split('/').pop(); // Get the image name
            cart.push({ title, price, image });
            
            saveCart(); // Save cart to localStorage
            updateCartBadge(); // Update cart icon badge
        });
    });

    // Set up checkout button event
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            alert('Thank you for your order! A summary will be sent to your email.');
            cart = []; // Clear the cart
            saveCart(); // Save the empty cart
            updateCartBadge(); // Reset the cart badge to 0
        });
    } else {
        console.error('checkout-button element is null');
    }
}

// Load products dynamically on products.html
if (document.title.includes("Products")) {
    displayProducts(cupcakes, 'cupcakes-container');
    displayProducts(weddingCakes, 'weddingcakes-container');
}

// Load header, footer, and products
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderAndFooter();

    if (document.title.includes("Products")) {
        displayProducts(cupcakes, 'cupcakes-container');
        displayProducts(weddingCakes, 'weddingcakes-container');
    }
});
