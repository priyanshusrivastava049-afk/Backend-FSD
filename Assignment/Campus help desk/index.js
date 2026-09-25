import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 3000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const requestsFile = path.join(currentDirectory, "requests.json");

app.use(express.json());
app.use(express.static(currentDirectory));

async function readRequests() {
	try {
		return JSON.parse(await fs.readFile(requestsFile, "utf8"));
	} catch (error) {
		if (error.code === "ENOENT") {
			await writeRequests([]);
			return [];
		}
		throw error;
	}
}

async function writeRequests(requests) {
	await fs.writeFile(requestsFile, `${JSON.stringify(requests, null, 2)}\n`);
}

function isValidRequest(request) {
	return ["studentName", "email", "category", "description", "priority"]
		.every((field) => typeof request[field] === "string" && request[field].trim());
}

app.get("/api/requests", async (request, response) => {
	try { response.json(await readRequests()); }
	catch { response.status(500).json({ error: "Unable to read requests." }); }
});

app.get("/api/requests/:id", async (request, response) => {
	try {
		const requests = await readRequests();
		const campusRequest = requests.find((item) => item.id === Number(request.params.id));
		if (!campusRequest) return response.status(404).json({ error: "Request not found." });
		response.json(campusRequest);
	} catch { response.status(500).json({ error: "Unable to read request." }); }
});

app.post("/api/requests", async (request, response) => {
	if (!isValidRequest(request.body)) return response.status(400).json({ error: "All form fields are required." });
	try {
		const requests = await readRequests();
		const newRequest = {
			id: requests.reduce((highestId, item) => Math.max(highestId, item.id), 0) + 1,
			...request.body,
			createdAt: new Date().toISOString()
		};
		requests.push(newRequest);
		await writeRequests(requests);
		response.status(201).json(newRequest);
	} catch { response.status(500).json({ error: "Unable to save request." }); }
});

app.put("/api/requests/:id", async (request, response) => {
	if (!isValidRequest(request.body)) return response.status(400).json({ error: "All form fields are required." });
	try {
		const requests = await readRequests();
		const requestIndex = requests.findIndex((item) => item.id === Number(request.params.id));
		if (requestIndex === -1) return response.status(404).json({ error: "Request not found." });
		requests[requestIndex] = { ...requests[requestIndex], ...request.body, updatedAt: new Date().toISOString() };
		await writeRequests(requests);
		response.json(requests[requestIndex]);
	} catch { response.status(500).json({ error: "Unable to update request." }); }
});

app.delete("/api/requests/:id", async (request, response) => {
	try {
		const requests = await readRequests();
		const remainingRequests = requests.filter((item) => item.id !== Number(request.params.id));
		if (remainingRequests.length === requests.length) return response.status(404).json({ error: "Request not found." });
		await writeRequests(remainingRequests);
		response.status(204).send();
	} catch { response.status(500).json({ error: "Unable to delete request." }); }
});

app.listen(port, () => console.log(`Campus Help Desk running at http://localhost:${port}`));
