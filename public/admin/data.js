// Dữ liệu sản phẩm
let products = [
    {
        id: '1',
        name: 'Áo thun nam',
        price: 250000,
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
        description: 'Áo thun cotton cao cấp',
        sizes: ['S', 'M', 'L']
    },
    {
        id: '2', 
        name: 'Quần jeans nữ',
        price: 450000,
        image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg',
        description: 'Quần jeans dáng slimfit',
        sizes: ['28', '30', '32']
    }
];

// Dữ liệu đơn hàng
let orders = [
    {
        id: 'ORD101',
        customer: 'Nguyễn Văn A',
        total: 1500000,
        date: '2023-10-05',
        status: 'Đã giao'
    },
    {
        id: 'ORD102',
        customer: 'Trần Thị B',
        total: 850000,
        date: '2023-10-04',
        status: 'Đang vận chuyển'
    },
    {
        id: 'ORD103',
        customer: 'Lê Văn C',
        total: 3200000,
        date: '2023-10-03',
        status: 'Chờ xác nhận'
    }
];

// Hàm quản lý sản phẩm
function getProducts() {
    return products;
}

function addProduct(product) {
    const newId = (products.length + 1).toString();
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, updatedProduct) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return true;
    }
    return false;
}

function deleteProduct(id) {
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    return products.length !== initialLength;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

// Hàm quản lý đơn hàng
function getOrders() {
    return orders;
}

function addOrder(order) {
    const newId = 'ORD' + (orders.length + 100);
    const newOrder = { ...order, id: newId };
    orders.push(newOrder);
    return newOrder;
}

// Xuất các hàm
export {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getOrders,
    addOrder
};