<template>
  <div class="w-screen h-screen overflow-hidden flexCenter">
    <div
      class="bg-black w-90vw aspect-1 rounded-full flexCenter transition-all duration-200"
      @click="triggerSound('bd')"
      :style="{
        transform: isPressed ? 'scale(1.1)' : 'scale(1)',
      }"
    >
      <div class="text-white">hit the basedrum!</div>
    </div>
  </div>
</template>

<script setup>
const { on } = useOSC();
const supabase = useSupabaseClient();
let soundsChannel = supabase.channel("soundsChannel");
const isPressed = ref(false);

onMounted(() => {
  on.value("/fromwebclient", ({ args }) => {
    console.log(
      "forwarded websocket sound from server received (args): ",
      args
    );
  });
});

const triggerSound = (sound) => {
  isPressed.value = true;

  soundsChannel.send({
    type: "broadcast",
    event: "sound",
    payload: { sound },
  });

  setTimeout(() => {
    isPressed.value = false;
  }, 200);
};
</script>
