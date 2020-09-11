require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.get('/loaderio-f0cfcb86c0120af25839d00359edf74e', (req, res) => {
  res.send('loaderio-f0cfcb86c0120af25839d00359edf74e');
});

app.use('/:id', express.static('public'));

// Photo Carousel
app.use('/restaurant/:id', createProxyMiddleware({ target: 'http://54.193.61.185:3001', changeOrigin: true }));

// // Info Sidebar
app.use('/:copyId/restaurants/:id', createProxyMiddleware({ target: 'http://3.101.107.222:3002', changeOrigin: true }));

// // Tips & Recommendations
app.use('/api/tips/:id', createProxyMiddleware({ target: 'http://3.22.130.18', changeOrigin: true }));
app.use('/api/articles/:id', createProxyMiddleware({ target: 'http://3.22.130.18', changeOrigin: true }));

// // Similar Restaurants
app.use('/restaurants/:id', createProxyMiddleware({ target: 'http://3.17.70.45:3004', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});