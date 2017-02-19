<template lang="pug">
#theme(:style='mode')
  mt-header(title='主题色', fixed, :style='themeBg')
    router-link(:to="{name: 'my'}" slot="left")
      mt-button(icon="back")
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
      'mode',
    ]),
    ...mapState([
      'theme',
    ]),
    themeBg() {
      return {
        backgroundColor: this.theme,
        borderColor: this.mode.cellBg,
      };
    },
  },
  methods: {
    setTheme(color) {
      this.$store.commit('updateTheme', color);
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

<style lang="scss">
#theme {
  overflow-y: hidden;
}

.colors-container {
  position: relative;
  margin-top: 150px;
  margin: 150px auto;
  width: 20em;
  height: 20em;
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
  }
}

</style>
