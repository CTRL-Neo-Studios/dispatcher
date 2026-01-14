<script setup lang="ts">
const dp = useCustomEventDispatcher()
dp.dispatch.on('app.window.openFile', (data) => {
	console.log(`received openFile on ${useRoute().path} with payload: `, data)
})
dp.listen('app.window.newFile', () => {
	console.log(`received newFile on ${useRoute().path}`)
})
</script>

<template>
	<NuxtLink to="/sublevel">sublevel</NuxtLink>
</template>

<style scoped>

</style>
