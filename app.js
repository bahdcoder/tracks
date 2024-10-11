const http = require("http")
const url = require("url")
const fs = require("fs")
const path = require("path")

// Create a 1x1 transparent PNG buffer
const onePxPngBuffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49,
  0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06,
  0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44,
  0x41, 0x54, 0x78, 0xda, 0x63, 0x60, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xe2,
  0x21, 0xbc, 0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
  0x60, 0x82,
])

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress

  // Log all headers, IP address, and method
  console.log("Request Headers:", req.headers)
  console.log("Request URL", parsedUrl)
  console.log("IP Address:", ipAddress)
  console.log("Method:", req.method)

  if (parsedUrl.pathname === "/clicks") {
    // Log additional user info if available
    console.log("User Info:", req.headers["user-agent"])

    // Redirect to google.com
    res.writeHead(302, { Location: "https://www.google.com" })
    res.end()
  } else if (parsedUrl.pathname === "/opens") {
    // Log additional user info if available
    console.log("User Info:", req.headers["user-agent"])

    // Serve the 1x1 transparent PNG
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": onePxPngBuffer.length,
    })
    res.end(onePxPngBuffer)
  } else {
    // Handle unknown endpoints
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Endpoint not found")
  }
})

// Start server on port 3000
server.listen(process.env.PORT || 4444, () => {
  console.log("Server is running on http://localhost:4444")
})
