const http = require("http");
const fs = require("fs");

const port = 3000;
const dataFile = "students.json";

const formPage = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Student Records</title>
</head>
<body>
	<h1>Student Records</h1>
	<p>Welcome to the student records application.</p>
	<form action="/students" method="post">
		<label>Student Name <input name="name" required></label><br><br>
		<label>Roll Number <input name="rollNumber" required></label><br><br>
		<label>Course <input name="course" required></label><br><br>
		<label>Email <input type="email" name="email" required></label><br><br>
		<button type="submit">Add Student</button>
	</form>
	<p><a href="/students">View student records</a></p>
</body>
</html>`;

function readStudents() {
	try {
		return JSON.parse(fs.readFileSync(dataFile, "utf8"));
	} catch (error) {
		if (error.code === "ENOENT") {
			fs.writeFileSync(dataFile, "[]", "utf8");
			return [];
		}

		throw error;
	}
}

function writeResponse(res, statusCode, contentType, body) {
	res.writeHead(statusCode, { "Content-Type": `${contentType}; charset=utf-8` });
	res.end(body);
}

function studentsPage(students) {
	const rows = students.length
		? students.map((student) => `<li>${student.name} | ${student.rollNumber} | ${student.course} | ${student.email}</li>`).join("")
		: "<li>No student records found.</li>";

	return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Student Records</title></head>
<body>
	<h1>Student Records</h1>
	<ul>${rows}</ul>
	<a href="/">Add another student</a>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
	if (req.method === "GET" && req.url === "/") {
		return writeResponse(res, 200, "text/html", formPage);
	}

	if (req.method === "GET" && req.url === "/students") {
		try {
			return writeResponse(res, 200, "text/html", studentsPage(readStudents()));
		} catch (error) {
			return writeResponse(res, 500, "text/plain", "Unable to read student records.");
		}
	}

	if (req.method === "POST" && req.url === "/students") {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk;
		});
		req.on("end", () => {
			const formData = new URLSearchParams(body);
			const student = {
				name: formData.get("name")?.trim(),
				rollNumber: formData.get("rollNumber")?.trim(),
				course: formData.get("course")?.trim(),
				email: formData.get("email")?.trim()
			};

			if (Object.values(student).some((value) => !value)) {
				return writeResponse(res, 400, "text/plain", "All student fields are required.");
			}

			try {
				const students = readStudents();
				students.push(student);
				fs.writeFileSync(dataFile, JSON.stringify(students, null, 2), "utf8");
				res.writeHead(302, { Location: "/students" });
				res.end();
			} catch (error) {
				writeResponse(res, 500, "text/plain", "Unable to save the student record.");
			}
		});
		return;
	}

	writeResponse(res, 404, "text/plain", "Page not found.");
});

server.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
