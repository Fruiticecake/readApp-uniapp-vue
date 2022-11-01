<template>
	<view class="warn-text">
		<h1>当前页面不存在!</h1>
		<h2 style="color: cyan">2s后自动跳转回主页</h2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			let timer = setTimeout(()=>{
				clearTimeout(timer)
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},2000)
		},
		methods: {
			
		}
	}
</script>

<style>
	.warn-text{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 200rpx;
		padding-top: 10rpx;
	}
</style>
