<template lang='pug'>
#discover
  mt-header(title='随机干货', fixed, :style='themeBg')
  .container
    contents(:type='"random"', ref='random')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import contents from 'components/contents';

export default {
  name: 'discover',
  components: {
    contents,
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
      };
    },
  },
  mounted() {
    const container = this.$refs.random.$el;
    const scrollY = this.$store.state.random.scrollY;

    container.scrollTop = scrollY;
    this.$store.commit('updateAppSelected', 1);
  },
  beforeDestroy() {
    const container = this.$refs.random.$el;
    this.$store.commit('updateScrollY', {
      type: 'random',
      scrollY: container.scrollTop,
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
}
</style>
