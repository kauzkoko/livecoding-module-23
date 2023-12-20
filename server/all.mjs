import OSC from "osc-js";
import WebSocket from "ws";
import { createClient } from "@supabase/supabase-js";

let url = "https://pfqsrarjlgwtllrarfep.supabase.co";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDE3NTkyOCwiZXhwIjoxOTU1NzUxOTI4fQ.o9wiw4AmdmTkon2fxMrfD8Y3F0AgxLCeQRMwlPWjW-0";

async function main() {
  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

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

  const supabase = createClient(url, key);
  const soundsChannel = supabase.channel("soundsChannel");

  osc.on("*", ({ address, args }) => {
    console.log("should be sound", address);
    if (address === "/dirt/play") {
      osc.send(new OSC.Message("/fromstrudel", args[7]));
    }
  });

  setTimeout(() => {
    soundsChannel
      .on("broadcast", { event: "sound" }, ({ payload }) => {
        console.log("sound from web client received!", payload.sound);
        osc.send(new OSC.Message("/fromwebclient", payload.sound));
      })
      .subscribe();
  }, 2000);
}

main();
