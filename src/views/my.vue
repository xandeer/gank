<template lang="pug">
#my
  mt-header(title='我的', fixed, :style='{backgroundColor: headerBg}')
  .container
    mt-cell(title='夜间模式', :style='theme')
      mt-switch(v-model='nightSwitch')
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'my',
  data() {
    return {
      nightSwitch: this.isNight,
    };
  },
  computed: {
    ...mapState([
      'isNight',
    ]),
    ...mapGetters([
      'theme',
    ]),
    headerBg() {
      return this.theme.headerBg;
    },
  },
  watch: {
    nightSwitch(val) {
      if (val) {
        this.$store.commit('updateNight', true);
      } else {
        this.$store.commit('updateNight', false);
      }
    },
  },
  created() {
    this.nightSwitch = this.isNight;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 140px;
}

.mint-cell {
  text-align: left;
}
</style>
