<template>
  <div>
    <h1>Comments</h1>
    <p>Comments for news ID: {{ id }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommentsView',
  props: ['id']
}
</script>