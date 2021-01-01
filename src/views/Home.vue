<template>
  <div class="home">
    <app-bar />
    <header-section />
  </div>
</template>

<script>
import AppBar from '@/components/core/AppBar';
import Header from '@/components/partials/Header';

export default {
  name: 'Home',
  components: {
    "app-bar": AppBar,
    "header-section": Header,
  }
}
</script>
