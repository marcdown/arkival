var ipfsClient = require('ipfs-http-client');

// Local daemon
//var ipfs = ipfsClient({ host: 'localhost', port: '5001', protocol: 'http' });

// Infura daemon
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export default ipfs
