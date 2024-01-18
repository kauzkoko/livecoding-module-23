<template>
  <div class="wrapper flexCenter">
    <div class="console fixed left-0 top-0 bg-yellow text-black">
      <div class="grid grid-cols-2 grid gap-x-1">
        <div>start / restart game in 1 sec</div>
        <div><button @click="restartGame()">start</button></div>
      </div>
      <div class="grid grid-cols-2 grid gap-x-1">
        <div>end / stop game</div>
        <div><button @click="endGame()">stop</button></div>
      </div>
      <div class="grid grid-cols-2 grid gap-x-1">
        <div>pause game</div>
        <div><button @click="pauseGame()">pause</button></div>
      </div>
      <div class="grid grid-cols-2 grid gap-x-1">
        <div>resume game</div>
        <div><button @click="resumeGame()">resume</button></div>
      </div>
      <div class="grid grid-cols-2 gap-x-1">
        <div>ball.xSpeed</div>
        <div>
          <input type="range" v-model="ball.xSpeed" step="1" min="1" max="20" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-1">
        <div>ball.ySpeed</div>
        <div>
          <input type="range" v-model="ball.ySpeed" step="1" min="1" max="20" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-1">
        <div>gameStatus</div>
        <div>{{ gameStatus }}</div>
      </div>
    </div>
    <div class="w-$playgroundX aspect-1 bg-white relative">
      <div
        :style="{ opacity: playground.leftWall ? '100%' : '0%' }"
        @click="toggleWall('left')"
        class="absolute bg-green w-50px h-100% left-0 top-0 ml--50px transition-all duration-200"
      >
        <div
          v-for="n in greenBars"
          class="bg-white w-100% h-10px mt-20px mb-20px"
        ></div>
      </div>
      <div
        :style="{ opacity: playground.rightWall ? '100%' : '0%' }"
        @click="toggleWall('right')"
        class="absolute bg-blue w-50px h-100% right-0 top-0 mr--50px transform-gpu rotate-180 transition-all duration-200"
      >
        <div
          v-for="n in blueBars"
          class="bg-white w-100% h-10px mt-20px mb-20px"
        ></div>
      </div>
      <div
        :style="{ opacity: playground.topWall ? '100%' : '0%' }"
        @click="toggleWall('top')"
        class="absolute bg-yellow w-100% h-50px left-0 top-0 mt--50px grid grid-cols-10 transform-gpu rotate-180 transition-all duration-200"
      >
        <div
          v-for="n in yellowBars"
          class="bg-white w-10px h-50px ml-20px"
        ></div>
      </div>
      <div
        :style="{ opacity: playground.bottomWall ? '100%' : '0%' }"
        @click="toggleWall('bottom')"
        class="absolute bg-red w-100% h-50px left-0 bottom-0 mb--50px grid grid-cols-10 transition-all duration-200"
      >
        <div
          v-for="n in redBars"
          class="bg-white w-10px h-50px ml-20px self-start"
        ></div>
      </div>
      <div
        class="mix-blend-difference absolute aspect-1 bg-white w-$ballWidth rounded-full transform-gpu translate-x-$ballX translate-y-$ballY transition-transform duration-20"
        :style="{ opacity: fadeOut ? '0%' : '100%', transition: 'opacity 3s' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { osc, on, send: sendOSC, bang } = useOSC();
const supabase = useSupabaseClient();
const redBars = ref(35);
const blueBars = ref(39);
const greenBars = ref(31);
const yellowBars = ref(45);

// playground
const playground = reactive({
  width: 300,
  height: 300,
  leftWall: false,
  topWall: false,
  rightWall: false,
  bottomWall: false,
});
const playgroundX = css("playgroundX", playground.width + "px");

// ball
let speed = 1;
let startX = playground.width / 2;
let startY = -playground.height;
let startXSpeed = 1.9 * speed;
let startYSpeed = 2.4 * speed;
let random = Math.random();
let startXDirection =
  random > 0.5
    ? map(random, 0.5, 1, 0.2, 0.5)
    : map(random, 0, 0.5, -0.2, -0.5);
console.log(startXDirection);
let startYDirection = 1;
let startBallValues = {
  x: startX,
  y: startY,
  xSpeed: startXSpeed,
  ySpeed: startYSpeed,
  xDirection: startXDirection,
  yDirection: startYDirection,
  r: 10,
};
const ball = reactive(startBallValues);
const ballX = css("ballX", ball.x - ball.r + "px");
const ballY = css("ballY", ball.y - ball.r + "px");
const ballWidth = css("ballWidth", ball.r * 2 + "px");

// walls
const toggleWall = (direction) => {
  if (direction === "left") {
    playground.leftWall = !playground.leftWall;
    sendOSC.value("toggleLeftWall", 1);
  }
  if (direction === "top") {
    playground.topWall = !playground.topWall;
    sendOSC.value("toggleTopWall", 1);
  }
  if (direction === "right") {
    playground.rightWall = !playground.rightWall;
    sendOSC.value("toggleRightWall", 1);
  }
  if (direction === "bottom") {
    playground.bottomWall = !playground.bottomWall;
    sendOSC.value("toggleBottomWall", 1);
  }
};

watchEffect(() => {
  ballX.value = `${ball.x - ball.r}px`;
  ballY.value = `${ball.y - ball.r}px`;
});

// game
let endDelay = 3000;
const gameStatus = ref("ready");
const fadeOut = ref(true);
let restartGame, pauseGame, endGame, resumeGame;
let channel;
onMounted(() => {
  // supabase walls
  channel = supabase.channel("strudelpong");
  channel
    .on("broadcast", { event: "walls" }, (event) => {
      switch (event.payload.wall) {
        case "left":
          playground.leftWall = event.payload.wallValue;
          break;
        case "top":
          playground.topWall = event.payload.wallValue;
          break;
        case "right":
          playground.rightWall = event.payload.wallValue;
          break;
        case "bottom":
          playground.bottomWall = event.payload.wallValue;
          break;
        default:
          return;
      }

      console.log(event);
    })
    .subscribe();

  // ball movement / collision
  const { pause, resume } = useRafFn(() => {
    ball.x += ball.xSpeed * ball.xDirection;
    ball.y += ball.ySpeed * ball.yDirection;
    if (gameStatus.value === "inCube") {
      if (
        (ball.x + ball.r > playground.width || ball.x + ball.r < 0) &&
        playground.rightWall &&
        gameStatus.value === "inCube"
      ) {
        ball.xDirection = -1;
        bang.value("bounce");
      } else if (
        (ball.x + ball.r > playground.width || ball.x + ball.r < 0) &&
        !playground.rightWall
      ) {
        endGame();
      }
      if (
        (ball.x - ball.r < 0 || ball.x - ball.r > playground.width) &&
        playground.leftWall &&
        gameStatus.value === "inCube"
      ) {
        ball.xDirection = 1;
        bang.value("bounce");
      } else if (
        (ball.x - ball.r < 0 || ball.x - ball.r > playground.width) &&
        !playground.leftWall
      ) {
        endGame();
      }
      if (
        (ball.y + ball.r > playground.height || ball.y + ball.r < 0) &&
        playground.bottomWall &&
        gameStatus.value === "inCube"
      ) {
        ball.yDirection = -1;
        bang.value("bounce");
      } else if (
        (ball.y + ball.r > playground.height || ball.y + ball.r < 0) &&
        !playground.bottomWall
      ) {
        endGame();
      }
      if (
        (ball.y - ball.r < 0 || ball.y - ball.r > playground.height) &&
        playground.topWall &&
        gameStatus.value === "inCube"
      ) {
        ball.yDirection = 1;
        bang.value("bounce");
      } else if (
        (ball.y - ball.r < 0 || ball.y - ball.r > playground.height) &&
        !playground.topWall
      ) {
        endGame();
      }
    } else {
      if (ball.y - ball.r > 0 && gameStatus.value === "started") {
        gameStatus.value = "inCube";
      }
    }
  });

  // game state controls
  pause();
  resumeGame = resume;
  pauseGame = () => {
    pause();
    gameStatus.value = "paused";
  };
  endGame = () => {
    gameStatus.value = "outOfCube";
    fadeOut.value = true;
    setTimeout(() => {
      pause();
      let random = Math.random();
      let startXDirection =
        random > 0.5
          ? map(random, 0.5, 1, 0.2, 0.5)
          : map(random, 0, 0.5, -0.2, -0.5);
      let startYDirection = 1;
      ball.x = startX;
      ball.y = startY;
      ball.xDirection = startXDirection;
      ball.yDirection = startYDirection;
      ball.xSpeed = startXSpeed;
      ball.ySpeed = startYSpeed;
      playground.leftWall = false;
      playground.topWall = false;
      playground.rightWall = false;
      playground.bottomWall = false;
      gameStatus.value = "ended";
      console.log("game ended");
    }, endDelay);
    bang.value("endGame");
  };
  restartGame = () => {
    fadeOut.value = false;
    ball.x = startX;
    ball.y = startY;
    let random = Math.random();
    let startXDirection =
      random > 0.5
        ? map(random, 0.5, 1, 0.2, 0.5)
        : map(random, 0, 0.5, -0.2, -0.5);
    let startYDirection = 1;
    ball.x = startX;
    ball.y = startY;
    ball.xDirection = startXDirection;
    ball.yDirection = startYDirection;
    ball.xSpeed = startXSpeed;
    ball.ySpeed = startYSpeed;
    setTimeout(() => resume(), 0);
    gameStatus.value = "started";
    bang.value("restartGame");
  };

  setInterval(() => {
    sendOSC.value("ballX", map(ball.x, 0, playground.width, -1, 1));
    sendOSC.value("ballY", map(ball.y, 0, playground.height, 1, -1));
    sendOSC.value("stateLeftWall", playground.leftWall);
    sendOSC.value("stateTopWall", playground.topWall);
    sendOSC.value("stateRightWall", playground.rightWall);
    sendOSC.value("stateBottomWall", playground.bottomWall);
    let distances = [
      ball.x - ball.r,
      playground.height - ball.y - ball.r,
      playground.width - ball.x - ball.r,
      ball.y - ball.r,
    ];
    let minDistance = Math.min(...distances);
    sendOSC.value("minDistance", minDistance);
  }, 50);
});
</script>
