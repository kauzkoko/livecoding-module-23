import OSC from "osc-js";
import { createClient } from "@supabase/supabase-js";
let url = process.env.SUPABASE_URL;
let key = process.env.SUPABASE_KEY;

async function main() {
  const supabase = createClient(url, key);

  const channel = supabase.channel("room-one");
  channel
    .on("broadcast", { event: "cursor-pos" }, (payload) => {
      console.log("Cursor position received!", payload);
      channel.send({
        type: "broadcast",
        event: "cursor-pos",
        payload: { x: 1, y: 2 },
      });
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({
          type: "broadcast",
          event: "cursor-pos",
          payload: { x: 1, y: 2 },
        });
      }
    });

  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

  osc.on("*", ({ address, args }) => {
    console.log(args[7]);
    if (address === "/dirt/play") {
      osc.send(new OSC.Message("/fromdirtplay", args[7]));
    }
    if (address === "/vue") {
      osc.send(new OSC.Message("/fromvue", "hello from vue"));
    }
  });

  setTimeout(() => {
    setInterval(() => {
      osc.send(new OSC.Message("/fromserver", "hello from server"));
    }, 1000);
  }, 2000);
}

main();
