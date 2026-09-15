import http from 'http';

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the home page!');
    return;
  }

  if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the about page.');
    return;
  }

  if (url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the contact page.');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});