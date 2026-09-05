/* ============================================ */
/* QUICKCART+ - MAIN JAVASCRIPT FILE            */
/* ============================================ */

// ============================================
// SECTION 1: DATA
// ============================================
// TODO: Add your own products here

const groceryProducts = [
    {
        id: 1,
        name: "Fresh Milk",
        weight: "1 Litre",
        price: 68,
        mrp: 72,
        category: "dairy",
        emoji: "🥛",
        tag: "BESTSELLER"
    },
    {
        id: 2,
        name: "Brown Bread",
        weight: "400g",
        price: 45,
        mrp: 50,
        category: "bakery",
        emoji: "🍞",
        tag: ""
    }
    // TODO: Add more grocery products (aim for 8-12)
];

const rentalProducts = [
    {
        id: 101,
        name: "Single Seater Sofa",
        price: 499,
        category: "furniture",
        emoji: "🛋️"
    }
    // TODO: Add more rental products (aim for 6-8)
];

const groceryCategories = [
    { icon: "🥬", name: "Veggies" },
    { icon: "🍎", name: "Fruits" },
    { icon: "🥛", name: "Dairy" },
    { icon: "🍞", name: "Bakery" },
    { icon: "🍚", name: "Staples" },
    { icon: "🥤", name: "Drinks" }
];

const rentalCategories = [
    { icon: "🛋️", name: "Furniture" },
    { icon: "📺", name: "Appliances" },
    { icon: "🚲", name: "Vehicles" },
    { icon: "📱", name: "Electronics" }
];

// ============================================
// SECTION 2: STATE (App Memory)
// ============================================

let cart = [];
let currentTab = "grocery";
let currentPage = "homePage";

// ============================================
// SECTION 3: INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // TODO: Load cart from localStorage
    // TODO: Call your render functions here
    console.log("App initialized!");
});

// ============================================
// SECTION 4: NAVIGATION (Switch Pages)
// ============================================

function navigateTo(pageId) {
    // TODO:
    // 1. Hide ALL pages (remove "active" class from all .page elements)
    // 2. Show the target page (add "active" class to pageId)
    // 3. Update currentPage variable
    // 4. Scroll to top: window.scrollTo(0, 0)
    // 5. Update bottom nav highlight (call updateBottomNav)
    // 6. Show/hide bottom nav (hide on checkout, success, track pages)
    console.log("Navigating to:", pageId);
}

function updateBottomNav() {
    // TODO: Highlight correct nav item based on currentPage
    console.log("Update bottom nav");
}

function goToRentals() {
    // TODO: Navigate to homePage + switch tab to "rental"
    console.log("Go to rentals");
}

// ============================================
// SECTION 5: TAB SWITCHING
// ============================================

function switchTab(tabName) {
    // TODO:
    // 1. Update currentTab variable
    // 2. Toggle "active" class on tab buttons
    // 3. Show/hide groceryView and rentalView
    console.log("Switched to tab:", tabName);
}

// ============================================
// SECTION 6: RENDER FUNCTIONS
// ============================================

function renderGroceryCategories() {
    const container = document.getElementById("groceryCategories");
    // TODO: Loop groceryCategories, create HTML, set innerHTML
    console.log("Render grocery categories");
}

function renderRentalCategories() {
    const container = document.getElementById("rentalCategories");
    // TODO: Same pattern for rentals
    console.log("Render rental categories");
}

function renderGroceryProducts(products) {
    const container = document.getElementById("groceryGrid");
    // TODO:
    // 1. Loop products array
    // 2. Check if in cart (cart.find(...))
    // 3. Create product card HTML
    // 4. Show qty-control if in cart, else ADD button
    // 5. Set container.innerHTML
    console.log("Render grocery products:", products.length);
}

function renderRentalProducts(products) {
    const container = document.getElementById("rentalGrid");
    // TODO: Same pattern for rental cards with duration select
    console.log("Render rental products:", products.length);
}

function renderEssentials() {
    const container = document.getElementById("essentialsGrid");
    // TODO: Show first 4 grocery products
    console.log("Render essentials");
}

// ============================================
// SECTION 7: CART LOGIC
// ============================================

function addToCart(productId) {
    // TODO:
    // 1. Find product in groceryProducts
    // 2. Check if already in cart
    // 3. If yes: qty++, if no: push with qty:1, type:"grocery"
    // 4. saveCart(), updateCartUI(), refreshAllViews(), showToast()
    console.log("Add to cart:", productId);
}

function addRentalToCart(productId) {
    // TODO:
    // 1. Find product, get duration from select
    // 2. Calculate price with discounts (3mo:5%, 6mo:10%, 12mo:15%)
    // 3. Push with type:"rental", duration, finalPrice
    // 4. save, update, refresh, toast
    console.log("Add rental to cart:", productId);
}

function updateQty(productId, change) {
    // TODO: Find item, update qty, remove if <=0, save, update, refresh
    console.log("Update qty:", productId, change);
}

function removeFromCart(productId) {
    // TODO: Remove item completely
    console.log("Remove from cart:", productId);
}

function updateCartUI() {
    // TODO:
    // 1. Calculate total items
    // 2. Update badge, cart count
    // 3. Show empty state or cart items + summary
    // 4. Calculate totals (itemTotal + 5 platform fee)
    // 5. Update checkout totals too
    console.log("Cart updated");
}

function saveCart() {
    // TODO: localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
    // TODO: const saved = localStorage.getItem("cart"); if(saved) cart = JSON.parse(saved)
}

// ============================================
// SECTION 8: SEARCH
// ============================================

function handleSearch(query) {
    // TODO: Filter products by name, re-render
    console.log("Search:", query);
}

function filterByCategory(categoryName) {
    // TODO: Filter by category, show toast
    console.log("Filter by category:", categoryName);
}

// ============================================
// SECTION 9: CHECKOUT
// ============================================

function selectPayment(element, method) {
    // TODO: Remove active from all, add to clicked
    console.log("Payment selected:", method);
}

function placeOrder(event) {
    // TODO:
    // 1. event.preventDefault()
    // 2. Get address, phone, validate
    // 3. Generate order ID: Math.floor(100000 + Math.random() * 900000)
    // 4. Show on success page, clear cart, navigate
    console.log("Placing order...");
}

// ============================================
// SECTION 10: TRACKING
// ============================================

function renderTrackingTimeline() {
    const container = document.getElementById("orderTimeline");
    // TODO: Create 4 timeline steps (completed, completed, active, pending)
    console.log("Render tracking timeline");
}

// ============================================
// SECTION 11: UTILITIES
// ============================================

function showToast(message) {
    // TODO: Show toast for 2 seconds then hide
    console.log("Toast:", message);
}

function changeLocation() {
    // TODO: Prompt for location, update text, toast
    console.log("Change location");
}

function refreshAllViews() {
    // TODO: Call all render functions
    console.log("All views refreshed");
}
