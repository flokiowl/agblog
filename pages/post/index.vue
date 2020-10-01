<template>
	<div class="blog">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Интересное
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">Интересное</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<el-row class="blog__row">
				<el-col class="blog__col main" :span="18">
					<div class="blog__aside-toggler">
						<span @click="asideOpen = !asideOpen">Фильтры</span>
					</div>				
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
				<el-col class="blog__col aside" :class="{open: asideOpen}" :span="6">
					<div class="blog__aside--sticky">
						<div class="blog__aside-header" v-if="asideOpen">
							<span class="blog__aside-header-title">Фильтры</span>
							<span class="blog__aside-close" @click="asideOpen = false">
								<i class="el-icon-close"></i>
							</span>
						</div>
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
								<template v-if="f.type === 'Category'">
									<div class="blog__category-list">
										<el-checkbox-group v-model="f.value">
											<el-checkbox v-for="(c,i) in categories" :key="i" :label="c.name">
												{{c.name}} <span>({{c.count}})</span>
											</el-checkbox>
										</el-checkbox-group>
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
						</aside>
					</div>
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
				asideOpen: false,
				searchValue: this.$route.query.search || '',
				pageSize: 4,
				filters: [
					{ type: 'Search', name: 'Поиск', value: '', getter: (obj,val) => obj.title.toLowerCase().trim().indexOf(val.toLowerCase().trim()) !== -1 },
					{ type: 'Category', name: 'Категории', value: [], getter: (obj,val) => obj.category.map(item => val.indexOf(item) !== -1).includes(true) },
					{ type: 'Tags', name: 'Облако тегов', value: [], getter: (obj,val) => obj.tags.map(item => val.indexOf(item) !== -1).includes(true) }
				]
			}
		},
		computed: {
			filteredPosts() {
				return this.filters.reduce((arr, { value, getter }) => {
					if (value === '' || !value.length) {
						return arr
					} else {
						this.$router.push(`/post`)
						return arr.filter(n => getter(n,value))
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
			categories() {
				let catArr = []
				this.posts.forEach(post => {
					post.category.forEach(c => {
						catArr.push(c)
					})
				})
				let result = catArr.reduce((acc,el) => {
					acc[el] = (acc[el] || 0) + 1
					return acc
				},{})
				let categories = []
				for (let key in result) {
					categories.push({name:key,count:result[key]})
				}
				return categories
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
				this.$router.push({path: '/post', query: {page: val}})
				document.documentElement.scrollTop = 340
			}
		},
		mounted() {
			if (Object.keys(this.$route.query).length !== 0) {
				if (this.$route.query.search) {
					this.filters[0].value = this.$route.query.search
				} else if (this.$route.query.tag) {
					this.filters[2].value.push(this.$route.query.tag)
				}
			}
		}
	}
</script>

<style lang="scss">

</style>

