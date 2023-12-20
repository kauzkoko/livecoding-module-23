import OSC from "osc-js";
import WebSocket from "ws";
import { createClient } from "@supabase/supabase-js";

let url = process.env.SUPABASE_URL;
let key = process.env.SUPABASE_KEY;

async function main() {
  //start osc / local websocket server
  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

  //start second local websocket server
  const wss = new WebSocket.Server({ port: 8081 });
  wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Server received: ${message}`);
    });
    ws.on("close", () => {
      console.log("Client disconnected");
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

  //send server alive message once osc server is open (assume 2 seconds to start up)
  setTimeout(() => {
    soundsChannel
      .on("broadcast", { event: "sound" }, ({ payload }) => {
        console.log("sound from web client received!", payload.sound);
        osc.send(new OSC.Message("/fromwebclient", payload.sound));
      })
      .subscribe();

    setInterval(() => {
      // osc.send(new OSC.Message("/fromserver", "hello from server, im alive"));
    }, 1000);
  }, 2000);
}

main();
