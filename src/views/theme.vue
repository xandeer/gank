<template lang="pug">
#theme(:style='modeStyle')
  mt-header(title='主题色', fixed, :style='themeBg')
    router-link(:to="{name: 'my'}" slot="left")
      mt-button(icon="back")
  .theme-container
    .colors-container
      ul
        li.color-block(v-for='(color, index) in themes', :style='setItem(index)', @click='setTheme(color)')
      .choice-color(:style='themeBg')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { themes } from '../config';

export default {
  name: 'theme',
  data() {
    return {
      themes,
    };
  },
  computed: {
    ...mapGetters([
      'modeStyle',
    ]),
    ...mapState([
      'theme',
    ]),
    themeBg() {
      return {
        backgroundColor: this.theme,
        borderColor: this.modeStyle.cellBg,
      };
    },
  },
  methods: {
    setTheme(color) {
      this.$store.commit('updateTheme', color);
      this.$localStorage.set('theme', color);
    },
    setItem(index) {
      const rotate = `${(index * 360) / this.themes.length}deg`;
      const skew = `${90 - (360 / this.themes.length)}deg`;

      return {
        backgroundColor: this.themes[index],
        transform: `rotate(${rotate}) skew(${skew})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#theme {
  height: 100vh;
  width: 100vw;
  z-index: 10;
  position: fixed;
  padding-top: 50px;
  overflow: auto;
  padding-right: 110vw;
  margin-right: -110vw;
}

.theme-container {
  position: absolute;
  margin-right: 20vw;
  padding-top: 150px;
  width: 20em;
  height: calc(20em + 200px);
  left: calc(50% - 5vw);
  top: 50%;
  transform: translate(-50%, -50%);
}

.colors-container {
  position: absolute;
  width: 100%;
  height: calc(100% - 200px);
  border-radius: 50%;
  overflow: hidden;

  .choice-color {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1em solid #fff;
    background: #ccc;
  }

  ul {
    list-style: none;
    width: 100%;
    height: 100%;
  }

  li {
    position: absolute;
    width: 50%;
    height: 50%;
    transform-origin: 100% 100%;
    left: 50%;
    top: 50%;
    margin-left: -50%;
    margin-top: -50%;
    -webkit-tap-highlight-color: transparent;
  }
}

</style>
