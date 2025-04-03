class ProductDetail {
  constructor() {
    this.productId = this.getProductIdFromURL();
    this.initElements();
    this.loadProductData();
    this.setupEventListeners();
  }

  // Lấy product ID từ URL
  getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product');
  }

  // Khởi tạo các DOM elements
  initElements() {
    this.elements = {
      productName: document.getElementById('product-name'),
      productPrice: document.getElementById('product-price'),
      originalPrice: document.getElementById('original-price'),
      productDescription: document.getElementById('product-description'),
      productImages: document.querySelector('.product-images'),
      addToCartBtn: document.querySelector('.add-to-cart'),
      quantityInput: document.getElementById('quantity'),
      sizeSelect: document.getElementById('size-select'),
      relatedProducts: document.querySelector('.related-products')
    };
  }

  // Load dữ liệu sản phẩm (mock data - có thể thay bằng API thực tế)
  loadProductData() {
    if (!this.productId) {
      this.showError('Không tìm thấy sản phẩm');
      return;
    }

    // Mock product data
    const products = {
      'ao-thun-1': {
        name: 'Áo Thun Cổ Tròn',
        price: 350000,
        originalPrice: 450000,
        description: 'Áo thun cotton mềm mại, co giãn tốt, thoáng mát.',
        images: [
          'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
          'https://images.pexels.com/photos/1021291/pexels-photo-1021291.jpeg',
          'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg'
        ],
        sizes: ['S', 'M', 'L'],
        related: ['quan-jeans-1', 'ao-khoac-1']
      },
      'quan-jeans-1': {
        name: 'Quần Jeans Nam',
        price: 550000,
        originalPrice: 650000,
        description: 'Quần jeans dáng slimfit cao cấp, bền đẹp.',
        images: [
          'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg',
          'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
        ],
        sizes: ['28', '30', '32'],
        related: ['ao-thun-1', 'ao-khoac-1']
      }
    };

    const product = products[this.productId];
    if (!product) {
      this.showError('Sản phẩm không tồn tại');
      return;
    }

    this.renderProductDetails(product);
    this.renderRelatedProducts(product.related, products);
  }

  // Hiển thị chi tiết sản phẩm
  renderProductDetails(product) {
    this.elements.productName.textContent = product.name;
    this.elements.productPrice.textContent = `${product.price.toLocaleString()}đ`;
    this.elements.originalPrice.textContent = `${product.originalPrice.toLocaleString()}đ`;
    this.elements.productDescription.textContent = product.description;

    // Render hình ảnh
    this.elements.productImages.innerHTML = product.images.map(img => `
      <div class="product-image">
        <img src="${img}" alt="${product.name}" class="w-full h-64 object-cover rounded">
      </div>
    `).join('');

    // Render size options
    this.elements.sizeSelect.innerHTML = product.sizes.map(size => `
      <option value="${size}">${size}</option>
    `).join('');

    // Set data attributes cho nút thêm vào giỏ
    this.elements.addToCartBtn.dataset.productId = this.productId;
    this.elements.addToCartBtn.dataset.productName = product.name;
    this.elements.addToCartBtn.dataset.productPrice = product.price;
    this.elements.addToCartBtn.dataset.productImage = product.images[0];
  }

  // Hiển thị sản phẩm liên quan
  renderRelatedProducts(relatedIds, allProducts) {
    const relatedProducts = relatedIds.map(id => allProducts[id]);
    this.elements.relatedProducts.innerHTML = relatedProducts.map(product => `
      <div class="related-product">
        <a href="product-detail.html?product=${this.productId}">
          <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover rounded">
          <h3 class="text-lg font-medium mt-2">${product.name}</h3>
          <p class="text-red-500 font-bold">${product.price.toLocaleString()}đ</p>
        </a>
      </div>
    `).join('');
  }

  // Thiết lập event listeners
  setupEventListeners() {
    // Xử lý thêm vào giỏ hàng
    this.elements.addToCartBtn.addEventListener('click', () => {
      const product = {
        id: this.elements.addToCartBtn.dataset.productId,
        name: this.elements.addToCartBtn.dataset.productName,
        price: parseInt(this.elements.addToCartBtn.dataset.productPrice),
        image: this.elements.addToCartBtn.dataset.productImage,
        quantity: parseInt(this.elements.quantityInput.value),
        size: this.elements.sizeSelect.value
      };

      cart.addItem(product);
      this.showAddToCartSuccess();
    });

    // Xử lý click hình ảnh để xem lớn
    this.elements.productImages.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        this.showImageModal(e.target.src);
      }
    });
  }

  // Hiển thị thông báo lỗi
  showError(message) {
    document.querySelector('main').innerHTML = `
      <div class="container mx-auto px-4 py-12 text-center">
        <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold mb-2">${message}</h2>
        <a href="/shop.html" class="inline-block mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Quay lại cửa hàng
        </a>
      </div>
    `;
  }

  // Hiển thị thông báo thêm vào giỏ thành công
  showAddToCartSuccess() {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg flex items-center';
    toast.innerHTML = `
      <i class="fas fa-check-circle mr-2"></i>
      Đã thêm vào giỏ hàng
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Hiển thị modal hình ảnh lớn
  showImageModal(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="relative max-w-4xl w-full">
        <img src="${imageUrl}" class="w-full max-h-screen object-contain">
        <button class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">
          &times;
        </button>
      </div>
    `;
    
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.product-detail-page')) {
    new ProductDetail();
  }
});