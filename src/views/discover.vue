<template lang='pug'>
#discover
  mt-header(title='随机干货', fixed, :style='{backgroundColor: headerBg}')
  .container
    contents(:type='"random"')
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
};

</script>

<stype lang="scss" scoped>

</style>
