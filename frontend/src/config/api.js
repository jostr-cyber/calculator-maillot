// API configuration
// Uses Vercel serverless functions or custom backend URL

const API_BASE_URL = import.meta.env.VITE_API_URL || (
  // Development: use localhost backend
  import.meta.env.DEV ? 'http://localhost:8000' :
  // Production: use Vercel API routes (no prefix needed, same origin)
  ''
)

export default API_BASE_URL
