<template>
  <div class="wrapper flexCenter">
    <div class="fixed left-0 top-0 bg-yellow text-black">
      <div class="grid grid-cols grid-2 gap-x-2">
        <div>ball.xSpeed</div>
        <div>
          <input type="range" v-model="ball.xSpeed" step="1" min="1" max="20" />
        </div>
      </div>
      <div class="grid grid-cols grid-2 gap-x-2">
        <div>ball.ySpeed</div>
        <div>
          <input type="range" v-model="ball.ySpeed" step="1" min="1" max="20" />
        </div>
      </div>
    </div>
    <div class="w-$playgroundX aspect-1 bg-white relative">
      <div
        class="absolute w-full h-full left-0 top-0 grid grid-cols-2 text-black justify-between content-between place-content-between"
      >
        <div>top left</div>
        <div class="justify-self-end">top right</div>
        <div>bottom left</div>
        <div class="justify-self-end">bottom right</div>
      </div>
      <div
        class="absolute aspect-1 bg-black w-$ballWidth rounded-full transform-gpu translate-x-$ballX translate-y-$ballY"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { data, post } = useBroadcastChannel({ name: "strudelpong" });
const playground = reactive({ width: 300, height: 300 });
const playgroundX = css("playgroundX", playground.width + "px");
const ball = reactive({
  x: playground.width / 2,
  y: playground.height / 2,
  xSpeed: Math.floor(Math.random() * 3) + 1,
  ySpeed: Math.floor(Math.random() * 3) + 1,
  xDirection: 1,
  yDirection: 1,
  r: 10,
});

const ballX = css("ballX", ball.x - ball.r + "px");
const ballY = css("ballY", ball.y - ball.r + "px");
const ballWidth = css("ballWidth", ball.r * 2 + "px");
watchEffect(() => {
  ballX.value = `${ball.x - ball.r}px`;
  ballY.value = `${ball.y - ball.r}px`;
});

watch(data, () => {
  console.log(data.value);
});

setInterval(() => {
  post("test");
}, 1000);

const { pause, resume } = useRafFn(() => {
  //move the ball every frame and bounce it off the walls
  ball.x += ball.xSpeed * ball.xDirection;
  ball.y += ball.ySpeed * ball.yDirection;
  if (ball.x + ball.r >= playground.width) {
    ball.xDirection = -1;
  }
  if (ball.x - ball.r <= 0) {
    ball.xDirection = 1;
  }
  if (ball.y + ball.r >= playground.height) {
    ball.yDirection = -1;
  }
  if (ball.y - ball.r <= 0) {
    ball.yDirection = 1;
  }
});

let getXBallSpeed = computed(() => parseFloat(ball.xSpeed));
let getYBallSpeed = computed(() => parseFloat(ball.ySpeed));
onKeyStroke(["a", "A"], (e) => {
  ball.x -= getXBallSpeed.value;
});

onKeyStroke(["d", "D"], (e) => {
  ball.x += getXBallSpeed.value;
});

onKeyStroke(["w", "W"], (e) => {
  ball.y -= getYBallSpeed.value;
});

onKeyStroke(["s", "S"], (e) => {
  ball.y += getYBallSpeed.value;
});
</script>
