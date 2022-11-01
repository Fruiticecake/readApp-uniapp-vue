<template>
	<view>
		<uni-search-bar :radius="20" @confirm="search" clearButton="auto" cancelButton="none"></uni-search-bar>
		<!--<button @click="callco">发送测试</button>-->
		<view class="wrap">
			<view class="card_wrap" >
				<view class="card_item" @click="chargeBook" v-for="(item,index) in classify" :key="item.id">
					<button class="card_content" v-bind:style="{'background-color':item.style}">
						<text>{{item.name}}</text>
					</button>					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				classify:[
					{id:0,name:'玄幻',style:'background-color:#2979ff'},
					{id:1,name:'科幻',style:'#94bcff'},
					{id:2,name:'仙侠',style:'#d4e4ff'}
				]
			}
		},
		onLoad() {

		},
		onPullDownRefresh(){
			console.log('页面刷新成功')
		},
		methods: {
			async callco(){
				const co1 = uniCloud.importObject('col')
				let res = await co1.say("Hello,I'm")
				uni.showModal({
					content:JSON.stringify(res),
					showCancel:false
				});
			},
			search(res){
				uni.showToast({
					title:'fasong'+res.value,
					icon:'none'
				})
			},
			chargeBook(){
				uni.showToast({
					title:'你成功打开了玄幻分类',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #fff;
	}
	.wrap{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		margin: 20px;
	}
	.card_wrap{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.card_item{
		flex-basis: 33%;
		padding: 0px 5px;
		box-sizing: border-box;
	}
	.card_content{
		background-color: #a8edea;
		border-radius: 10px;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 2px 2px grey;
	}

</style>
