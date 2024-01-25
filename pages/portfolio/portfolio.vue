<template>
  <div id="container">
    <div id="hohlstr">
      <img src="/panoramas/1.jpeg" id="scrollIntoView" />
      <img src="/panoramas/2.jpeg" />
    </div>
    <div id="raggio">
      <img src="/panoramas/11.jpeg" />
      <div class="text">
        <div>ZHDK</div>
        <p>Panorama-Studien. Toni-Areal. 2023.</p>
      </div>
      <img src="/panoramas/22.jpeg" />
    </div>
    <div id="fastlife">
      <img src="/portraits/1.jpeg" />
      <img src="/portraits/2.jpeg" />
      <img src="/portraits/3.jpeg" />
      <img src="/portraits/4.jpeg" />
    </div>
  </div>
  <button id="home" @click="scrollToTop()">Home</button>
</template>

<script setup>
const scrollToTop = () => {
  document.getElementById("scrollIntoView").scrollIntoView();
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
      threshold: 0.5, // Adjust as needed
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss">
:root {
  --font: 9pt "Segoe UI", "SegoeUI", "Noto Sans", sans-serif;
  --surface: #f0f0f0;

  --button-highlight: #fff;
  --button-face: #eee;
  --button-face-hover: #e5f4fd;
  --button-face-active: #cee9f8;
  --button-face-disabled: #f4f4f4;
  --button-shade-light: #ddd;
  --button-shade-light-default: #c3dcea;
  --button-shade-light-hovered: #b3e0f9;
  --button-shade-light-active: #86c6e8;
  --button-shade-dark: #bbb;
  --button-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.8),
    inset 0 1px 1px #fff;
  --button-border: 1px solid;
  --button-border-color: #8e8f8f;
  --button-border-color-default: #5586a3;
  --button-border-color-hovered: #3c7fb1;
  --button-border-color-active: #6d91ab;
  --button-border-color-disabled: #aeb2b5;
  --button-text-color-disabled: #838383;
  --button-gradient: linear-gradient(
    to bottom,
    var(--button-face) 45%,
    var(--button-shade-light) 45%,
    var(--button-shade-dark)
  );
  --button-gradient-hovered: linear-gradient(
    to bottom,
    var(--button-face-hover) 45%,
    var(--button-shade-light-hovered) 45%
  );
  --button-gradient-active: linear-gradient(
    to bottom,
    var(--button-face-active) 45%,
    var(--button-shade-light-active) 45%
  );

  --element-spacing: 8px;
  --grouped-element-spacing: 6px;

  --border-radius: 3px;
  --border-width: 1px;
}

button,
[role="button"] {
  font: var(--font);
  box-sizing: border-box;
  border: var(--button-border);
  border-color: var(--button-border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--button-shadow);
  color: #222;
  min-width: 75px;
  min-height: 23px;
  padding: 0 12px;
  text-align: center;
  background: var(--button-gradient);

  &:disabled {
    background: var(--button-face-disabled);
    border-color: var(--button-border-color-disabled);
    color: var(--button-text-color-disabled);
  }

  &:not(:disabled) {
    &:hover {
      border-color: var(--button-border-color-hovered);
      background: var(--button-gradient-hovered);
    }

    &:active,
    &.active {
      box-shadow: none;
      border-color: var(--button-border-color-active);
      background: var(--button-gradient-active);
    }
  }

  &:focus,
  &.focused {
    box-shadow: inset 0 0 0 2px var(--button-shade-light-active);
    outline: 1px dotted #000000;
    outline-offset: -4px;
  }

  &.default {
    box-shadow: inset 0 0 0 1px #34deff;
    border-color: var(--button-border-color-default);
    background: linear-gradient(
      to bottom,
      var(--button-face) 45%,
      var(--button-shade-light-default) 45%
    );
  }
}

html,
body {
  font-family: "Helvetica", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
}

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
}

.text {
  background-color: black;
  min-width: 100vw;
  width: 100vw;
  div {
    color: red;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
  }
  p {
    font-size: 3.1dvw;
    color: white;
    margin: 0;
    padding: 5px;
    padding-right: 40px;
  }
}

#home {
  position: fixed;
  left: 20px;
  top: 20px;
}

#container::-webkit-scrollbar,
#container > div::-webkit-scrollbar {
  display: none;
}
</style>
