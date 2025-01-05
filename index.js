const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS for all routes (if needed for frontend requests)
app.use(cors());
// app.use(cors({ origin: 'https://hackfront-zq4s.onrender.com' }));
// Proxy setup
app.use(
  '/api', // Proxy requests starting with '/api'
  createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com', // API endpoint
    changeOrigin: true, // Changes the origin of the host header to the target URL
    pathRewrite: { '^/api': '' }, // Remove '/api' prefix when forwarding to the target
  })
);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
