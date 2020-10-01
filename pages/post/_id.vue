<template>
	<div class="blog__inner-page">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Интересное
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li class="breadcrumbs-item"><nuxt-link to="/post" class="breadcrumbs-link">Интересное</nuxt-link></li>
								<li><span class="breadcrumbs-link">Пост</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<el-row>
				<el-col class="post__col main" :span="18">
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
									<i class="el-icon-view"></i>
									<span class="text">Просмотров</span>
									<span class="counter">{{post.views}}</span>
								</div>
								<div class="blog__data-item">
									<i class="el-icon-chat-dot-round"></i>
									<span class="text">Комментариев</span>
									<span class="counter">{{post.comments.length}}</span>
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
										<a href="/" class="default--hover" @click.prevent="tagFilter(tag)" v-for="(tag,index) in post.tags" :key="tag">
											<template v-if="index">, </template>
											<span>{{tag}}</span>
										</a>
									</div>
									<social-sharing :url="shareUrl" :title="post.title" :hashtags="tagsString" inline-template>
										<div class="post__share">
											<b>Поделиться</b>
											<network class="default--hover" network="facebook">Facebook</network>
											<network class="default--hover" network="telegram">Telegram</network>
											<network class="default--hover" network="twitter">Twitter</network>
											<network class="default--hover" network="linkedin">LinkedIn</network>
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
				<el-col class="post__col aside" :span="6">
					<aside class="blog__aside sticky">
						<div class="blog__aside-item">
							<h3>Поиск</h3>
							<div class="input-group">
								<el-input ref="search-input" placeholder="Введите значение" v-model="searchValue" @keyup.enter.native="goSearch"></el-input>
								<button type="button" class="el-input-icon" @click.prevent="goSearch">
									<i class="el-icon-search"></i>
								</button>
							</div>
						</div>
						<div class="blog__aside-item">
							<h3>Популярные посты</h3>
							<ul class="blog__recent-list">
								<li v-for="post in popularPosts" :key="post._id">
									<div class="blog__recent-image">
										<img :src="post.image[0].url" :alt="post.title">
									</div>
									<div class="blog__recent-info">
										<a href="/" @click.prevent="openPost(post._id)">{{post.title}}</a>
										<time>{{new Date(post.date) | dateFormat('D MMMM, YYYY')}}</time>
									</div>
								</li>
							</ul>
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
			const popularPosts = await store.dispatch('post/getPopular')
			return {
				post: {...post, views: ++post.views},
				popularPosts: popularPosts
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
				return `https://flokiowl.herokuapp.com${this.$route.fullPath}`
			}
		},
		methods: {
			createCommentHandler(comment) {
				this.comments.push(comment)
				this.canAddComment = false
			},
			goSearch() {
				this.$router.push({path: '/post', query: {'search': this.searchValue}})
			},
			tagFilter(tag) {
				this.$router.push({path: '/post', query: {'tag': tag}})
			},
			openPost(id) {
				this.$router.push(`/post/${id}`)
			}
		}
	}
</script>

<style lang="scss">

</style>
