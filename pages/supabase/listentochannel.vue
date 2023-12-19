<template>
  <div>
    <div>
      <button @click="send">send xy</button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
let channel = supabase.channel("room-one");
channel
  .on("broadcast", { event: "cursor-pos" }, (event) => {
    console.log("received event on vue page: ", event);
  })
  .subscribe();

let send = () => {
  channel.send({
    type: "broadcast",
    event: "cursor-pos",
    payload: { x: 1, y: 2 },
  });
};
</script>
