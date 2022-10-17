<template>
  <div>
    <nav class="flex flex-row justify-between py-3 px-6 shadow sticky top-0">
      <router-link to="/" class="flex flex-row">
        <div class="h-10 w-10  mr-2 self-center">
          <img class="h-10 w-10 rounded-lg" src="../static/logo.jpg">
        </div>
        <div>
          <p class="text-2xl no-underline font-bold">
            Avatar
          </p>
          <p class="text-sm	no-underline">
            By Soixante Circuits
          </p>
        </div>
      </router-link>
      <div class="self-center">
        <router-link class="bg-emerald-500 hover:bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium text-lg" to="media">
          Try Avatar
        </router-link>
      </div>
    </nav>
  </div>
</template>
