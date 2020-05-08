<template>
	<div class="blog__inner-page">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						IT-новости
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li class="breadcrumbs-item"><nuxt-link to="/blog" class="breadcrumbs-link">IT-новости</nuxt-link></li>
								<li><span class="breadcrumbs-link">Пост</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<el-row>
				<el-col :span="18">
					<div class="post__content">
						<section class="blog__item">
							<div class="blog__data text-center">
								<div class="blog__date">
									<span class="blog__date--number">{{new Date(post.date) | dateFormat('D')}}</span>
									<span class="blog__date--month">{{new Date(post.date) | dateFormat('MMM')}}</span>
								</div>
								<div class="blog__decore">
									<i class="ui-decor"></i>
								</div>
								<div class="blog__data-item">
									Просмотров
									<span>{{post.views}}</span>
								</div>
								<div class="blog__data-item">
									Комментариев
									<span>{{post.comments.length}}</span>
								</div>
							</div>
							<article class="blog__main">
								<div class="blog__image">
									<img :src="post.image[0].url" :alt="post.title">
								</div>
								<div class="blog__title">
									<h2>{{post.title}}</h2>
								</div>
								<div class="post__body" v-html="post.text"></div>
								<footer class="post__footer">
									<div class="post__tags">
										<b>Теги:</b>
										<a href="/" class="default--hover" @click.prevent="tagFilter(tag)" v-for="(tag,index) in post.tags">
											<template v-if="index">, </template>
											<span>{{tag}}</span>
										</a>
									</div>
									<social-sharing :url="shareUrl" :title="post.title" :description="post.teaser" :hashtags="tagsString" inline-template>
										<div class="post__share">
											<b>Поделиться</b>
											<network class="default--hover" network="facebook">Facebook</network>
											<network class="default--hover" network="telegram">Telegram</network>
											<network class="default--hover" network="twitter">Twitter</network>
											<network class="default--hover" network="linkedin">LinkedIn</network>
											<network class="default--hover" network="email">Email</network>
										</div>
									</social-sharing>
								</footer>
							</article>
						</section>
						<section class="comments">
							<h2 class="comment__title">Комментарии</h2>
							<div class="comment__list" v-if="post.comments.length">
								<AppComment
									v-for="comment in comments"
									:key="comment._id"
									:comment="comment"
								/>
							</div>
							<div class="comment__empty" v-else>
								<p class="text-center">Еще никто не комментировал этот пост</p>
							</div>
							<AppCommentForm @created="createCommentHandler" :postId="post._id" v-if="canAddComment"/>
						</section>
					</div>
				</el-col>
				<el-col :span="6">
					<aside class="blog__aside">
						<div class="blog__aside-item">
							<h3>Поиск</h3>
							<div class="input-group">
								<el-input ref="search-input" placeholder="Введите значение" v-model="searchValue" @keyup.enter.native="goSearch"></el-input>
								<button type="button" class="el-input-icon" @click.prevent="goSearch">
									<i class="el-icon-search"></i>
								</button>
							</div>
						</div>
					</aside>
				</el-col>
			</el-row>
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
				title: `${this.post.title} | ${process.env.appName}`
			}
		},
		async asyncData({store, params}) {
			const post = await store.dispatch('post/fetchById', params.id)
			await store.dispatch('post/addView', post)
			return {
				post: {...post, views: ++post.views}
			}
		},
		data() {
			return {
				photo,
				canAddComment: true,
				hashtags: '',
				searchValue: ''
			}
		},
		computed: {
			comments() {
				return this.post.comments.reverse()
			},
			tagsString() {
				return this.post.tags.join(',')
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
			goSearch() {
				this.$router.push({path: '/blog', query: {'search': this.searchValue}})
			},
			tagFilter(tag) {
				this.$router.push({path: '/blog', query: {'tag': tag}})
			}
		}
	}
</script>

<style lang="scss">
    .post {
        max-width: 600px;
        margin: 0 auto;
    }
	.post__content {
		.blog__item {
			padding-bottom: 50px;
		}
	}
    .post-header {
        margin-bottom: 1.5rem;
    }
    .post-title {
        font-size: 20px;
        letter-spacing: 0.5px;
    }
    .post-title,
    .post-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .post-info {
        margin-bottom: 0.5rem;
    }
    .post-image {
        img {
            width: 100%;
            height: auto;
        }
    }
	.post__body {
		//font-family: 'font',helvetica,arial sans-serif,serif !important;
		.ql-align-center {
			text-align: center;
		}
		.ql-align-right {
			text-align: right;
		}
		.ql-align-justify {
			text-align: justify;
		}
		p {
			font-size: 17px;
			font-weight: 500;
			line-height: 25px;
			color: #777;
			span {
				color: #777 !important;
			}
		}
		img {
			max-width: 100%;
			height: auto;
		}
		a {
			color: rgb(219, 68, 84) !important;
			&:hover {
				text-decoration: underline;
			}
		}
		.ql-syntax {
			display: block;
			overflow-x: auto;
			padding: 15px;
			background: #002b36;
			color: #839496;
			font-size: 14px;
			font-weight: 400;
			font-family: 'Consolas', sans-serif !important;
		}
		ul {
			li {
				padding-left: 20px;
				position: relative;
				&:before,&:after {
					content: "";
					position: absolute;
					left: 0;
					width: 8px;
					height: 2px;
					background: rgb(219,68,84);
				}
				&:before {
					transform: rotate(47deg);
					top: 7px;
				}
				&:after {
					transform: rotate(-47deg);
					top: 12px;
				}
			}
		}
		code {
			background-color: #eee;
			padding: 2px 10px;
			color: #303335 !important;
			border-radius: 2px;
		}
		blockquote {
			padding: 20px;
			padding-top: 70px;
			text-align: center;
			font-style: italic;
			font-size: 20px;
			color: #333;
			position: relative;
			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				background: #333;
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			&:after {
				content: '\201c';
				position: absolute;
				left: -20px;
				right: 0;
				top: 14px;
				font-size: 71px;
				line-height: 1;
				color: #fff;
			}
		}
	}
	.post__footer {
		margin-left: -125px;
		padding-top: 100px;
		font-size: 14px;
		text-transform: uppercase;
	}
	.post__tags,
	.post__share {
		margin-bottom: 10px;
		b {
			color: #777;
			padding-right: 15px;
			font-size: 13px;
		}
		a, span {
			color: #444;
			font-weight: 700;
			font-size: 13px;
			cursor: pointer;
		}
		.default--hover {
			&:hover {
				span {
					text-decoration: underline;
				}
			}
		}
	}
	.post__share {
		margin-bottom: 0;
		a,span {
			margin-right: 7px;
		}
	}
	.comments	{
		padding-bottom: 100px;
		padding-top: 50px;
		border-top: 1px solid #eee;
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
