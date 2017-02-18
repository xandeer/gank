<template lang="pug">
#theme(:style='mode')
  mt-header(title='主题色', fixed, :style='themeBg')
    router-link(:to="{name: 'my'}" slot="left")
      mt-button(icon="back")
  .colors-container
    .color-block(v-for='(color, index) in themes', :style='{backgroundColor: color}', @click='setTheme(index)')
</template>

<script>
import { mapGetters } from 'vuex';
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
      'theme',
    ]),
    themeBg() {
      return {
        backgroundColor: this.theme,
      };
    },
  },
  methods: {
    setTheme(index) {
      this.$store.commit('updateThemeIndex', index);
    },
  },
};
</script>

<style lang="scss">
#theme {
  overflow-y: hidden;
}

.colors-container {
  margin-top: 60px;
  padding-bottom: 110px;
  margin-right: -100px;
  padding-right: 100px;
  height: 100vh;
  overflow: auto;
}

.color-block {
  width: 100%;
  height: 80px;
  border-radius: 10px;
}
</style>
