// Mock data - sẽ thay bằng API thực tế
let products = [
    {
        id: '1',
        name: 'Áo thun nam',
        price: 250000,
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg'
    },
    {
        id: '2', 
        name: 'Quần jeans nữ',
        price: 450000,
        image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderProductTable();
    setupFormSubmit();
});

function renderProductTable() {
    const tableBody = document.getElementById('productTable');
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toLocaleString()}đ</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${product.image}" alt="${product.name}" class="h-10 w-10 rounded-full">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="showEditModal('${product.id}')" class="text-yellow-600 hover:text-yellow-900 mr-3">Sửa</button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-900">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function setupFormSubmit() {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProduct();
    });
}

function showAddModal() {
    document.getElementById('modalTitle').textContent = 'Thêm sản phẩm mới';
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productModal').classList.remove('hidden');
}

function showEditModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalTitle').textContent = 'Sửa sản phẩm';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productModal').classList.remove('hidden');
}

function hideModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;

    if (!name || !price || !image) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (id) {
        // Update existing product
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { id, name, price, image };
        }
    } else {
        // Add new product
        const newId = (products.length + 1).toString();
        products.push({ id: newId, name, price, image });
    }

    hideModal();
    renderProductTable();
}

function deleteProduct(productId) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== productId);
        renderProductTable();
    }
}