// ===========================
// Authentication Management
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  // If a user is logged in, update the auth link and load the cart
  const authLink = document.getElementById("authLink");
if (localStorage.getItem("loggedInUser")) {
  authLink.textContent = "Logout";
  authLink.href = "#";
  authLink.onclick = function () {
    // Ask for confirmation before logging out
    if (!confirm("Are you sure you want to logout?")) {
      return false; // Cancel logout if user clicks Cancel
    }
    // Proceed with logout if confirmed
    var currentUser = localStorage.getItem("loggedInUser");
    if (currentUser) {
      localStorage.setItem("cart_" + currentUser, localStorage.getItem("cart") || "[]");
      localStorage.setItem("orders_" + currentUser, localStorage.getItem("orders") || "[]");
    }
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    alert("Logged out successfully!");
    window.location.href = "login.html";
    return false;
  };
}
  updateCartDisplay();
});

// ===========================
// Hero Slider Functionality
// ===========================
let currentSlide = 0;
const heroSlider = document.getElementsByClassName("hero-slider")[0];
const slides = heroSlider.getElementsByClassName("carousel-item");
const totalSlides = slides.length;
let sliderInterval;

function changeSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add("active");
}

function startSlider() {
  sliderInterval = setInterval(changeSlide, 5000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

window.onload = startSlider;

// ===========================
// Showcase
// ===========================
let currentShowcase = 0;
const showcaseItems = document.getElementsByClassName("showcase-item");
const totalShowcases = showcaseItems.length;

function rotateShowcase(direction) {
  showcaseItems[currentShowcase].classList.remove("active");
  currentShowcase =
    direction === "next"
      ? (currentShowcase + 1) % totalShowcases
      : (currentShowcase - 1 + totalShowcases) % totalShowcases;
  showcaseItems[currentShowcase].classList.add("active");
}

// ===========================
// Scroll Effects & Smooth Scrolling
// ===========================
function handleScroll() {
  // Get the navbar using getElementsByClassName (returns an HTMLCollection)
  const navbar = document.getElementsByClassName("navbar")[0];
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  revealElements();
}

function revealElements() {
  // Get collections of elements for both classes
  const philosophyItems = document.getElementsByClassName("philosophy-item");
  const experienceCards = document.getElementsByClassName("experience-card");

  // Combine both collections into a single array
  const elements = [];
  for (let i = 0; i < philosophyItems.length; i++) {
    elements.push(philosophyItems[i]);
  }
  for (let i = 0; i < experienceCards.length; i++) {
    elements.push(experienceCards[i]);
  }

  const windowHeight = window.innerHeight;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      element.classList.add("active");
    }
  }
}
window.onscroll = handleScroll;

// ===========================
// Section Display Management
// ===========================

function showSection(sectionId) {
  var sections = document.getElementsByTagName("section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  
  var sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.style.display = "block";
  }

  // If products section is opened, show all products
  if (sectionId === "productsSection") {
    filterProducts('ALL');  // Call the function to show all cakes
  }

  // If checkout section is opened, update the summary dynamically.
  if (sectionId === "checkoutSection") {
    updateCheckoutSummary();
  }
}

// ===========================
// Map Display Functionality
// ===========================

const locations = {
  map1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467073.9123805248!2d72.332771734232!3d23.03050554239645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84d4f0a7cf9b%3A0x5fa5e4e5a1f8f8f!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
  map2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467076.1216472588!2d72.31654675681265!3d23.02045572356033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84d5cfb8f8ff%3A0x123456789abcdef!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1610001234567!5m2!1sen!2sin",
};

function showMapWithElement(mapId, element) {
  document.getElementById("branchMap").src = locations[mapId];
  var locationCards = document.getElementsByClassName("location-card");
  for (var i = 0; i < locationCards.length; i++) {
    locationCards[i].classList.remove("active");
  }
  element.classList.add("active");
}

// ===========================
// Cart Functionality
// ===========================

const productData = [
  {
    id: 1,
    name_of_cake: "Chocolate Euphoria",
    img_src: "image/about.png",
    type: "BIRTHDAY",
    price: 400,
    rating: 4.5,
    about: "A decadent blend of rich chocolate and velvety cream.",
  },
  {
    id: 2,
    name_of_cake: "Berry Bliss",
    img_src: "image/c1.png",
    type: "WEDDING",
    price: 500,
    rating: 4.0,
    about: "Fresh berries and a delicate sponge create a dreamy delight.",
  },
  {
    id: 3,
    name_of_cake: "Velvet Dream",
    img_src: "image/banner.png",
    type: "CUPCAKE",
    price: 600,
    rating: 4.2,
    about: "Light, airy cupcakes topped with smooth buttercream.",
  },
  {
    id: 4,
    name_of_cake: "Delight Donut",
    img_src: "image/c4.png",
    type: "DONUTS",
    price: 700,
    rating: 3.8,
    about: "Crunchy on the outside and soft on the inside, a treat to savor.",
  },
  {
    id: 5,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
  {
    id: 6,
    name_of_cake: "Elegant Wedding",
    img_src: "image/c1.png",
    type: "WEDDING",
    price: 1000,
    rating: 4.6,
    about: "Exquisite design meets sumptuous taste for your special day.",
  },
  // ... additional products as needed ...
  {
    id: 7,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
  {
    id: 8,
    name_of_cake: "Delight Donut",
    img_src: "image/c4.png",
    type: "DONUTS",
    price: 700,
    rating: 3.8,
    about: "Crunchy on the outside and soft on the inside, a treat to savor.",
  },
  {
    id: 9,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
  {
    id: 10,
    name_of_cake: "Elegant Wedding",
    img_src: "image/c1.png",
    type: "WEDDING",
    price: 1000,
    rating: 4.6,
    about: "Exquisite design meets sumptuous taste for your special day.",
  },
  // ... additional products as needed ...
  {
    id: 11,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
  {
    id: 12,
    name_of_cake: "Delight Donut",
    img_src: "image/c4.png",
    type: "DONUTS",
    price: 700,
    rating: 3.8,
    about: "Crunchy on the outside and soft on the inside, a treat to savor.",
  },
  {
    id: 3,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
  {
    id: 14,
    name_of_cake: "Elegant Wedding",
    img_src: "image/c1.png",
    type: "WEDDING",
    price: 1000,
    rating: 4.6,
    about: "Exquisite design meets sumptuous taste for your special day.",
  },
  // ... additional products as needed ...
  {
    id: 15,
    name_of_cake: "Sweet Birthday",
    img_src: "image/c5.png",
    type: "BIRTHDAY",
    price: 750,
    rating: 4.1,
    about: "A festive cake bursting with flavor to celebrate your day.",
  },
];

// global cart variable
var cart = [];
function toggleCartSidebar() {
  var sidebar = document.getElementById("cartSidebar");
  if (sidebar.style.transform === "translateX(0%)") {
    sidebar.style.transform = "translateX(100%)";
  } else {
    sidebar.style.transform = "translateX(0%)";
  }
}

function addToCart(productId) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("Please login before purchasing!");
    window.location.href = "login.html";
    return;
  }
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = productData.find(function (p) {
    return p.id === productId;
  });
  if (!product) return;
  const existingItem = cart.find(function (item) {
    return item.id === productId;
  });
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name_of_cake,
      price: product.price,
      quantity: 1,
      img: product.img_src,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cart_" + loggedInUser, JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  var item = cart.find(function (item) {
    return item.id === productId;
  });
  if (item) {
    item.quantity = Math.max(1, newQuantity);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function calculateSubtotal() {
  return cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
}

function updateCartDisplay() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateSidebarCart();
  updateMainCart();
  updateCartCounter();
}

function updateCartCounter() {
  var totalItems = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  var counters = document.getElementsByClassName("cart-counter");
  for (var i = 0; i < counters.length; i++) {
    counters[i].textContent = totalItems;
  }
}

function updateSidebarCart() {
  var container = document.getElementById("cart-items");
  renderCartItems(container, true);

  var sidebar = document.getElementById("cartSidebar");
  var subtotalElements = sidebar.getElementsByClassName("cartSubtotal");
  if (subtotalElements.length > 0) {
    subtotalElements[0].textContent = calculateSubtotal().toFixed(2);
  }

  // Assuming the <h5> is the first h5 element in the sidebar
  var h5Elements = sidebar.getElementsByTagName("h5");
  if (h5Elements.length > 0) {
    h5Elements[0].textContent =
      "Cart (" +
      cart.reduce(function (sum, item) {
        return sum + item.quantity;
      }, 0) +
      " items)";
  }
}

function updateMainCart() {
  var container = document.getElementById("mainCartItems");
  renderCartItems(container, false);

  var cartSection = document.getElementById("cartSection");
  var subtotalElements = cartSection.getElementsByClassName("cartSubtotal");
  if (subtotalElements.length > 0) {
    subtotalElements[0].textContent = calculateSubtotal().toFixed(2);
  }

  var totalElements = cartSection.getElementsByClassName("cartTotal");
  if (totalElements.length > 0) {
    totalElements[0].textContent = calculateSubtotal().toFixed(2);
  }
}

function renderCartItems(container, isSidebar) {
  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html += `
      <div class="${
        isSidebar
          ? "d-flex align-items-start cart-item-container"
          : "card cart-item-card mb-3 p-3 cart-item-container"
      }">
        <img src="${item.img}" alt="${
      item.name
    }" class="rounded me-3" style="width:80px; height:80px; object-fit:cover;">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h${isSidebar ? "6" : "5"} class="mb-0">${item.name}</h${
      isSidebar ? "6" : "5"
    }>
            <button class="btn btn-sm btn-outline-secondary removeItemBtn" data-id="${
              item.id
            }" onclick="removeFromCart(${item.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div>₹${item.price.toFixed(2)}</div>
          <div class="input-group input-group-sm mt-2" style="max-width: 120px;">
            <button class="btn btn-outline-secondary decrementBtn" data-id="${
              item.id
            }" onclick="updateQuantity(${item.id}, ${
      item.quantity - 1
    })">-</button>
            <input type="text" class="form-control text-center quantityInput" value="${
              item.quantity
            }" data-product-id="${item.id}" readonly />
            <button class="btn btn-outline-secondary incrementBtn" data-id="${
              item.id
            }" onclick="updateQuantity(${item.id}, ${
      item.quantity + 1
    })">+</button>
          </div>
        </div>
        <div class="text-end ms-3" style="min-width: 100px;">
          <p class="mb-0 fw-bold" style="margin-top: 50px;">₹${(
            item.price * item.quantity
          ).toFixed(2)}</p>
        </div>
      </div>`;
  }
  container.innerHTML = html;
}

// ===========================
// Product Display and Pagination
// ===========================

function scrollCakeTypes(direction) {
  // Get the container using getElementsByClassName and assume the first element is desired
  const container = document.getElementsByClassName("cake-type-container")[0];
  const scrollAmount = 150;
  container.scrollLeft += direction * scrollAmount;
}

let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 6;

function renderProducts(products, page) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = products.slice(start, end);

  var productContainers = document.getElementsByClassName("product-container");
  if (productContainers.length === 0) return;
  var rowElements = productContainers[0].getElementsByClassName("row");
  if (rowElements.length === 0) return;
  const rowContainer = rowElements[0];

  // Clear any existing content
  rowContainer.innerHTML = "";
  if (productsToShow.length === 0) {
    rowContainer.innerHTML = '<div class="col-12">No products found.</div>';
    return;
  }
  for (let i = 0; i < productsToShow.length; i++) {
    const product = productsToShow[i];
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-4";
    colDiv.innerHTML =
      '<div class="flip-card">' +
        '<div class="flip-card-inner">' +
          '<div class="flip-card-front">' +
            '<div class="product-item">' +
              '<div class="product-image">' +
                '<img src="' + product.img_src + '" alt="' + product.name_of_cake + '">' +
              "</div>" +
              '<div class="product-content">' +
                '<div class="product-name">' + product.name_of_cake + "</div>" +
                '<div class="product_line"></div>' +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="flip-card-back">' +
            '<div class="back-content">' +
              '<h5 class="product-title-back">' + product.name_of_cake + "</h5>" +
              '<div class="rating"><i class="fas fa-star"></i> ' + product.rating + "</div>" +
              '<p class="product-about">' + product.about + "</p>" +
              '<div class="price-addtocart">' +
                '<span class="price">₹' + product.price + "</span>" +
                '<button class="btn-addtocart" onclick="addToCart(' + product.id + ')">Add to Cart</button>' +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    rowContainer.appendChild(colDiv);
  }
}

function renderPagination(totalPages, currentPage) {
  var paginationContainers = document.getElementsByClassName("pagination");
  if (paginationContainers.length === 0) return;
  var paginationContainer = paginationContainers[0];
  var html = "";

  // Previous button
  if (currentPage === 1) {
    html += '<li class="disabled"><a href="#">&lt;</a></li>';
  } else {
    html += '<li onclick="event.preventDefault(); changePage(' + (currentPage - 1) + ');"><a href="#">&lt;</a></li>';
  }

  // Page numbers
  for (var i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += '<li class="active" onclick="event.preventDefault(); changePage(' + i + ');"><a href="#">' + i + '</a></li>';
    } else {
      html += '<li onclick="event.preventDefault(); changePage(' + i + ');"><a href="#">' + i + '</a></li>';
    }
  }

  // Next button
  if (currentPage === totalPages) {
    html += '<li class="disabled"><a href="#">&gt;</a></li>';
  } else {
    html += '<li onclick="event.preventDefault(); changePage(' + (currentPage + 1) + ');"><a href="#">&gt;</a></li>';
  }
  paginationContainer.innerHTML = html;
}


function changePage(page) {
  currentPage = page;
  renderProducts(filteredProducts, currentPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  renderPagination(totalPages, currentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filterProducts(category) {
  // If the category is "ALL", use the complete productData array; otherwise, filter by type.
  if (category === "ALL") {
    filteredProducts = productData;
  } else {
    filteredProducts = productData.filter(function (product) {
      return product.type.toUpperCase() === category;
    });
  }
  // Reset to first page
  currentPage = 1;
  // Render the products and update pagination
  renderProducts(filteredProducts, currentPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  renderPagination(totalPages, currentPage);
  
  // Make sure the products section is visible
  pro=document.getElementById("productsSection");
  pro.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });}

// Update checkout summary without forEach and appendChild
function updateCheckoutSummary() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  var subtotal = calculateSubtotal();
  var shipping = 0;
  var total = subtotal + shipping;

  // Update summary fields directly via innerText/textContent
  document.getElementById("checkoutSubtotal").textContent = subtotal.toFixed(2);
  document.getElementById("checkoutShipping").textContent = shipping.toFixed(2);
  document.getElementById("checkoutTotal").textContent = total.toFixed(2);

  // Get the checkout items container
  var checkoutItemsContainer = document.getElementById("checkoutItems");
  var checkoutItemsHTML = ""; // Build the HTML string

  if (cart.length === 0) {
    checkoutItemsHTML = "<p>No items in your cart.</p>";
  } else {
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      checkoutItemsHTML += '<div class="checkout-item d-flex justify-content-between align-items-center mb-2">' +
                           '<span>' + item.name + ' (x' + item.quantity + ')</span>' +
                           '<span>₹' + (item.price * item.quantity).toFixed(2) + '</span>' +
                           '</div>';
    }
  }
  // Set the container's innerHTML once with the built string
  checkoutItemsContainer.innerHTML = checkoutItemsHTML;
}

function completeCheckout() {
  // Retrieve the cart (if any)
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before confirming your order.");
    return;
  }

  // Validate checkout form fields
  var fullName = document.getElementById("fullName").value.trim();
  var address = document.getElementById("address").value.trim();
  var city = document.getElementById("city").value.trim();
  var pincode = document.getElementById("pincode").value.trim();
  var phone = document.getElementById("phone").value.trim();

  if (!fullName || !address || !city || !pincode || !phone) {
    alert("Please fill in all required fields in the checkout form.");
    return;
  }

  // If validation passes, proceed with order confirmation
  alert("Thank you! Your order has been confirmed.");

  // Clear the cart and update display (if needed)
  localStorage.removeItem("cart");
  updateCartDisplay();

  // Optionally, redirect to home or an order confirmation page
  showSection("homeSection");
}
