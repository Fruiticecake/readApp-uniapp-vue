<script setup>
	import { ref } from 'vue'
	let props = defineProps({
		contents:String
	})
</script>
<template>
	<view>
		{{props.contents}}||11
	</view>
</template>

<style lang="scss">

</style>
