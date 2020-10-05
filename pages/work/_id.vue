<template>
	<div class="portfolio__page">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Портфолио
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li class="breadcrumbs-item"><nuxt-link to="/work" class="breadcrumbs-link">Портфолио</nuxt-link></li>
								<li><span class="breadcrumbs-link">Детали работы</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<CoolLightBox
				:items="imageArr"
				:index="index"
				@close="index = null">
			</CoolLightBox>
			<div class="work__top">
				<span class="style-x">Front end development</span>
				<h1>{{work.name}}</h1>
			</div>
			<el-row :gutter="30" class="mb2">
				<el-col :xs="24" :sm="12">
					<div class="work__image">
						<img :src="work.image[0].url" :alt="work.name" @click="index = 0">
					</div>
				</el-col>
				<el-col :xs="24" :sm="12">
					<div class="work__info" style="margin-bottom: 0;">
						<h3 class="work__title">Описание проекта</h3>
						<div class="work__description" v-html="work.description"></div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="30" class="mb2">
				<el-col :xs="24" :sm="12">
					<div class="work__info">
						<h3 class="work__title" @click="openPrev">Подробности</h3>
						<div class="work__meta" v-if="work.date">
							<span class="work__meta-title">Дата</span>
							<span class="work__meta-value">{{new Date(work.date) | dateFormat('MMMM YYYY')}}</span>
						</div>
						<div class="work__meta" v-if="work.site_link">
							<span class="work__meta-title">Сайт</span>
							<a class="work__meta-value" :href="work.site_link" target="_blank">Перейти <i class="el-icon-link"></i></a>
						</div>
						<div class="work__meta" v-if="work.repo_link">
							<span class="work__meta-title">Репозиторий</span>
							<a class="work__meta-value" :href="work.repo_link" target="_blank">Перейти <i class="el-icon-link"></i></a>
						</div>
						<div class="work__meta" v-if="work.tech">
							<span class="work__meta-title">Технологии</span>
							<span class="work__meta-value"><template v-for="(t,index) in work.tech"><template v-if="index">,</template> {{t}}</template></span>
						</div>
						<social-sharing :url="shareUrl" :title="work.name" :hashtags="techString" inline-template>
							<div class="work__share">
								<network class="default--hover" network="facebook">Facebook</network>
								<network class="default--hover" network="telegram">Telegram</network>
								<network class="default--hover" network="twitter">Twitter</network>
								<network class="default--hover" network="linkedin">LinkedIn</network>
							</div>
						</social-sharing>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" v-if="work.image[1]">
					<div class="work__image">
						<img :src="work.image[1].url" :alt="work.name" @click="index = 1">
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="30" class="mb2" v-if="work.image[2] || work.image[3]">
				<el-col :xs="24" :sm="12" v-if="work.image[2]">
					<div class="work__image">
						<img :src="work.image[2].url" :alt="work.name" @click="index = 2">
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" v-if="work.image[3]">
					<div class="work__image">
						<img :src="work.image[3].url" :alt="work.name" @click="index = 3">
					</div>
				</el-col>
			</el-row>
			<section class="work__neighbor">
				<a href="/" class="work__neighbor-link mr-auto" :class="{disabled: !nextWork.length}" @click.prevent="openNext">
					<i class="ui-decor"></i><br>
					Следующая<br> работа
				</a>
				<a href="/" class="work__neighbor-link ml-auto" :class="{disabled: !prevWork.length}" @click.prevent="openPrev">
					<i class="ui-decor"></i><br>
					Предыдущая<br> работа
				</a>
				<span class="work__neighbor--decore"></span>
			</section>
			<section class="work__comments">
				<h2 class="comment__title">Комментарии</h2>
				<div class="comment__list" v-if="work.comments.length">
					<AppComment
						v-for="comment in comments"
						:key="comment._id"
						:comment="comment"
					/>
				</div>
				<div class="comment__empty" v-else>
					<p class="text-center">Еще никто не комментировал эту работу</p>
				</div>
				<AppCommentForm @created="createCommentHandler" :workId="work._id" v-if="canAddComment"/>
			</section>
		</div>
	</div>
</template>

<script>
	import photo from '@/assets/bg-1.jpg'
	import AppComment from '@/components/main/Comment'
	import AppCommentForm from '@/components/main/CommentForm'
	import CoolLightBox from 'vue-cool-lightbox'
	import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
    export default {
		validate({params}) {
			return Boolean(params.id)
		},
		components: {
			AppComment, AppCommentForm, CoolLightBox
		},
		head() {
			return {
				title: `${this.work.name} | ${process.env.appName}`
			}
		},
		async asyncData({store, params}) {
			const query = await store.dispatch('work/fetchById', params.id)
			await store.dispatch('work/addView', query.currentWork)
			return {
				work: {...query.currentWork, views: ++query.currentWork.views},
				prevWork: query.prevWork,
				nextWork: query.nextWork,
			}
		},
		data() {
			return {
				photo,
				canAddComment: true,
				index: null,
				previous: ''
			}
		},
		computed: {
			comments() {
				return this.work.comments.reverse()
			},
			techString() {
				return this.work.tech.join(',')
			},
			shareUrl() {
				return `https://flokiowl.herokuapp.com${this.$route.fullPath}`
			},
			imageArr() {
				let imageArr = []
				this.work.image.forEach(img => {
					imageArr.push(img.url)
				})
				return imageArr
			},
		},
		methods: {
			createCommentHandler(comment) {
				this.comments.push(comment)
				this.canAddComment = false
			},
			openPrev() {
				this.$router.push(`/work/${this.prevWork[0]._id}`)
			},
			openNext() {
				this.$router.push(`/work/${this.nextWork[0]._id}`)
			}
		}
    }
</script>

<style lang="scss">
	// .portfolio__page {
	// 	padding-bottom: 100px;
	// }
	.work__top {
		h1 {
			position: relative;
			margin-top: 0;
			margin-bottom: 50px;
			font-size: 42px;
			line-height: 1.2;
			letter-spacing: .025em;
		}
	}
	.work__title {
		font-size: 16px;
		text-transform: uppercase;
		margin-bottom: 30px;
		margin-top: 17px;
	}
	.work__description {
		* {
			color: #777;
		}
	}
	.work__image {
		position: relative;
		padding-bottom: 55%;
		img {
			// min-width: 100%;
			max-width: 100%;
			box-shadow: 0 0 20px rgba(0,0,0,.1);
			border-radius: 3px;
			cursor: pointer;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			height: 100%;
		}
	}
	.work__meta {
		margin-bottom: 20px;
		display: flex;
		align-items: center;
	}
	.work__meta-title {
		display: inline-block;
		font-size: 13px;
		text-transform: uppercase;
		color: #000;
		font-weight: 500;
		width: 150px;
	}
	.work__meta-value {
		&[href] {
			color: #db4454;
		}
		&:not(a) {
			color: #777
		}
	}
	.work__share {
		margin-top: 50px;
		span {
			padding: 9px 20px;
			border: 1px solid #eee;
			text-transform: uppercase;
			font-size: 13px;
			line-height: 1;
			font-weight: 500;
			color: #333;
			display: inline-block;
			cursor: pointer;
			&:hover {
				color: #fff;
				background: #333;
			}
			&:focus {
				outline: none;
			}
		}
	}
	.work__neighbor {
		width: 100%;
		position: relative;
		margin-top: 100px;
		padding-bottom: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.work__neighbor-link {
		color: #000;
		font-weight: 700;
		text-align: center;
		&.disabled {
			opacity: .2;
			pointer-events: none;
		}
		&.ml-auto {
			margin-left: auto;
		}
		.ui-decor {
			&:after {
				font-size: 17px;
				font-weight: 200;
				color: #777;
			}
		}
	}
	.work__neighbor--decore {
		position: absolute;
		bottom: 15px;
		left: 40px;
		right: 40px;
		height: 1px;
		background: #ddd;
		&:before,&:after {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 50%;
			width: 10px;
			height: 10px;
			background: #ddd;
		}
		&:before {
			left: 0;
		}
		&:after {
			right: 0;
		}
	}
	.work__comments	{
		margin-top: 100px;
	}
	.comment__title {
		margin-top: 0;
		margin-bottom: 40px;
		font-size: 18px;
		text-transform: uppercase;
	}
	.comment__empty {
		padding-bottom: 40px;
		font-size: 16px;
		color: #555;
	}

	@media screen and (max-width:991px) {
		.comment__title {
			font-size: 16px;
		}
	}

	@media screen and (max-width:768px) {
		.work__top {
			text-align: center;
			span {
				font-size: 13px;
			}
			h1 {
				font-size: 32px;
				margin-bottom: 30px;
			}
		}
		.work__image {
			margin-bottom: 30px;
		}
		.portfolio__page {
			.el-col {
				&:last-child {
					.work__image {
						margin-bottom: 0;
					}
				}
			}
		}
		.work__title {
			margin-top: 0;
			text-align: center;
		}

		.work__info {
			margin-bottom: 30px;
		}
		.work__meta {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
			&:first-of-type {
				padding-top: 0;
			}
			&:last-of-type {
				border-bottom: 0;
			}
		}
		.work__meta-value {
			flex-grow: 1;
			text-align: right;
		}
		.work__share {
			margin-top: 30px;
			text-align: center;
		}
	}
	@media screen and (max-width:550px) {
		.work__description {
			p {
				font-size: 14px;
			}
		}
		.work__meta-value {
			font-size: 14px;
		}
		.work__share {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			span {
				width: 49%;
				margin-bottom: 10px;
			}
		}
		.work__neighbor-link {
			font-size: 14px;
		}
	}
</style>
