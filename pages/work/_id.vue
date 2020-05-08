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
								<li class="breadcrumbs-item"><nuxt-link to="/portfolio" class="breadcrumbs-link">Портфолио</nuxt-link></li>
								<li><span class="breadcrumbs-link">Детали работы</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="work__top">
				<span class="style-x">Front end development</span>
				<h1>{{work.name}}</h1>
			</div>
			<el-row :gutter="50" class="mb2">
				<el-col :span="12">
					<div class="work__image">
						<img :src="work.image[0].url" :alt="work.name">
					</div>
				</el-col>
				<el-col :span="12">
					<div class="work__info">
						<h3 class="work__title">Описание проекта</h3>
						<div class="work__description" v-html="work.description"></div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="50" class="mb2">
				<el-col :span="12">
					<div class="work__info">
						<h3 class="work__title">Подробности</h3>
						<div class="work__meta" v-if="work.date">
							<span class="work__meta-title">Дата</span>
							<span class="work__meta-value">{{new Date(work.date) | dateFormat('MMMM YYYY')}}</span>
						</div>
						<div class="work__meta" v-if="work.site_link">
							<span class="work__meta-title">Сайт</span>
							<a class="work__meta-value" :href="work.site_link" >{{work.site_link}}</a>
						</div>
						<div class="work__meta" v-if="work.repo_link">
							<span class="work__meta-title">Репозиторий</span>
							<a class="work__meta-value" :href="work.repo_link">{{work.repo_link}}</a>
						</div>
						<div class="work__meta" v-if="work.tech">
							<span class="work__meta-title">Технологии</span>
							<span class="work__meta-value" v-for="(t,index) in work.tech" :key="t"><template v-if="index">,</template> {{t}}</span>
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
				<el-col :span="12">
					<div class="work__image">
						<img :src="work.image[1].url" :alt="work.name">
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="50" class="mb2">
				<el-col :span="12">
					<div class="work__image">
						<img :src="work.image[2].url" :alt="work.name">
					</div>
				</el-col>
				<el-col :span="12">
					<div class="work__image">
						<img :src="work.image[3].url" :alt="work.name">
					</div>
				</el-col>
			</el-row>
			<section class="work__neighbor">
				<a href="/" class="work__neighbor-link" @click.prevent="openPrev" v-if="prevWork.data.length">
					<i class="ui-decor"></i><br>
					Предыдущая<br> работа
				</a>
				<a href="/" class="work__neighbor-link ml-auto" @click.prevent="openNext">
					<i class="ui-decor"></i><br>
					Следующая<br> работа
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
    export default {
		validate({params}) {
			return Boolean(params.id)
		},
		components: {
			AppComment, AppCommentForm
		},
		head() {
			return {
				title: `${this.work.name} | ${process.env.appName}`
			}
		},
		async asyncData({store, params}) {
			const work = await store.dispatch('work/fetchById', params.id)
			await store.dispatch('work/addView', work)
			let prevWork = null
			await store.dispatch('work/getPrevWork', work._id).then(data => {
				prevWork = data
			})
			return {
				work: {...work, views: ++work.views},
				prevWork: prevWork
			}
		},
		data() {
			return {
				photo,
				canAddComment: true
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
				// return `${location.protocol}//${location.hostname}:${location.port}${this.$route.fullPath}`
				return `http://localhost:3000${this.$route.fullPath}`
			}
		},
		methods: {
			createCommentHandler(comment) {
				this.comments.push(comment)
				this.canAddComment = false
			},
			openPrev() {
				this.$router.push(`/work/${this.prevWork.data.data[0].id}`)
			},
			openNext() {
				console.log('not yet')
			}
		}
    }
</script>

<style lang="scss">
	.portfolio__page {
		padding-bottom: 100px;
	}
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
		img {
			max-width: 100%;
			box-shadow: 0 0 20px rgba(0,0,0,.1);
			border-radius: 3px;
		}
	}
	.work__meta {
		margin-bottom: 20px;
	}
	.work__meta-title {
		display: inline-block;
		width: 130px;
		font-size: 13px;
		text-transform: uppercase;
		color: #000;
		font-weight: 500;
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
		font-size: 18px;
		font-style: italic;
		color: #555;
	}
</style>
