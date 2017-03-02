<template lang="pug">
#theme(:style='modeStyle')
  mt-header(title='主题色', fixed, :style='themeBg')
    router-link(:to="{name: 'my'}" slot="left")
      mt-button(icon="back")
  choice-color(:colors='themes', radius="10em", @updateColor='setTheme')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import choiceColor from 'vue-circle-choice';
import { themes } from '../config';

export default {
  name: 'theme',
  components: {
    choiceColor,
  },
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
    setTheme({ color }) {
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
  overflow: auto;
  padding-right: 110vw;
  margin-right: -110vw;
}

.theme-container {
  left: calc(50% - 5vw);
  @media screen and (orientation: landscape) {
    margin-top: 25px;
  }
}
</style>
