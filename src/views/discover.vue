<template lang='pug'>
#discover
  mt-header(title='随机干货', fixed, :style='{backgroundColor: headerBg}')
  .container
    contents(:type='"random"', ref='random')
</template>

<script>
import { mapGetters } from 'vuex';
import contents from 'components/contents';

export default {
  name: 'discover',
  components: {
    contents,
  },
  computed: {
    ...mapGetters([
      'theme',
    ]),
    headerBg() {
      return this.theme.headerBg;
    },
  },
  mounted() {
    console.log(this.$refs);
    const container = this.$refs.random.$el;
    const scrollY = this.$store.state.random.scrollY;

    container.scrollTop = scrollY;
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
