const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.use('/:id', express.static('public'));

// Photo Carousel
app.use('/api/photos/:restaurantID', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Info Sidebar
app.use('/:copyId/restaurants/:id', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

// Tips & Recommendations
app.use('/api/tips/:id', createProxyMiddleware({ target: 'http://localhost:6070', changeOrigin: true }));
app.use('/api/articles/:id', createProxyMiddleware({ target: 'http://localhost:6070', changeOrigin: true }));

// Similar Restaurants
app.use('/restaurants/:id', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});