<template>
  <div class="wrapper bg-yellow">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[10, 10, 10]"
        :args="[45, 1, 0.1, 1000]"
      />
      <OrbitControls />
      <Suspense>
        <Text3D
          :text="myReactiveText"
          font="/Jost__Regular.json"
          center
          need-updates
        >
          <MeshGlassMaterial />
        </Text3D>
      </Suspense>
      <TresAmbientLight :color="0xffffff" :intensity="0.5" />
    </TresCanvas>
  </div>
</template>

<script setup>
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";
const gl = reactive({
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
});

const { onLoop } = useRenderLoop();
const sphereRef = shallowRef(null);
const myReactiveText = ref("Hello World!");

onLoop(({ delta, elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.rotation.y += delta;
    sphereRef.value.rotation.z = elapsed * 0.2;
    sphereRef.value.position.x += 0.001;
    sphereRef.value.position.y += 0.001;
  }
});
</script>
