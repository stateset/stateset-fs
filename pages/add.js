const IpfsHttpClient = require('ipfs-http-client')
const { globSource } = IpfsHttpClient
const ipfs = IpfsHttpClient({
    host: 'localhost',
    port: 5001,
    protocol: 'http',
  })

const file = await ipfs.add(globSource('./docs', { recursive: true }))
console.log(file)