<template>
  <div w-screen h-screen overflow-hidden flexCenter>
    <div w-full flex>
      <div
        v-for="n in 9"
        flexCenter
        rounded-full
        aspect-1
        bg-yellow
        border-black
        border-solid
        border-5px
        class="w-1/9%"
      >
        circle
      </div>
    </div>
  </div>
</template>
