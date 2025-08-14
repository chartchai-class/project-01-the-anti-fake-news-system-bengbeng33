<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>