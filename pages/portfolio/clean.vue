<template>
  <div id="container">
    <div class="h-screen overflow-hidden">
      <img ref="scrollIntoView" src="/portfolio/panoramas/1.jpeg" />
      <img src="/portfolio/panoramas/2.jpeg" />
    </div>
    <div class="h-screen">
      <img src="/portfolio/panoramas/11.jpeg" />
      <div
        class="w-screen min-w-screen h-screen text-white bg-black flex flex-col justify-between"
      >
        <div class="p-3 text-1.3rem font-bold font-helvetica md:pt-2.5rem">
          <h2 class="mb-1">ZHDK</h2>
          <h1 class="text-2rem mb-1">Panorama-Studien. Toni-Areal. 2023.</h1>
          <p class="max-w-80%">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            cupiditate similique nulla, aspernatur modi laudantium enim ratione
            ab quibusdam esse officia a totam tempora rerum minima autem ipsum
            nostrum accusantium!
          </p>
        </div>
        <div class="flex p-3 text-2rem justify-between">
          <div></div>
          <div class="flex">
            <div class="i-mdi-earth"></div>
            <div class="i-mdi-github"></div>
          </div>
        </div>
      </div>
      <img src="/portfolio/panoramas/22.jpeg" />
    </div>
    <div class="h-screen">
      <img src="/portfolio/portraits/1.jpeg" />
      <img src="/portfolio/portraits/2.jpeg" />
      <img src="/portfolio/portraits/3.jpeg" />
      <img src="/portfolio/portraits/4.jpeg" />
    </div>
    <div class="h-screen" id="tmol">
      <div class="flex flex-col">
        <img class="w-100vw" src="/portfolio/intro.png" />
        <img class="w-100vw" src="/portfolio/spieler.png" />
        <img class="w-100vw" src="/portfolio/intro.png" />
        <img class="w-100vw filter blur-10px" src="/portfolio/intro.png" />
      </div>

      <div
        class="w-screen min-w-screen h-screen text-black bg-white flex flex-col justify-between"
      >
        <div
          class="p-3 text-2rem font-bold font-helvetica md:pt-2.5rem"
          id="tmol"
        >
          <!-- <div class="uppercase" id="freelance">Freelance</div> -->
          <h1 class="pt-4">The Meaning Of Life. Zurich. 2020.</h1>
          <p class="text-1.4rem pt-1 xl:w-60vw">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            cupiditate similique nulla, aspernatur modi laudantium enim ratione
            ab quibusdam esse officia a totam tempora rerum minima autem ipsum
            nostrum accusantium!
          </p>
        </div>
        <div class="flex p-3 text-2rem justify-between">
          <div></div>
          <div class="flex">
            <div class="i-mdi-earth"></div>
            <div class="i-mdi-github"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed right-0 bottom-0 h-fit flex justify-end flex-wrap-reverse md:top-0 md:flex-wrap text-1rem"
  >
    <button @click="scrollIntoView.scrollIntoView()">Home</button>
    <button class="bg-blue">
      <a href="#tmol">The Meaning Of Life</a>
    </button>
    <button><a href="#freelance">Ja eh</a></button>
    <button class="bg-yellow"><a href="#freelance">Tutanota</a></button>
    <button><a href="#freelance">Digital Fabrickk</a></button>
    <button><a href="#freelance">Aloe Veran</a></button>
    <button><a href="#freelance">Sart a Miel</a></button>
    <button v-for="n in 9"><a href="#freelance">Krass</a></button>
  </div>
</template>

<script setup>
const scrollIntoView = ref();
const scrollToTop = () => {
  scrollIntoView.value.scrollIntoView();
};

onMounted(() => {
  const container = document.getElementById("container");
  const items = document.querySelectorAll("#container > div");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item) => {
            if (item.id !== entry.target.id) {
              setTimeout(() => {
                item.scrollLeft = 0;
              }, 700);
            }
          });
        }
      });
    },
    {
      root: container,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );
  items.forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss">
#container {
  scroll-snap-type: y mandatory;
  height: 100dvh;
  width: 100vw;
  overflow-x: scroll;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > div {
    display: flex;
    height: 100dvh;
    scroll-snap-align: center;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar,
  & > div::-webkit-scrollbar {
    display: none;
  }
}

a {
  text-decoration: none;
}

#test {
  background-image: url("/portfolio/spieler.png");
}
</style>
