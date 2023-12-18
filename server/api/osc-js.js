import OSC from "osc-js";
const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
osc.open();
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
