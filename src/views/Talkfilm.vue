<template>
    <div>
        <div class="imgbox"><img src="../assets/adv.jpg" alt=""></div>

        <!-- 明星列表  -->
        <div class="starlist">
            <h5>演职人员</h5>
            <div class="startBox">
                <div class="starContent">
                    <div class="starImg">
                    <img src="../assets/img/star/star01.jpg" alt="">
                    <p class="mui-ellipsis">凯尔·钱德勒</p>
                    </div>
                    <div class="starImg">
                        <img src="../assets/img/star/star02.jpg" alt="">
                        <p class="mui-ellipsis">维拉·法梅加</p>
                    </div>
                    <div class="starImg">
                        <img src="../assets/img/star/star03.jpg" alt="">
                        <p class="mui-ellipsis">米莉·波比·布朗</p>
                    </div>
                </div>
            </div>
        </div>    
        <!-- 明星列表  -->

        <!-- 评论 -->
        <div class="title">
		    讨论
		</div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../assets/img/star/star06.jpg">
						<div class="mui-media-body">
						    莎莉·霍金斯
                             <span class="mui-icon mui-icon-star-filled" v-for="index in 2" :key="index"></span>
                            <p class="datetime">2019-04-12</p>
							<p class="talking" style="height:auto;">常规的商业大片，但因其事件背景和中东风情让人着迷，还不错</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../assets/img/star/star05.jpg">
						<div class="mui-media-body">
							 章子怡
                                <span class="mui-icon mui-icon-star-filled" v-for="index in 3" :key="index"></span>
                              <p class="datetime">2019-04-12</p>
							<p style="word-break:break-word;">真实事件改编的电影，最难能可贵的就是做到极尽真实的还原，逃离德黑兰做到了这一点，并且精细的程度让人感动。 电影的节奏上处理的也非常得当，不拖沓，很紧凑，在最后关头，真的是做到了令人窒息的紧张感。 大本简直是堕落凡尘的天使，如此的才华，如此的精致，又那么的英俊。</p>
						</div>
					</a>
				</li>
                <li class="mui-table-view-cell mui-media" v-for="(item,i) in talklistchild" :key="i">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../assets/img/star/my.jpg">
						<div class="mui-media-body">
							{{item.name}}
                                 <span class="mui-icon mui-icon-star-filled" v-for="index in 3" :key="index"></span>
                              <p class="datetime">{{item.time | dateFormat}}</p>
							<p style="word-break:break-word;">{{item.content}}</p>
						</div>
					</a>
				</li>
			</ul>
        <!-- 评论 end-->
    
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props:['talklistchild'],
    created() {
        
    },
}
</script>

<style lang="scss" scoped>
    .imgbox{
        width:90%;
        height: 70px;
        margin:0 auto; 
        margin-top: 10px;
        // overflow: hidden;
        border-radius: 50px;
        img{
            display: block;
            width:100%;
        height: 70px;
        }
    }
    .starlist{
        margin-top:10px;
        // margin-bottom:55px;
        background-color: #fff;
        text-align: center;
        h5{  
            padding-top: 5px;
            text-align: left;
        }
        .startBox{
            height: 110px;
            overflow: hidden;
            .starContent{
                // width:auto;
                .starImg{
                    float: left; 
                    padding-left:10px;    
                    img{  
                        display: block;
                        width: 80px;
                        height: 90px;
                    }
                    p{
                        text-align: center;
                    }
                }
            }
        }
    }
    // 讨论
    .title{
         margin-top:10px;
        background-color: #fff;
        color:grey;
        font-size: 16px;

    }
    .mui-table-view{
        font-size: 12px;
        img{
        border-radius: 50%;

        }
        .datetime{
            font-size:10px;
        }
        .mui-icon-star-filled{
            font-size: 10px;
            color: orangered;
        }
        .talking{
            display: inline-block;
            word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
        }
    }

    .mui-table-view-cell > a:not(.mui-btn) {
    position: relative;
    display: block;
    overflow: hidden;
    margin: -11px -15px;
    padding: inherit;
     white-space: normal; 
    text-overflow: ellipsis;
    color: inherit;
}
.mui-table-view .mui-media, .mui-table-view .mui-media-body {
    overflow: auto;
}
    // 讨论end
</style>