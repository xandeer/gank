<template lang="pug">
.welfare
  li.welfare-item(v-for='item in datas', :style='setBgImg(item.url)', @click='showMask(item.url)')
</template>

<script>
export default {
  name: 'welfare',
  props: {
    datas: {
      type: Array,
      require: true,
    },
  },
  methods: {
    setBgImg(url) {
      return {
        backgroundImage: `url(${url})`,
      };
    },
    showMask(url) {
      this.$store.commit('updateMaskImage', url);
      this.$store.commit('updateMaskVisibility', true);
    },
  },
};
</script>

<style lang='scss'>
.welfare {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .welfare-item {
    flex: 1 0 50%;
    height: 15em;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 2px solid hsla(220, 7%, 25%, 1.00);
  }

  .welfare-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    // position: absolute;
    top: 0;
    z-index: 99;
    background-color: hsla(220, 7%, 25%, 0.9);
    // background-color: #000;
  }
}

</style>
