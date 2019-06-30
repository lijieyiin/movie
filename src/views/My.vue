<template>
    <div>
        <mt-header fixed title="我的"></mt-header>
        <div class="my">
			<div class="my_pic">
				<img src="../assets/my.jpg" alt="">
			</div>
			<div class="my_name">
				<p>刺猬</p>
			</div>

		</div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<router-link tag="a" class="mui-navigate-right" to="/order">
						我的订单
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link tag="a" class="mui-navigate-right" to="/collect">
						我的收藏
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						我的客服
					</a>
				</li>
			</ul>
    </div>
</template>

<script>
export default {
    created() {
    this.$store.state.showbottomNav = true;
  },
}
</script>

<style lang="scss" scoped>
header{
  background-color: #E56D57;
}
.my{
	background-color: #fff;
	.my_pic{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto ;
		overflow: hidden;
		img{
			display: block;
			width: 100px;
		height: 100px;
		}
	}
	.my_name{
		width: 50px;
		text-align: center;
		margin: 0 auto;
		p{
			padding:5px;
			color: black;
			font-size: 16px;

		}
	}
}
</style>

