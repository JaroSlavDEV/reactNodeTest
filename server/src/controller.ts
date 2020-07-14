import { createServer, IncomingMessage, ServerResponse } from 'http';
const url = require('url');

module.exports = createServer((req: IncomingMessage, res: ServerResponse) => {
  const service = require('./service.ts');
  const reqUrl = url.parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', 'authorization');

  if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

  // POSTS
  // GET Endpoint
  if (reqUrl.pathname == '/posts' && req.method === 'GET') {
    service.getPostsRequest(req, res);
  }

  // DELETE Endpoint
  if (reqUrl.pathname == '/posts' && req.method === 'DELETE') {
    service.deletePostRequest(req, res);
  }

  // POST Endpoint
  if (reqUrl.pathname == '/signin' && req.method === 'POST') {
    service.signInRequest(req, res);
  }
  
  if (reqUrl.pathname == '/validate' && req.method === 'GET') {
    service.validateRequest(req, res);
  }
});
