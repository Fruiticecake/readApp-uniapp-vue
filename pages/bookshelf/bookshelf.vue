<template>
	<view>
		<uni-search-bar :radius="20" clearButton="auto" cancelButton="none"></uni-search-bar>
		<view class="bookshelf">
			<view class="books">
				<view class="book-item" v-for="localBook in localBooks" :key="localBook.bookId" hover-class="book-hover"
					@click="openBook">
					<img class="book-image" src="http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg" alt="">
					<view class="book-text">
						<view>
							<text user-select="true" style="font-size: 15px;font-weight: 400">
								{{localBook.name}}
							</text>
							<text style="font-size: 12px;font-weight: 400;color: #8f939c;">
								(未读{{localBook.pageNow}}章，新增0章)
							</text>
						</view>
						<text style="margin-top: 5px;font-size: 12px;font-weight: 400;color: #8f939c;">
							{{localBook.pageNow}}/{{localBook.pageNum}} | {{localBook.pageNew}}
						</text>
					</view>
					<uni-icons type="more-filled" class="book-icons" color="#8f939c"></uni-icons>
				</view>
			</view>
			<button @click="clickText">{{bookContents.value}}</button>
			{{bookContents.value}}
			<bookdetails :contents="bookContents" />
		</view>
	</view>
</template>

<script setup>
	import bookdetails from '@/pages/bookdetails/bookdetails.vue';
	import { ref ,reactive } from 'vue'
	const localBooks = [{
			name: '百年孤独',
			bookId: '7550',
			img: 'http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg',
			path: './百年孤独/第八章.txt',
			pageNow: 112,
			pageNum: 223,
			pageNew: '布恩迪亚家族人物表',
		},
		{
			name: '百年孤独',
			img: 'http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg',
			bookId: '7550',
			path: '',
			pageNow: 112,
			pageNum: 223,
			pageNew: '第二章',
		},
		{
			name: '百年孤独',
			img: 'http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg',
			bookId: '7550',
			path: '',
			pageNow: 112,
			pageNum: 223,
			pageNew: '布恩迪亚家族人物表',
		},
		{
			name: '百年孤独',
			img: 'http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg',
			bookId: '7550',
			path: '',
			pageNow: 112,
			pageNum: 223,
			pageNew: '第二十章',
		}
	]

	//href="/plus/down.php?p=MTk0NTk="
	let bookContents = reactive({value:'1'})
	function clickText(){
		this.bookContents.value = bookContents.value;
	}
	function openBook(path) {
		let that = this
		wx.chooseMessageFile({
			type: 'file',
			success(res) {
				const tempFilePaths = res.tempFiles[0].path;
				const fs = wx.getFileSystemManager();
				console.log((tempFilePaths))
				fs.readFile({
					filePath: `${tempFilePaths}`,
					encoding: 'utf-8',
					success(res) {
						const data = res.data
						bookContents = data
						uni.navigateTo({
							url: '../bookdetails/bookdetails?item=' + encodeURIComponent(JSON
								.stringify(data))
						})
						console.log(bookContents)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		})
	}
</script>

<style lang="scss">
	.bookshelf {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.books {
		width: 100%;
		height: 12%;
	}

	.book-item {
		display: flex;
		flex-direction: row;
		padding: 15px;
	}

	.book-image {
		width: 50px;
		height: 60px;
		border-radius: 5px;
		box-shadow: -1px 2px 3px 1px darkgrey;
	}

	.book-text {
		display: flex;
		flex-direction: column;
		margin-left: 15px;
		padding-top: 5px;
	}

	.book-icons {
		position: relative;
		left: 70px;
		bottom: 20px;
		transform: rotate(90deg);
	}

	.book-hover {
		background-color: #d4d4d4;
	}
</style>
