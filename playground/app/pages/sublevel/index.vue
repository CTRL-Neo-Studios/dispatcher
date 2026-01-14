<script setup lang="ts">
const dp = useCustomEventDispatcher()
dp.listen('app.window.newFile', () => {
	console.log(`received newFile on ${useRoute().path}`)
})
</script>

<template>
	<button @click="dp.call">sublevelcall</button>
	<button @click="dp.newfile()">newfile</button>
	<NuxtLink to="/">index</NuxtLink>
	<NuxtLink to="/sublevel/subsublevel">subsublevel</NuxtLink>
</template>

<style scoped>

</style>
