<script setup lang="ts">
const dp = useCustomEventDispatcher()
dp.dispatch.on('app.window.openFile', (data) => {
	console.log(`received openFile on ${useRoute().path} in sublevellayout with payload: `, data)
})
</script>

<template>
	<slot/>
</template>

<style scoped>

</style>
