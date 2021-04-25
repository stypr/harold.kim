<template>
  <Renderer
    ref="renderer"
    antialias
    resize="window"
    :orbit-ctrl="{
      enableDamping: true,
      dampingFactor: 0.5,
      autoRotate: true,
      enabled: false,
    }"
    shadow
  >
    <Camera
      ref="camera"
      :position="{ y: 0, z: 100 }"
      :look-at="{ x: 0, y: 0, z: 0 }"
    />
    <Scene background="#002000">
      <SpotLight
        color="#00fc00"
        :intensity="0.3"
        :position="{ y: 150, z: 0 }"
        :cast-shadow="true"
        :shadow-map-size="{ width: 1024, height: 1024 }"
      />
      <SpotLight
        color="#00fe00"
        :intensity="0.5"
        :position="{ y: -150, z: 0 }"
        :cast-shadow="true"
        :shadow-map-size="{ width: 1024, height: 1024 }"
      />
      <InstancedMesh
        ref="imesh"
        :count="NUM_INSTANCES"
        :cast-shadow="true"
        :receive-shadow="true"
      >
        <BoxGeometry :width="3" :height="3" :depth="3" />
        <PhongMaterial />
      </InstancedMesh>
      <Text
        text="stypr"
        font-src="/font.json"
        align="center"
        :size="20"
        :height="5"
        :position="{ x: 0, y: 0, z: 0 }"
        :cast-shadow="true"
      >
        <PhongMaterial />
      </Text>
    </Scene>
    <EffectComposer>
      <RenderPass />
      <UnrealBloomPass :strength="2" />
    </EffectComposer>
  </Renderer>
</template>
<script>
import { Object3D, MathUtils } from 'three';
import {
  Camera,
  EffectComposer,
  BoxGeometry,
  InstancedMesh,
  PhongMaterial,
  Renderer,
  RenderPass,
  SpotLight,
  Scene,
  Text,
  UnrealBloomPass,
} from 'troisjs';

export default {
  setup() {
    return {
      NUM_INSTANCES: 1000,
    };
  },
  components: {
    Camera,
    EffectComposer,
    BoxGeometry,
    InstancedMesh,
    PhongMaterial,
    Renderer,
    RenderPass,
    SpotLight,
    Scene,
    Text,
    UnrealBloomPass,
  },
  mounted() {
    const imesh = this.$refs.imesh.mesh;
    const dummy = new Object3D();
    const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
    for (let i = 0; i < this.NUM_INSTANCES; i++) {
      dummy.position.set(rndFS(200), rndFS(200), rndFS(200));
      const scale = rnd(0.3, 1);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      imesh.setMatrixAt(i, dummy.matrix);
    }
    imesh.instanceMatrix.needsUpdate = true;
  },
  updated() {
    const camera = this.$refs.camera;
    if (camera.camera) {
      // Changing position x and z can change the location of the Camera
      camera.camera.position.y = 0;
    }
    const el = this.$refs.container;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
}
</script>
