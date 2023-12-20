import OSC from "osc-js";
import WebSocket from "ws";
import { createClient } from "@supabase/supabase-js";

let url = "https://pfqsrarjlgwtllrarfep.supabase.co";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDE3NTkyOCwiZXhwIjoxOTU1NzUxOTI4fQ.o9wiw4AmdmTkon2fxMrfD8Y3F0AgxLCeQRMwlPWjW-0";

async function main() {
  //start osc / local websocket server
  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

  //start second local websocket server and forward all messages
  const wss = new WebSocket.Server({ port: 8081 });
  console.log("ws server open");
  wss.on("connection", (ws) => {
    console.log("ws 8081 client connected");
    ws.on("message", (message) => {
      const buffer = Buffer.from(message);
      const string = buffer.toString("utf-8");
      // const json = JSON.parse(string);
      // console.log("ws 8081 message received", string);
      wss.clients.forEach((client) => {
        // if (client.readyState === WebSocket.OPEN) {
        //   client.send(string);
        // }
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(string);
        }
      });
    });
    ws.on("close", () => {
      console.log("ws client disconnected");
    });
  });

  //start supabase websocket (internet) client
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
