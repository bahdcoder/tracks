const { Hono } = require("hono")
const { serve } = require("@hono/node-server")
const { getConnInfo } = require("@hono/node-server/conninfo")
// Create a 1x1 transparent PNG buffer
const onePxPngBuffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49,
  0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06,
  0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44,
  0x41, 0x54, 0x78, 0xda, 0x63, 0x60, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xe2,
  0x21, 0xbc, 0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
  0x60, 0x82,
])

const app = new Hono()

function logCtx(ctx) {
  console.log("----> url", ctx.req.url)
  console.log("----> conn", getConnInfo(ctx))
  console.log("----> uagent", ctx.req.header("User-Agent"))
  console.log("----> headers", ctx.req.header())
}

app.get("/clicks", function (ctx) {
  logCtx(ctx)

  return ctx.redirect("https://google.com")
})

app.get("/opens", function (ctx) {
  logCtx(ctx)
  const headers = new Headers()

  headers.set("Content-Type", "image/png")
  headers.set("Content-Length", onePxPngBuffer.length.toString())

  return new Response(onePxPngBuffer, {
    headers,
  })
})

serve(
  {
    fetch: app.fetch,
    port: process.env.PORT || 4444,
  },
  ({ address, port }) => {
    console.log(`Server is running on http://${address}:${port}`)
  }
)
