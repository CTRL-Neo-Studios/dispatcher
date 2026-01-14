<script setup lang="ts">
const dp = useCustomEventDispatcher()
dp.listen('app.window.newFile', () => {
	console.log(`received newFile on ${useRoute().path}`)
})

definePageMeta({
	layout: 'sublevellayout'
})
</script>

<template>
	<button @click="dp.call">subsublevelcall</button>
	<button @click="dp.newfile()">newfile</button>
	<NuxtLink to="/sublevel">tosublevel</NuxtLink>
</template>

<style scoped>

</style>
