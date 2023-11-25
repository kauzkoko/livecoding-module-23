<script setup>
import Vue3DraggableResizable from "vue3-draggable-resizable";

const emit = defineEmits(["update", "destroy"]);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  showMeta: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const x = ref(window.innerWidth / 2);
const y = ref(window.innerHeight / 2);
const active = ref();
const relativeX = ref(0);
const relativeY = ref(0);
const rotation = ref(0);

const rotate = (e) => {
  // only rotate active element
  if (active.value) {
    rotation.value = rotation.value + e.wheelDelta;
    if (rotation.value > 360) {
      rotation.value = rotation.value - 360;
    } else if (rotation.value < 0) {
      rotation.value = rotation.value + 360;
    }
    emitUpdate();
  }
};

const update = () => {
  relativeX.value = x.value / window.innerWidth;
  relativeY.value = y.value / window.innerHeight;
  emitUpdate();
};

const handleKey = (e) => {
  if (active.value) {
    if (e.keyCode === 8 || e.key === "Backspace") {
      emit("destroy", props.id);
    }
  }
};

const emitUpdate = () => {
  console.log("update");
  emit("update", {
    x: x.value,
    y: y.value,
    relativeX: relativeX.value,
    relativeY: relativeY.value,
    id: props.id,
    rotation: rotation.value,
  });
};

const size = 50;
const cssSize = `${size}px`;

onMounted(() => {
  window.addEventListener("wheel", rotate);
  window.addEventListener("keyup", handleKey);
});

onUnmounted(() => {
  window.removeEventListener("wheel", rotate);
  window.removeEventListener("keyup", handleKey);
});
</script>

<template>
  <Vue3DraggableResizable
    :initW="size"
    :initH="size"
    v-model:x="x"
    v-model:y="y"
    v-model:active="active"
    :draggable="true"
    :resizable="false"
    @drag-end="update()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
      <circle id="knob-fill" class="st0" cx="125" cy="125" r="125" />
      <circle id="fill" class="st1" cx="125" cy="125" r="121.13" />
      <g class="rotating" :transform="`rotate(${rotation}, 125, 125)`">
        <circle cx="125" cy="125" r="67.14" />
        <circle class="st2" cx="125" cy="125" r="56.74" />
        <g>
          <polygon points="113.6,63.52 125,36 136.4,63.52 		" />
          <polygon class="st3" points="136.4,186.48 125,214 113.6,186.48 		" />
          <polygon class="st3" points="186.48,113.6 214,125 186.48,136.4 		" />
          <polygon class="st3" points="63.52,136.4 36,125 63.52,113.6 		" />
        </g>
      </g>
    </svg>

    <div v-show="showMeta" class="meta">
      <table>
        <tr>
          <td>ID:</td>
          <td>{{ id }}</td>
        </tr>
        <tr>
          <td>Pos:</td>
          <td>[{{ relativeX.toFixed(3) }}, {{ relativeY.toFixed(3) }}]</td>
        </tr>
        <tr>
          <td>Angle:</td>
          <td>{{ rotation }}°</td>
        </tr>
        <tr>
          <td class="soft" colspan="2">
            Use mousewheel/trackpad to rotate<br />
            and backspace to delete
          </td>
        </tr>
      </table>
    </div>
  </Vue3DraggableResizable>
</template>

<style scoped>
.draggable {
  z-index: 10;
}

svg {
  width: v-bind(cssSize);
  position: absolute;
}

svg:hover {
  cursor: grab;
}
.canvas {
  width: 100%;
  height: 100%;
}

.st0 {
  fill: #bfbfbf;
}
.st1 {
  fill: #666666;
}
.st2 {
  fill: #e8eadf;
}
.st3 {
  fill: none;
}

.meta {
  transform: translate(v-bind(cssSize), v-bind(cssSize));
  width: 200px;
}

table {
  font-size: 7px;
  line-height: 1em;
}

td {
  vertical-align: top;
}

td.soft {
  opacity: 0.5;
  line-height: 1.2;
}

.vdr-container.active {
  border: 0;
}
.vdr-container.active .st1 {
  fill: var(--color-active);
}

.hint {
  font-size: 7px;
  opacity: 0.5;
}
</style>
