<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="contacts">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				{{data}}
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
