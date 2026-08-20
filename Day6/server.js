//create my own server using http module
import http from "http";
const server=http.createServer((req,res)=>{
res.write("welcome to my server");
 res.end();
})

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error("Port 8000 is already in use. Stop the other server or use a different port.");
        return;
    }

    throw error;
});

server.listen(8000,()=>{
    console.log("server is running on port 8000");
})
cl