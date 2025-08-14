<template>
  <div>
    <h1>News Detail</h1>
    <p>News ID: {{ id }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewsDetailView',
  props: ['id']
}
</script>