<template>
	<div class="blog">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						IT-новости
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">IT-новости</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<el-row>
				<el-col :span="18">
					<transition-group tag="div" name="fade" class="blog__content" v-if="displayedPosts.length > 0">
						<div class="blog__item" v-for="post in displayedPosts " :key="post._id">
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
									<a href="/" @click.prevent="openPost(post._id)">
										<img :src="post.image[0].url" :alt="post.title">
									</a>
								</div>
								<div class="blog__title">
									<h2>
										<a href="/" @click.prevent="openPost(post._id)">{{post.title}}</a>
									</h2>
								</div>
								<div class="blog__teaser">
									<p>{{post.teaser}}</p>
								</div>
								<a href="/" class="blog__link btn-default default--hover" @click.prevent="openPost(post._id)">
									Читать больше
									<i class="ui-decor"></i>
								</a>
							</article>
						</div>
					</transition-group>
					<div v-else>
						<template v-if="filters[0].value">
							<h2>За Вашим запросом <i>{{filters[0].value}}</i> ничего не найдено</h2>
						</template>
						<template v-else>
							<h2>Ничего не найдено</h2>
						</template>
					</div>
					<el-pagination
						ref="pagination"
						layout="prev, pager, next"
						hide-on-single-page
						:current-page="+this.$route.query.page || 1"
						:page-size="pageSize"
						@current-change="pageChangeHandler"
						:total="filteredPosts.length">
					</el-pagination>
				</el-col>
				<el-col :span="6">
					<aside class="blog__aside">
						<div class="blog__aside-item" v-for="(f, i) in filters" :key="i">
							<h3>{{f.name}}</h3>
							<template v-if="f.type === 'Search'">
								<div class="input-group">
									<el-input ref="search-input" placeholder="Введите значение" v-model="searchValue" @keyup.enter.native="f.value = searchValue"></el-input>
									<button type="button" class="el-input-icon" @click.prevent="f.value = searchValue">
										<i class="el-icon-search"></i>
									</button>
								</div>
							</template>
							<template v-if="f.type === 'Tags'">
								<div class="blog__tags-cloud">
									<a href="/" class="default--hover"
									   @click.prevent="selectTags(tag, f.value)"
									   :class="{selected: f.value.indexOf(tag) !== -1}"
									   v-for="(tag, index) in tags"
									   :key="index"
									>{{tag}}
									</a>
								</div>
							</template>
						</div>
						<div class="blog__aside-item">
							<h3>Категории</h3>
							<ul class="blog__category-list">
								<li>Web Development <span>(25)</span></li>
								<li>Video Production <span>(8)</span></li>
								<li>Photography <span>(12)</span></li>
								<li>Illustrations <span>(7)</span></li>
								<li>Branding & Identity <span>(38)</span></li>
								<li>Business <span>(23)</span></li>
								<li>New Startups <span>(13)</span></li>
							</ul>
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
	import AppPost from '@/components/main/Post.vue'
	export default {
		head: {
			title: `IT-новости | ${process.env.appName}`
		},
		components: {
			AppPost
		},
		async asyncData({store}) {
			const posts = await store.dispatch('post/fetch')
			return {posts}
		},
		data() {
			return {
				photo,
				searchValue: this.$route.query.search || '',
				pageSize: 4,
				filters: [
					{ type: 'Search', name: 'Поиск', value: '', getter: obj => obj.title.toLowerCase().trim().indexOf(this.filters[0].value.toLowerCase().trim()) !== -1 },
					{ type: 'Tags', name: 'Облако тегов', value: [], getter: obj => obj.tags.map(item => this.filters[1].value.indexOf(item) !== -1).includes(true) }
				]
			}
		},
		computed: {
			filteredPosts() {
				return this.filters.reduce((arr, { value, getter }) => {
					if (value === '' || !value.length) {
						return arr
					} else {
						this.$router.push(`/blog`)
						return arr.filter(n => getter(n))
					}
				}, this.posts);
			},
			displayedPosts () {
				let page = +this.$route.query.page || 1
				let perPage = this.pageSize
				let from = (page * perPage) - perPage
				let to = (page * perPage)
				return this.filteredPosts.slice(from, to)
			},
			tags() {
				let tagsArr = []
				this.posts.forEach(post => {
					tagsArr.push(...post.tags)
				})
				let tags = [...new Set(tagsArr)]
				return tags
			},
			popularPosts () {
				let popularPostsArr = [...this.posts]
				let newArr =  popularPostsArr.slice(0,5).sort((a,b) => {
					return b.views - a.views
				})
				return newArr
			}
		},
		methods: {
			selectTags(tag, arr) {
				if (arr.includes(tag)) {
					arr.splice(arr.indexOf(tag), 1)
				} else {
					arr.push(tag)
				}
			},
			openPost(id) {
				this.$router.push(`/post/${id}`)
			},
			pageChangeHandler(val) {
				this.$router.push({path: '/blog', query: {page: val}})
				document.documentElement.scrollTop = 340
			}
		},
		mounted() {
			if (Object.keys(this.$route.query).length !== 0) {
				if (this.$route.query.search) {
					this.filters[0].value = this.$route.query.search
				} else if (this.$route.query.tag) {
					this.filters[1].value.push(this.$route.query.tag)
				}
			}
		}
	}
</script>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .6s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	.fade-leave-active {
		position: absolute;
		display: none;
	}
	/*.fade-move {*/
	/*	transition: all .2s;*/
	/*}*/

	.blog {
		padding-bottom: 25px;
		.el-row {
			display: flex;
			align-items: stretch;
			flex-wrap: wrap;
		}
	}
	.blog__item {
		position: relative;
		padding-left: 125px;
		padding-bottom: 100px;
		background: #fff;
	}
	.blog__main {
		padding-right: 50px;
	}
	.blog__data {
		width: 100px;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
	}
	.blog__date {
		margin-bottom: 24px;
	}
	.blog__date--number {
		font-size: 50px;
		line-height: 1;
		color: #000;
		font-weight: 900;
	}
	.blog__date--month {
		text-transform: uppercase;
		font-size: 17px;
		font-weight: 900;
	}
	.blog__decore {
		i {
			margin-left: 10px;
			&:after {
				font-size: 18px;
				color: #7e7e7e;
				font-weight: 400;
			}
		}
	}
	.blog__data-item {
		font-size: 14px;
		color: #7e7e7e;
		span {
			display: block;
			font-size: 18px;
			color: #000;
			font-weight: 700;
		}
	}
	.blog__image {
		display: flex;
		align-items: center;
		justify-content: center;
		a {
			display: block;
		}
		img {
			max-width: 100%;
			height: auto;
			max-height: 450px;
		}
	}
	.blog__title {
		h2 {
			margin-top: 40px;
			margin-bottom: 53px;
			position: relative;
			color: #000;
			font-size: 32px;
			line-height: 1.2;
			&:after {
				content: '';
				position: absolute;
				bottom: -7px;
				left: 0;
				background: #333;
				height: 3px;
				width: 230px;
				transform: translateX(-50%);
			}
			a {
				color: #000;
			}
		}
	}
	.blog__teaser {
		margin-bottom: 24px;
		padding-right: 10px;
		p {
			margin: 0;
			color: #777;
		}
	}
	.el-pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 70px 0;
		margin-right: 50px;
		border-top: 1px solid #eee;
		.el-pager {
			flex-grow: 1;
			text-align: center;
			.number {
				font-size: 15px;
				position: relative;
				&:hover,&.active {
					color: #000;
					&:after {
						background: #000;
					}
				}
				&:after {
					content: '';
					position: absolute;
					left: 2px;
					bottom: -5px;
					height: 3px;
					background: transparent;
					width: 20px;
				}
			}
		}
		.btn-prev, .btn-next {
			border: 1px solid #ddd;
			min-width: 30px;
			min-height: 30px;
			transform: rotate(45deg);
			padding: 0;
			&:not(:disabled) {
				&:hover {
					background: #000;
					border-color: #000;
					.el-icon {
						color: #fff;
					}
				}
			}
			.el-icon {
				font-size: 13px;
				line-height: 1;
				transform: rotate(-45deg);
			}
		}
	}
	.blog__aside {
		padding-left: 15px;
	}
	.blog__aside-item {
		margin-bottom: 70px;
		h3 {
			margin: 0;
			margin-bottom: 28px;
			font-size: 16px;
			line-height: 1;
			text-transform: uppercase;
			font-weight: 700;
			letter-spacing: .09em;
		}
		.input-group {
			position: relative;
			.el-input-icon {
				width: 48px;
				height: 48px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
				background: transparent;
				border: 0;
				i {
					font-size: 22px;
					font-weight: 700;
				}
			}
		}
		.el-input {
			input {
				width: 100%;
				height: 48px;
				margin-bottom: 0;
				padding-right: 50px;
				padding-left: 24px;
				border: none;
				background-color: #f4f4f4;
				border-radius: 0;
			}
		}

	}
	.blog__category-list {
		li {
			margin-bottom: 7px;
			padding-bottom: 6px;
			border-bottom: 1px solid #eee;
			color: #010101;
			font-size: 15px;
			span {
				display: inline-block;
				padding-left: 5px;
				font-size: 12px;
				color: #333;
			}
		}
	}
	.blog__recent-list {
		li {
			display: flex;
			justify-content: flex-start;
			padding-bottom: 10px;
		}
	}
	.blog__recent-image {
		min-width: 80px;
		width: 80px;
		height: 80px;
		background-color: #f4f4f4;
		img {
			max-width: 100%;
			min-height: 100%;
			height: auto;
			object-fit: cover;
		}
	}
	.blog__recent-info {
		padding-left: 20px;
		a {
			font-size: 14px;
			line-height: 1;
			color: #000;
			font-weight: 700;
		}
		time {
			display: block;
			padding-top: 5px;
			font-size: 13px;
			color: #999;
		}
	}
	.blog__tags-cloud {
		a {
			display: inline-flex;
			margin-bottom: 8px;
			margin-right: 5px;
			padding: 12px 21px;
			border: 1px solid #eee;
			text-transform: uppercase;
			color: #000;
			font-size: 13px;
			line-height: 1;
			font-weight: 500;
			&:hover {
				background: #000;
				color: #fff;
			}
			&.selected {
				background: #000;
				color: #fff;
			}
		}
	}
</style>

