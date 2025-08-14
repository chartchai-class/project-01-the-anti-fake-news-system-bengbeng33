<template>
  <div>
    <h1>Vote</h1>
    <p>Vote on news ID: {{ id }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VoteView',
  props: ['id']
}
</script>