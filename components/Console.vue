<template>
  <div
    z-1
    bg-red
    border-dashed
    border-black
    border-3px
    fixed
    ref="el"
    :class="[
      minimized
        ? 'h-30px w-30px overflow-hidden bg-blue!'
        : 'h-auto w-auto overflow-auto',
    ]"
    :style="style"
  >
    <div bg-yellow w-20px h-20px @click="minimize"></div>
    <pre text-12px text-white v-for="prop in props">{{ prop }}</pre>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  values: Object,
});
const el = ref();
const minimized = ref(true);
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
});
const minimize = () => (minimized.value = !minimized.value);
</script>
