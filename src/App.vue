<template>
  <div class="menu-left">
    <div id="nav">
      <router-link to="/">Home</router-link><br>
      <router-link to="/about">About</router-link><br>
      <router-link to="/blog">Blog</router-link><br>
      <router-link to="/donate">Donate</router-link><br>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
  <div class="container" v-if="isPath">
    <router-view/>
  </div>
  <Renderer ref="renderer" antialias resize="window" :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.5, autoRotate: true , enabled: false }" shadow>
    <Camera ref="camera" :position="{ y: 0, z: 100 }" :look-at="{ x: 0, y: 0, z: 0 }" />
    <Scene background="#002000">
      <SpotLight color="#00fc00" :intensity="0.3" :position="{ y: 150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <SpotLight color="#00fe00" :intensity="0.5" :position="{ y: -150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <InstancedMesh ref="imesh" :count="NUM_INSTANCES" :cast-shadow="true" :receive-shadow="true">
        <SphereGeometry :radius="3" />
        <PhongMaterial />
      </InstancedMesh>
      <Text
        text="stypr"
        font-src="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
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
<style>
  html,body {
    background:transparent;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    font-family: Lato, 'Noto Sans KR', snas-serif;
  }
  canvas {
  }
  body {
    margin: 0;
    overflow: hidden;
  }

  #app {
    background: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #fff;
    line-height: 1.8em;
    text-decoration: none; 
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .menu-left {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: Lato;
    position: fixed;
    top: 0;
    left: 0;
    padding: .6rem;
    background-color: #000000cc;
    color: #fff;
    text-align: left;
    font-size: 1.2rem;
  }

  #app > .container {
    position:fixed;
    left: 190px;
    min-width: 800px;
    max-width: 1200px;
    background-color:#000000dd;
    color: #ffffff;
    min-width: 400px;
    height:100%;
    margin: 0px auto;
    overflow-y: auto;
  }

  #app > .container a {
    color: #fff;
  }
  #app > .container a:hover {
    color: #fee;
     text-shadow: 0 0 10px #70f030;
  }

  .block {
    display: none;
  }
  @media(max-width:800px){
    #app > .container {
      left: 0px;
      top: 105px;
      width: 100%;
      height: calc(100% - 105px);
    }
    body{
      margin-left:0;
      margin-right:0
    }
    .menu-left {
      width: 100%;
    }
    .menu-left #nav {
      padding: 30px 0px;
      text-align: center;
    }
    .menu-left #nav a{
      font-size: 0.9rem;
      padding: 0 8px;
    }
    .menu-left #nav br{
      display: none;
    }
    
  }
</style>
<script>
  console.log("Designed by stypr. (https://harold.kim/)");
  import { Object3D, MathUtils } from 'three';
  import {
    Camera,
    EffectComposer,
    InstancedMesh,
    PhongMaterial,
    Renderer,
    RenderPass,
    SphereGeometry,
    SpotLight,
    Scene,
    Text,
    UnrealBloomPass,
  } from 'troisjs';
  export default {
    components: {
      Camera,
      EffectComposer,
      InstancedMesh,
      PhongMaterial,
      Renderer,
      RenderPass,
      SphereGeometry,
      SpotLight,
      Scene,
      Text,
      UnrealBloomPass,
    },
    setup() {
      return {
        NUM_INSTANCES: 500,
      };
    },
    mounted() {
      // console.log(this.three);
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
    computed: {
      isPath() {
        return this.$route.name !== 'Home'
      }
    },
  };
</script>