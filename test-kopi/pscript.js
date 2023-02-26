function checkout() {
  // Get cart items and total amount from localStorage
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  var totalAmount = localStorage.getItem("totalAmount");

  // Check if cart is not empty
  if (cartItems.length > 0) {
    // Save cart items and total amount to sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("totalAmount", totalAmount);

    // Navigate to payment.html
    window.location.href = "payment.html";
  } else {
    alert("Your cart is empty!");
  }
}


