import { Client, Server } from "node-osc";
import { WebSocketServer } from "ws";

const oscClient = new Client("0.0.0.0", 9001);
const oscServer = new Server(9000, "0.0.0.0", () => {
  console.log("OSC Server is listening on port 9000");
});

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket Server is listening");

oscServer.on("message", function (msg) {
  console.log(`Message: ${msg}`);
});

wss.on("connection", (ws) => {
  ws.on("message", async (e) => {
    console.log("hello", e);
  });
  ws.send("something");
});
