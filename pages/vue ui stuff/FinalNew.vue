<template>
  <div
    v-for="n in particles.length"
    class="aspect-1 bg-gray fixed left-0 top-0 rounded-full transition-all ease-linear z--1 particles"
    :style="{
      transitionDuration: `${60000}ms`,
      width: `${particles[n - 1].r}px`,
      transform: `translate(${particles[n - 1].x}px, ${particles[n - 1].y}px)`,
    }"
  ></div>
  <svg
    :width="windowWidth + 'px'"
    :height="windowHeight + 'px'"
    class="fixed left-0 top-0"
  >
    <defs>
      <filter
        id="metaballFilter"
        width="400%"
        x="-150%"
        height="400%"
        y="-150%"
      >
        <feGaussianBlur
          id="blurElement"
          in="SourceGraphic"
          stdDeviation="20"
          result="blur"
        />
        <feColorMatrix
          id="colorMatrixElement"
          in="blur"
          mode="matrix"
          values="1 0 0 0  0
                                                                                   0 1 0 0  0
                                                                                   0 0 1 0  0
                                                                                   0 0 0 25 -15"
          result="matrix"
        />
      </filter>
    </defs>
    <g v-for="n in 9">
      <g filter="url(#metaballFilter)" v-show="data[n - 1].potential !== 200">
        <circle
          ref="el"
          id="circle"
          :cx="(windowWidth / 9) * n - windowWidth / 18"
          :cy="ecosystems[n - 1].y"
          :r="100"
          fill="gray"
          class="transition-all duration-2000 ease-out"
        />
        <circle
          :cx="(windowWidth / 9) * n - windowWidth / 18"
          :cy="windowHeight / 2"
          :r="
            ecosystems[n - 1].showPotential
              ? data[n - 1].totalPotential / 2 + 7
              : ecosystems[n - 1].showCurrent
              ? data[n - 1].totalCurrent / 2 + 7
              : 0
          "
          fill="green"
          :style="{
            transitionProperty: 'all',
            transitionDelay: ecosystems[n - 1].showPotential ? '500ms' : '0ms',
            transitionDuration: ecosystems[n - 1].showPotential
              ? '500ms'
              : '1000ms',
            transitionTimingFunction: 'ease-out',
          }"
        />
      </g>
      <circle
        :cx="(windowWidth / 9) * n - windowWidth / 18"
        :cy="windowHeight / 2"
        :r="data[n - 1].totalCurrent / 2"
        fill="transparent"
        stroke="white"
      />
      <circle
        :cx="(windowWidth / 9) * n - windowWidth / 18"
        :cy="windowHeight / 2"
        :r="data[n - 1].totalPotential / 2"
        fill="transparent"
        stroke="white"
      />
    </g>
  </svg>
  <div class="w-screen h-screen overflow-hidden grid grid-cols-9 grid-rows-9">
    <TokenNew
      v-for="n in 9"
      @showCurrent="showCurrent"
      @showPotential="showPotential"
      :ecosystem="ecosystems[n - 1]"
      class="row-start-5 self-center justify-self-center"
    />
  </div>
</template>

<script setup>
import "animate.css";
const { x, y: mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindowSize();
const particles = ref([]);
const ecosystems = ref([]);

for (let i = 0; i < 40; i++) {
  particles.value.push({
    x: Math.random() * windowWidth.value,
    y: Math.random() * windowHeight.value,
    r: Math.random() * 200,
  });
}

let data = [
  {
    ecosystem: "Forest",
    currentAbove: 432,
    potentialAbove: 247,
    currentBelow: 1003,
    potentialBelow: 277,
    totalPotential: 1353,
    totalCurrent: 1292,
    potential: 571,
  },
  {
    ecosystem: "Savanna",
    currentAbove: 101,
    potentialAbove: 81,
    currentBelow: 339,
    potentialBelow: 133,
    totalPotential: 587,
    totalCurrent: 554,
    potential: 356,
  },
  {
    ecosystem: "Shrubland",
    currentAbove: 85,
    potentialAbove: 69,
    currentBelow: 438,
    potentialBelow: 133,
    totalPotential: 671,
    totalCurrent: 646,
    potential: 350,
  },
  {
    ecosystem: "Grassland",
    currentAbove: 58,
    potentialAbove: 78,
    currentBelow: 646,
    potentialBelow: 117,
    totalPotential: 864,
    totalCurrent: 849,
    potential: 341,
  },
  {
    ecosystem: "Wetlands",
    currentAbove: 29,
    potentialAbove: 22,
    currentBelow: 162,
    potentialBelow: 21,
    totalPotential: 367,
    totalCurrent: 365,
    potential: 231,
  },
  {
    ecosystem: "Desert",
    currentAbove: 10,
    potentialAbove: 13,
    currentBelow: 287,
    potentialBelow: 56,
    totalPotential: 493,
    totalCurrent: 488,
    potential: 258,
  },
  {
    ecosystem: "Blue Carbon Ecosystems",
    currentAbove: 42,
    potentialAbove: 0,
    currentBelow: 99,
    potentialBelow: 0,
    totalPotential: 308,
    totalCurrent: 308,
    potential: 200,
  },
  {
    ecosystem: "Continental margins",
    currentAbove: 733,
    potentialAbove: 0,
    currentBelow: 549,
    potentialBelow: 0,
    totalPotential: 1116,
    totalCurrent: 1116,
    potential: 200,
  },
  {
    ecosystem: "Open Ocean",
    currentAbove: 4763,
    potentialAbove: 0,
    currentBelow: 982,
    potentialBelow: 0,
    totalPotential: 5063,
    totalCurrent: 5063,
    potential: 200,
  },
];

for (let i = 0; i < 9; i++) {
  let temp = Math.random() * 500 + 220;
  ecosystems.value.push({
    y: -30,
    index: i,
    currentRadius: data[i].totalCurrent,
    potentialRadius: data[i].totalPotential,
  });
}
// onMounted(() => {
//   let circle = document.getElementById("circle");
//   const { pause, resume } = useRafFn(() => {
//     yRef.value = circle.getBoundingClientRect().y;
//   });
// });

// const difference = computed(() =>
//   Math.abs(yRef.value - windowHeight.value / 2)
// );

// let r = ecosystems.value[2].currentRadius / 2;
// const fakedR = computed(() => {
//   if (difference.value < 360) {
//     return (
//       r +
//       useMap(
//         difference.value,
//         245,
//         0,
//         0,
//         49
//         // Math.sqrt(
//         //   Math.PI * Math.pow(r, 2) +
//         //     (Math.PI * Math.pow(100, 2)) / Math.PI -
//         //     r * 2
//         // )
//       )
//     );
//   } else {
//     return r;
//   }
// });

function setParticlePositions() {
  particles.value.forEach((particle, index) => {
    particles.value[index].x = Math.random() * windowWidth.value;
    particles.value[index].y = Math.random() * windowHeight.value;
  });
}

function showPotential(index) {
  ecosystems.value[index].showPotential = true;
  ecosystems.value[index].y = windowHeight.value / 2;
}

function showCurrent(index) {
  ecosystems.value[index].showCurrent = true;
}

onMounted(() => {
  setInterval(() => {
    setParticlePositions();
  }, 60000);
  setTimeout(() => {
    setParticlePositions();
  }, 1000);
});
</script>

<style>
html {
  background-color: black;
  font-family: "Helvetica Neue" !important;
}

.particles {
  /* mix-blend-mode: difference; */
  border: 1px solid black;
}
</style>
