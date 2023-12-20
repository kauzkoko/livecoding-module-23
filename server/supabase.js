import { createClient } from "@supabase/supabase-js";

let url = "https://pfqsrarjlgwtllrarfep.supabase.co";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDE3NTkyOCwiZXhwIjoxOTU1NzUxOTI4fQ.o9wiw4AmdmTkon2fxMrfD8Y3F0AgxLCeQRMwlPWjW-0";

async function main() {
  const supabase = createClient(url, key);
  const soundsChannel = supabase.channel("soundsChannel");
  console.log("supabase open");

  soundsChannel
    .on("broadcast", { event: "sound" }, ({ payload }) => {
      console.log("sound from web client received!", payload.sound);
    })
    .subscribe();
}

main();
