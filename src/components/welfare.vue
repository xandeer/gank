<template lang='pug'>
#container-welfare
  contents(:type='"welfare"')
</template>

<script>
import contents from 'components/contents';

export default {
  name: 'welfare',
  components: {
    contents,
  },
};
</script>
