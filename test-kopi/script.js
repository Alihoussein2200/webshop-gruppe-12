const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.querySelector('.cart-list');
const total = document.querySelector('.total-price');
const removeAllBtn = document.querySelector('.remove-all');
let cartItems = [];

function updateCart() {
  cartList.innerHTML = '';
  let totalPrice = 0;
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.quantity}x ${item.name} - ${item.price} DKK`;
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.setAttribute('data-product-id', item.id);
    removeButton.textContent = 'Remove';
    li.appendChild(removeButton);
    cartList.appendChild(li);
    totalPrice += item.quantity * item.price;
  });
  total.innerHTML = `${totalPrice} DKK`;
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const productName = button.parentElement.querySelector('h2').textContent;
    const productPrice = parseInt(button.parentElement.querySelector('.price').textContent.match(/\d+/)[0]);
    const productQuantity = parseInt(button.parentElement.querySelector('input[type=number]').value);
    
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex === -1) {
      cartItems.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: productQuantity
      });
    } else {
      cartItems[itemIndex].quantity += productQuantity;
    }

    updateCart();
  });
});

function removeFromCart(productId) {
  const itemIndex = cartItems.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
  }
}

cartList.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    const productId = event.target.dataset.productId;
    removeFromCart(productId);
  }
});

removeAllBtn.addEventListener('click', () => {
  cartItems = [];
  updateCart();
});

document.querySelector('.checkout').addEventListener('click', () => {
  alert('Thank you for your purchase!');
  cartItems = [];
  updateCart();
});


