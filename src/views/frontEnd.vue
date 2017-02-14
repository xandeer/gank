<template lang='pug'>
#front-end
  contents(:type='"前端"')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'frontEnd',
  components: {
    contents,
  },
};
</script>
