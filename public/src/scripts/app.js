document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Toggle menu icon between bars and times
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Cart functionality
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get all product info from data attributes
            const product = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: parseInt(this.dataset.productPrice),
                image: this.dataset.productImage,
                quantity: parseInt(this.dataset.productQuantity) || 1
            };

            // Add to cart using Cart class
            cart.addItem(product);

            // Add visual feedback
            this.classList.add('animate-ping');
            setTimeout(() => this.classList.remove('animate-ping'), 500);
        });
    });

    // Search functionality
    const searchButton = document.querySelector('.search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                alert(`Đang tìm kiếm: ${searchInput.value}`);
            }
        });
    }
});
