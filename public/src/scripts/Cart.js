class Cart {
  constructor() {
    this.cartKey = 'shopping_cart';
    this.initCart();
    this.addCSSAnimation();
  }

  addCSSAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ping {
        75%, 90% {
          transform: scale(1.1);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
        }
      }
      .animate-ping {
        animation: ping 0.6s cubic-bezier(0, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize cart if not exists
  initCart() {
    if (!localStorage.getItem(this.cartKey)) {
      localStorage.setItem(this.cartKey, JSON.stringify([]));
    }
  }

  // Get all cart items
  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey)) || [];
  }

  // Save cart to localStorage
  saveCart(cart) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  // Add item to cart
  addItem(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }

    this.saveCart(cart);
  }

  // Remove item from cart
  removeItem(productId) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  // Update item quantity
  updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      item.quantity = newQuantity;
      this.saveCart(cart);
    }
  }

  // Clear cart
  clearCart() {
    this.saveCart([]);
  }

  // Calculate total items count
  getTotalItems() {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate total price
  getTotalPrice() {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Update cart count in UI
  updateCartCount() {
    const totalItems = this.getTotalItems();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = totalItems;
    });
  }

  // Render cart items to specified container
  renderCartItems(containerId) {
    const container = document.getElementById(containerId);
    const cart = this.getCart();

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <img src="https://images.pexels.com/photos/3768199/pexels-photo-3768199.jpeg" 
               class="w-32 mx-auto mb-4 rounded-lg" 
               alt="Empty cart">
          <p class="text-gray-500">Giỏ hàng của bạn đang trống</p>
          <a href="/shop.html" class="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Tiếp tục mua sắm
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="cart-item bg-white p-4 mb-4 rounded-lg shadow flex items-start">
        <img src="${item.image || 'https://images.pexels.com/photos/3761500/pexels-photo-3761500.jpeg'}" 
             alt="${item.name}" 
             class="w-20 h-20 object-cover rounded mr-4">
        <div class="flex-1">
          <div class="flex justify-between">
            <h3 class="font-medium">${item.name}</h3>
            <button class="text-red-500 hover:text-red-700" 
                    onclick="cart.removeItem('${item.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <p class="text-gray-600 my-1">${item.price.toLocaleString()}đ</p>
          <div class="flex items-center mt-2">
            <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-l" 
                    onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">
              -
            </button>
            <span class="quantity-display px-3 border-t border-b">${item.quantity}</span>
            <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-r" 
                    onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">
              +
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Add total price display
    container.innerHTML += `
      <div class="cart-total bg-white p-4 rounded-lg shadow mt-4">
        <div class="flex justify-between items-center">
          <span class="font-semibold">Tổng cộng:</span>
          <span class="text-xl font-bold text-red-500">
            ${this.getTotalPrice().toLocaleString()}đ
          </span>
        </div>
        <button id="checkout-btn" 
                class="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Thanh toán
        </button>
      </div>
    `;
  }
}

// Initialize global cart instance
const cart = new Cart();

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  cart.updateCartCount();
  
  // Auto render cart if container exists
  if (document.getElementById('cart-items')) {
    cart.renderCartItems('cart-items');
  }
});