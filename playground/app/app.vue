<template>
	<NuxtLoadingIndicator/>
	<NuxtLayout>
		<button @click="dp.call">appcall</button>
		<NuxtPage/>
	</NuxtLayout>
</template>

<script setup lang="ts">

const dp = useCustomEventDispatcher()

dp.dispatch.on('app.window.openFile', (data) => {
	console.log(`received openFile on ${useRoute().path} with payload: `, data)
})
</script>
