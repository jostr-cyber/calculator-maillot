// API configuration
// This allows the frontend to use different API URLs in different environments

const API_BASE_URL = import.meta.env.VITE_API_URL || (
  // Development: use proxy or localhost
  import.meta.env.DEV ? 'http://localhost:8000' :
  // Production: use environment variable or root-relative path
  '/api'
)

export default API_BASE_URL
