import http from "http";

const navigation = `
	<nav>
		<a href="/">Home</a> |
		<a href="/home">Home Page</a> |
		<a href="/about">About</a>
	</nav>
`;

const page = (title, content) => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${title}</title>
	</head>
	<body>
		${navigation}
		${content}
	</body>
</html>`;

const server = http.createServer((req, res) => {
	let statusCode = 200;
	let body;

	switch (req.url) {
		case "/":
			body = page("Welcome to My College", "<h1>Welcome to My College</h1><p>Welcome to My College.</p>");
			break;
		case "/home":
			body = page("Home Page", "<h1>Home Page</h1><p>Welcome to the college home page.</p>");
			break;
		case "/about":
			body = page("About Computer Science Department", "<h1>About Computer Science Department</h1><p>Learn about our Computer Science Department.</p>");
			break;
		default:
			statusCode = 404;
			body = page("404 - Page Not Found", "<h1>404 - Page Not Found</h1><p>The requested URL could not be found.</p>");
	}

	res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
	res.end(body);
});

server.listen(3000, () => {
	console.log("College website server is running at http://localhost:3000");
});
