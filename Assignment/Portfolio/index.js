import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());

let products = JSON.parse(fs.readFileSync('./product.json', 'utf-8'));

// GET: fetch all products
app.get('/products', (req, res) => {
    res.json(products);
});

// POST: create a new product
app.post('/products', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    };

    products.push(product);

    fs.writeFileSync(
        './product.json',
        JSON.stringify(products, null, 2)
    );

    res.json(product);
});

// PUT: update product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock ?? product.stock;

    fs.writeFileSync(
        './product.json',
        JSON.stringify(products, null, 2)
    );

    res.json(product);
});

// DELETE: delete product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const productExists = products.some(p => p.id === productId);

    if (!productExists) {
        return res.status(404).send('Product not found');
    }

    products = products.filter(p => p.id !== productId);

    fs.writeFileSync(
        './product.json',
        JSON.stringify(products, null, 2)
    );

    res.send('Product deleted successfully');
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});