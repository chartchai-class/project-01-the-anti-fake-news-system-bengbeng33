<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="text-2xl">🛡️</div>
              <h1 class="text-xl font-bold text-gray-900">
                Social Anti-Fake News
              </h1>
            </router-link>
          </div>
          <nav class="flex space-x-8">
            <router-link
              to="/"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'home' }"
            >
              Home
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-gray-600 text-sm">
          © 2025 Social Anti-Fake News System. Built for SE331 Component-Based
          Software Development.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
