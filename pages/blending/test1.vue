<template>
  <div class="w-screen h-screen relative">
    <svg class="absolute w-full ___ h-full">
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="white"
        stroke="black"
        class="normal"
      />
    </svg>
    <svg class="absolute w-full h-full diff">
      <circle
        cx="120"
        cy="120"
        r="50"
        fill="white"
        stroke="black"
        class="normal"
      />
    </svg>
  </div>
</template>

<style scoped>
.blend-1 {
  mix-blend-mode: normal;
}

.blend-2 {
  mix-blend-mode: difference;
}

.blend-3 {
  mix-blend-mode: difference;
}

.blend-4 {
  mix-blend-mode: difference;
}
</style>
