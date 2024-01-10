<template>
  <div class="wrapper">
    <div class="circle ml-$example"></div>
  </div>
</template>

<script setup>
const example = css("example", "0px");

//websocket stuff
const { data } = useWebSocket("ws://localhost:8081", {
  onMessage: (ws, { data }) => {
    let parsed = JSON.parse(data);
    console.log(parsed.s);
    switch (parsed.s) {
      case "example":
        example.value = "0px";
        break;
      case "bd":
        example.value = "10px";
        break;
      case "sd":
        break;
      default:
        example.value = "0px";
    }
  },
});
</script>
