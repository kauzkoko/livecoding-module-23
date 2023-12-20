import OSC from "osc-js";

async function main() {
  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

  osc.on("*", ({ address, args }) => {
    console.log("should be sound", address);
    if (address === "/dirt/play") {
      osc.send(new OSC.Message("/fromstrudel", args[7]));
    }
  });
}

main();
