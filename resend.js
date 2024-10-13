const { Resend } = require("resend")
const resend = new Resend("re_K92UhRNx_JsuX3Kew4LXjeecrBoFSGE9c")

resend.emails
  .send({
    from: "Frantz Kati <bahdcoder@pangaso.katifrantz.com>",
    to: ["frantz.kati@icloud.com"],
    subject: "hello world",
    html: "<strong>Hello</strong> dear Resend user. Read this email in your spare time: <a href='https://tracks-production-bbb9.up.railway.app/clicks'>Campaign information</a> <img src='https://tracks-production-bbb9.up.railway.app/opens' width='1' height='1' />",
  })
  .then(({ data, error }) => {
    console.log({ data, error })
  })
  .catch(console.error)
