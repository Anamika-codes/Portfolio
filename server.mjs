const http = import('http').then(m=>m.createServer);
const fs = import('fs').then(m=>m.default || m);
const path = import('path').then(m=>m.default || m);
const {fileURLToPath} = await import('url');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = (await http)((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p === '/') p = '/index.html';
  const fp = path.join(__dirname, 'dist', p.replace(/^\//,''));
  (await fs).readFile(fp,(e,d)=>{
    if(e){res.writeHead(404);res.end();return;}
    const ext = path.extname(fp).toLowerCase();
    let ct = 'text/html';
    if(ext==='.js') ct='text/javascript';
    if(ext==='.css') ct='text/css';
    if(ext==='.svg') ct='image/svg+xml';
    if(ext==='.jpg') ct='image/jpeg';
    if(ext==='.png') ct='image/png';
    if(ext==='.json') ct='application/json';
    if(ext==='.txt') ct='text/plain';
    res.writeHead(200,{'Content-Type':ct});
    res.end(d);
  });
});
server.listen(5179,'127.0.0.1');
