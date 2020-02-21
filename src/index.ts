console.log('[index.js] Index file loaded');
import Server from './server';

const server = new Server(5000);
server.start();