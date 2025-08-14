<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Header Test -->
    <div class="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <h1 class="text-3xl font-bold">🎉 Tailwind CSS Test</h1>
      <p class="text-blue-100 mt-2">If you see colors and styling, Tailwind is working!</p>
    </div>

    <!-- Color Test -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-red-500 text-white p-4 rounded-lg text-center">
        <h3 class="font-bold">Red Box</h3>
        <p class="text-sm">bg-red-500</p>
      </div>
      <div class="bg-green-500 text-white p-4 rounded-lg text-center">
        <h3 class="font-bold">Green Box</h3>
        <p class="text-sm">bg-green-500</p>
      </div>
      <div class="bg-purple-500 text-white p-4 rounded-lg text-center">
        <h3 class="font-bold">Purple Box</h3>
        <p class="text-sm">bg-purple-500</p>
      </div>
    </div>

    <!-- Button Test -->
    <div class="space-x-4 mb-6">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Primary Button
      </button>
      <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Secondary Button
      </button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Success Button
      </button>
    </div>

    <!-- Card Test -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Card Component</h2>
      <p class="text-gray-600 mb-4">
        This is a test card with shadow, padding, and rounded corners.
      </p>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="text-sm text-gray-500">Status: Tailwind Working</span>
      </div>
    </div>

    <!-- Responsive Test -->
    <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <span class="text-yellow-500 text-xl">⚠️</span>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            <strong>Responsive Test:</strong> Try resizing your browser window.
            The grid above should change from 1 column to 3 columns on larger screens.
          </p>
        </div>
      </div>
    </div>

    <!-- Typography Test -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">H1 - Text 4XL</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-2">H2 - Text 3XL</h2>
      <h3 class="text-2xl font-medium text-gray-700 mb-2">H3 - Text 2XL</h3>
      <p class="text-base text-gray-600 mb-2">Regular paragraph text</p>
      <p class="text-sm text-gray-500 mb-2">Small text</p>
      <p class="text-xs text-gray-400">Extra small text</p>
    </div>

    <!-- Status Message -->
    <div class="mt-8 text-center">
      <div class="inline-flex items-center px-4 py-2 bg-green-100 border border-green-400 rounded-lg">
        <span class="text-green-500 mr-2">✅</span>
        <span class="text-green-700 font-medium">
          If you see all the colors and styling above, Tailwind CSS is working perfectly!
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView'
}
</script>