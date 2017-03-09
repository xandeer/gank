<template lang="pug">
#theme(:style='modeStyle')
  mt-header(title='主题色', fixed, :style='themeBg')
    router-link(:to="{name: 'my'}" slot="left")
      mt-button(icon="back")
  .color-picker
    choice-color(:colors='themes', :radius="radius", @updateColor='setTheme')
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
      radius: '3.75rem',
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
  created() {
    window.addEventListener('resize', () => {
      this.radius = window.innerHeight < window.innerWidth ? '2.75rem' : '3.75rem';
    });
  },
};
</script>

<style lang="scss" scoped>
#theme {
  height: 100vh;
  width: 100vw;
  z-index: 10;
  position: fixed;
}

.color-picker {
  position: absolute;
  height: calc(100vh - 3em * 1.25);
  width: 100%;
  top: calc(3em * 1.25);
  left: 50%;
  transform: translateX(-50%);
}
</style>
