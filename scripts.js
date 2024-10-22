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

// Function to search products by title or ingredients
function searchProducts(keyword) {
    const filteredCupcakes = cupcakes.filter(cupcake =>
        cupcake.title.toLowerCase().includes(keyword.toLowerCase()) || 
        cupcake.ingredients.toLowerCase().includes(keyword.toLowerCase())
    );

    const filteredWeddingCakes = weddingCakes.filter(cake =>
        cake.title.toLowerCase().includes(keyword.toLowerCase()) || 
        cake.ingredients.toLowerCase().includes(keyword.toLowerCase())
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
                <div class="card mb-4 product-card">
                    <div class="image-container">
                        <img src="img/${product.title.toLowerCase().includes('cupcake') ? 'Cupcakes' : 'Weddingcakes'}/${product.image}" class="card-img-top rounded-circle" alt="${product.title}">
                        <div class="ingredients-overlay">
                            <p>Ingredients: ${product.ingredients}</p>
                        </div>
                    </div>
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
    { title: "Cherry Dream Cupcake", price: 2.50, image: "1.jpg", ingredients: "Flour, Sugar, Vanilla, Cherry, Eggs, Milk" },
    { title: "Golden Cupcake", price: 2.50, image: "2.jpg", ingredients: "Flour, Sugar, Vanilla, Saffron, Eggs, Milk" },
    { title: "Candy Cupcake", price: 3.00, image: "3.jpg", ingredients: "Flour, Sugar, Vanilla, Watermelon, Lime, Orange, Sprinkles,  Eggs, Milk" },
    { title: "Raspberry Cupcake", price: 2.75, image: "4.jpg", ingredients: "Flour, Sugar, Vanilla Suger, Raspberry, Eggs, Milk" },
    { title: "Dark Dream Cupcake", price: 3.00, image: "5.jpg", ingredients: "Flour, Sugar, Vanilla Suger, Milkchocolate, Dark chocolate, Coffee, Eggs, Milk" },
    { title: "Pink Lady Cupcake", price: 3.00, image: "6.png", ingredients: "Flour, Sugar, Pomegranate, Strawberries, Eggs, Milk" },
    { title: "Caramel Dream Cupcake", price: 2.75, image: "7.png", ingredients: "Flour, Sugar, Vanilla Suger, Salt, Caramel, Eggs, Milk" },
    { title: "Lemon Cupcake", price: 3.00, image: "8.png", ingredients: "Flour, Sugar, Lemon, Orange, Eggs, Milk" },
];

const weddingCakes = [
    { title: "Black Velvet Wedding Cake", price: 150.00, image: "1.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Milkchocolate, Dark chocolate, Coffee, Milk"  },
    { title: "Rustic Orange Wedding Cake", price: 175.00, image: "2.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Vanilla Suger, Orange, Carmel, Milk"  },
    { title: "Simpel Elegant Wedding Cake", price: 200.00, image: "3.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Milkchocolate, Vanilla Cream, Milk"  },
    { title: "Red Dream Wedding Cake", price: 180.00, image: "4.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Strawberry, Milkchocolate Cream, Caramel, Milk "  },
    { title: "Elegant Vanilla Wedding Cake", price: 160.00, image: "5.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Vanilla Suger, Vanilla Cream, Caramel, Milk"  },
    { title: "Sour Dream Wedding Cake", price: 200.00, image: "6.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Lemon, Orange, Lime, Watermelon Cream, Milk"  },
    { title: "SweetTooth Wedding Cake", price: 180.00, image: "7.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Caramel, Caramel/Walthers Cream, Milkchocolate Bites, Milk "  },
    { title: "Candy Mountain Wedding Cake", price: 160.00, image: "8.jpg", ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Fruit Sprinkels, Smarties, Lemon, Marshmallow Cream, Milk"  },
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
        let cupcakeCount = 0;
        let hasWeddingCake = false;

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

            // Increment total price
            total += item.price;

            // Count the cupcakes and check for wedding cakes
            if (item.title.toLowerCase().includes('cupcake')) {
                cupcakeCount++;
            } else if (item.title.toLowerCase().includes('wedding cake')) {
                hasWeddingCake = true;
            }
        });

        // Apply discounts based on the conditions
        let discount = 0;

        // If they have 10 or more cupcakes
        if (cupcakeCount >= 10) {
            if (hasWeddingCake) {
                // 15% discount for 10+ cupcakes and a wedding cake
                discount = total * 0.15;
            } else {
                // 10% discount for 10+ cupcakes
                discount = total * 0.10;
            }
        }

        // Subtract the discount from the total
        total = total - discount;

        // Display the total with the discount applied
        cartTotal.textContent = `Total: $${total.toFixed(2)} ${discount > 0 ? `(Discount applied: $${discount.toFixed(2)})` : ''}`;
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
