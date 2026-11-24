import nextra from 'nextra'

const withNextra = nextra({
  // ... Other Nextra config options
})

// No other site may frame the docs (clickjacking); the CRM opens them in a new tab, never in an iframe.
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

export default withNextra({
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
})
