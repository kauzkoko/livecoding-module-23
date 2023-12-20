async function main() {
  const wss = new WebSocket.Server({ port: 8081 });
  console.log("ws server open");
  wss.on("connection", (ws) => {
    console.log("ws 8081 client connected");
    ws.on("message", (message) => {
      const buffer = Buffer.from(message);
      const string = buffer.toString("utf-8");
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(string);
        }
      });
    });
    ws.on("close", () => {
      console.log("ws client disconnected");
    });
  });
}

main();
