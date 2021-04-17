<template>
  <div class="menu-left">
    <div id="nav">
      <router-link to="/">Home</router-link><br>
      <router-link to="/about">About</router-link><br>
      <router-link to="/blog">Blog</router-link><br>
      <router-link to="/donate">Donate</router-link><br>
      <router-link to="/service">Services</router-link><br>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
  <div class="menu-bottom" style="letter-spacing: 0.1em; text-transform:none; text-align:center;">
    <a href="//github.com/stypr/harold.kim">Made with &hearts;</a><br>
    <small>commit: {{GIT_HASH}}</small>
  </div>
  <div class="container" ref="container" v-if="isPath">
    <router-view/>
  </div>
  <Renderer ref="renderer" antialias resize="window" :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.5, autoRotate: true , enabled: false }" shadow>
    <Camera ref="camera" :position="{ y: 0, z: 100 }" :look-at="{ x: 0, y: 0, z: 0 }" />
    <Scene background="#002000">
      <SpotLight color="#00fc00" :intensity="0.3" :position="{ y: 150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <SpotLight color="#00fe00" :intensity="0.5" :position="{ y: -150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <InstancedMesh ref="imesh" :count="NUM_INSTANCES" :cast-shadow="true" :receive-shadow="true">
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
<style>
  html, body {
    background:transparent;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Lato, 'Noto Sans KR', snas-serif;
  }

  body {
    padding:0;
    margin: 0;
    overflow: hidden;
  }

  canvas{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: -1 !important;
  }
  
  #app {
    background: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
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

  .menu-left > #nav {
    padding: 30px;
  }

  .menu-left > #nav a {
    font-weight: bold;
    color: #fff;
    line-height: 1.8em;
    text-decoration: none; 
  }

  .menu-left > #nav a.router-link-exact-active {
    color: #42b983;
  }

  .menu-bottom {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: Lato;
    position: fixed;
    right: 0;
    bottom: 0;
    padding: .6rem;
    background-color: #000000cc;
    color: #fff;
    text-align: left;
    font-size: 1rem;
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

  #app > .container a, .menu-bottom a {
    color: #fff;
  }

  #app > .container a:hover, .menu-bottom a:hover {
    color: #fee;
     text-shadow: 0 0 10px #70f030;
  }

  .block {
    display: none;
  }
  .padded {
    padding: 30px;
  }

  @media(max-width:800px){
    body{
      overflow-y:scroll;
      margin-left:0;
      margin-right:0;
    }
    #app {
      width: 100%;
      height: 100%;
      background:transparent;
    }
    #app > .container {
      position: relative;
      left: 0px;
      top: 0px;
      width: 100%;
      min-height: 100%;
      height: auto;
    }
    .menu-left {
      background:#000000cc;
      position: relative;
      min-height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .menu-left #nav {
      background: transparent;
      margin: 0 auto;
      position: absolute;
      z-index: 1!important;
      width: 100%;
      height: 50%;
      text-align: center;
      padding: 0;
      top: 50%;
      margin-top: -10rem;
    }
    .menu-left #nav a{
      font-size: 2rem;
    }
    .menu-left #nav br{
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
      SpotLight,
      Scene,
      Text,
      UnrealBloomPass,
    },
    setup() {
      return {
        NUM_INSTANCES: 1000,
        GIT_HASH: VUE_APP_GIT_HASH[0],
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
      },
    },
    updated() {
      const camera = this.$refs.camera;
      /*
      if(renderer.renderer){
        renderer.renderer.setSize(window.innerWidth, window.innerHeight);
      } // .resize("window"));
      */
      if(camera.camera){
        camera.camera.position.x = 0;
        camera.camera.position.y = 0;
        camera.camera.position.z = 100;
      }
      const el = this.$refs.container;
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
  };
</script>