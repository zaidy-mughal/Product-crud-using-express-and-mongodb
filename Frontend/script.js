document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const main_url = 'http://localhost:3000';

    // Fetch and display products
    async function fetchproducts() {
        const response = await fetch(`${main_url}/products`);
        const products = await response.json();
        
        productList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <button class="edit" onclick="editproduct('${product._id}')">Edit</button>
                    <button class="delete" onclick="deleteproduct('${product._id}')">Delete</button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    // Submit form
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('productId').value;
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        const productData = { name, quantity, price };

        try {
            if (productId) {
                // Update existing product
                await fetch(`${main_url}/products/${productId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            } else {
                // Create new product
                await fetch(`${main_url}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            }
            
            fetchproducts();
            form.reset();
            document.getElementById('productId').value = '';
            cancelEditBtn.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Edit product
    window.editproduct = async (id) => {
        try {
            const response = await fetch(`${main_url}/products/${id}`);
            const product = await response.json();
            
            document.getElementById('productId').value = product._id;
            document.getElementById('name').value = product .name;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('price').value = product.price;
            cancelEditBtn.style.display = 'inline';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Delete product
    window.deleteproduct  = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`${main_url}/products/${id}`, { method: 'DELETE' });
                fetchproducts();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('productId').value = '';
        cancelEditBtn.style.display = 'none';
    });

    // Initial fetch
    fetchproducts();
});