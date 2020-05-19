<template>
	<div class="portfolio">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Портфолио
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">Портфолио</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
		<div class="container">
			<section class="portfolio__tools">
				<div class="portfolio__tools-item" v-for="(f,i) in filters" style="flex-grow:1">
					<template v-if="f.type === 'Search'">
						<div class="input-group">
							<el-input ref="search-input" placeholder="Введите значение" v-model="searchValue" @keyup.enter.native="f.value = searchValue"></el-input>
							<button type="button" class="el-input-icon" @click.prevent="f.value = searchValue">
								<i class="el-icon-search"></i>
							</button>
						</div>
					</template>
				</div>
				<div class="portfolio__tools-item">
					<span class="portfolio__sort-caption">Сортировать по</span>
					<el-select v-model="sortValue" :value="sortValue" placeholder="Сортировать">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						    :hidden="item.hidden" v-show="!item.hidden">
						</el-option>
					</el-select>
					<button class="portfolio__sort-mode" @click.prevent="changeSortMode">
						<i :class="{'el-icon-top': sortValue.substr(0,1) !== '-', 'el-icon-bottom': sortValue.substr(0,1) === '-'}"></i>
					</button>
				</div>
			</section>
			<el-row :gutter="25">
				<transition-group name="work-list" tag="div" v-if="displayedWorks.length > 0">
					<el-col :span="12" v-for="(work,index) in displayedWorks" :key="work.name + index" class="work-list-item">
						<div class="portfolio__item">
							<nuxt-link class="portfolio__link" :to="`/work/${work._id}`"></nuxt-link>
							<figure class="portfolio__inner">
								<img class="portfolio__image" :src="work.image[0].url" :alt="work.name">
								<figcaption class="portfolio__hover">
									<h3 class="portfolio__name">{{work.name}}</h3>
									<span class="portfolio__date">{{new Date(work.date) | dateFormat('MMMM YYYY')}}</span>
								</figcaption>
							</figure>
						</div>
					</el-col>
				</transition-group>
				<div v-else>
					<template v-if="filters[0].value">
						<h2>За Вашим запросом <i>{{filters[0].value}}</i> ничего не найдено</h2>
					</template>
					<template v-else>
						<h2>Ничего не найдено</h2>
					</template>
				</div>
			</el-row>
			<el-pagination
				ref="pagination"
				layout="prev, pager, next"
				hide-on-single-page
				:current-page="+this.$route.query.page || 1"
				:page-size="pageSize"
				@current-change="pageChangeHandler"
				:total="filteredWorks.length">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import photo from '@/assets/bg-1.jpg'
    export default {
        name: "portfolio",
		head: {
			title: `Портфолио | ${process.env.appName}`
		},
		async asyncData({store}) {
			const works = await store.dispatch('work/fetch')
			return {works}
		},
		data() {
        	return {
        		photo,
				searchValue: this.$route.query.search || '',
				pageSize: 6,
				filters: [
					{ method: 'filter', type: 'Search', name: 'Поиск', value: '', getter: (obj,val) => obj.name.toLowerCase().trim().indexOf(val.toLowerCase().trim()) !== -1 }
				],
				sortValue: 'date',
				options: [
					{value: 'date', label: 'Дате', hidden: false},
					{value: '-date', label: 'Дате', hidden: true},
					{value: 'name', label: 'Названию', hidden: false},
					{value: '-name', label: 'Названию', hidden: true}
				],
			}
		},
		computed: {
        	sortedWorks() {
				return this.works.sort((a,b) => {
					switch (this.sortValue) {
						case 'name':
							if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
							if (a.name.toUpperCase() > b.name.toUpperCase()) return 1
						 	return 0
						case '-name':
							if (a.name.toUpperCase() < b.name.toUpperCase()) return 1
						 	if (a.name.toUpperCase() > b.name.toUpperCase()) return -1
						 	return 0
						case 'date':
							if (a.date < b.date) return 1
						 	if (a.date > b.date) return -1
							return 0
						case '-date':
							if (a.date < b.date) return -1
							if (a.date > b.date) return 1
							return 0
					}
				})
			},
			filteredWorks() {
				return this.filters.reduce((arr, { value, getter }) => {
					if (value === '' || !value.length) {
						return arr
					} else {
						this.$router.push(`/work`)
						return arr.filter((n) => getter(n,value))
					}
				}, this.sortedWorks);
			},
			displayedWorks () {
				let page = +this.$route.query.page || 1
				let perPage = this.pageSize
				let from = (page * perPage) - perPage
				let to = (page * perPage)
				return this.filteredWorks.slice(from, to)
			}
		},
		methods: {
			pageChangeHandler(val) {
				this.$router.push({path: '/work', query: {page: val}})
				document.documentElement.scrollTop = 340
			},
			changeSortMode() {
				if (this.sortValue.substr(0,1) === '-') {
					this.sortValue = this.sortValue.replace('-', '')
				} else {
					this.sortValue = `-${this.sortValue}`
				}
			}
		}
    }
</script>

<style lang="scss">
	//list animate
	.work-list-item {
		transition: all .7s;
	}
	.work-list-enter,
	.work-list-leave-to {
		opacity: 0;
		//transform: rotateY(90deg);
	}
	.work-list-leave-active {
		position: absolute;
		display: none;
	}
	.work-list-enter-to,
	.work-list-leave {
		opacity: 1;
		//transform: rotateY(0);
	}
	.work-list-move {
		transition: all 0.6s;
	}
	//
	.portfolio {
		padding-bottom: 100px;
	}
	.portfolio__tools {
		padding-bottom: 40px;
		display: flex;
	}
	.portfolio__tools-item {
		.input-group {
			position: relative;
			margin-right: 20px;
			input {
				background: #f4f4f4;
				border: 0;
				border-radius: 0;
				height: 48px;
			}
		}
		.el-input-icon {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			width: 40px;
			background: transparent;
			border: 0;
			border-radius: 0;
			i {
				font-size: 20px;
				font-weight: 700;
			}
		}
		.el-select {
			float: left;
			margin-right: 5px;
			input {
				height: 48px;
				border: 0;
				border-radius: 0;
				background: #f4f4f4;
			}
		}
	}
	.portfolio__sort-caption {
		float: left;
		display: inline-flex;
		align-items: center;
		height: 48px;
		margin-right: 5px;
		font-weight: 600;
	}
	.el-select-dropdown__item.selected {
		color: #000;
	}
	.portfolio__sort-mode {
		height: 100%;
		background: transparent;
		border: 0;
		border-radius: 0;
		width: 48px;
		background: #f4f4f4;
		color: #777;
		font-size: 20px;
		&:hover {
			color: #333;
		}
		&:active {
			box-shadow: inset 0 0 5px rgba(0,0,0,.2);
		}
	}
	.portfolio__item {
		position: relative;
		margin-bottom: 25px;
		&:hover {
			.portfolio__image {
				transform: scale(1.05);
			}
		}
	}
	.portfolio__link {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	.portfolio__inner {
		position: relative;
		color: #fff;
		height: auto;
		padding-bottom: 65%;
		overflow: hidden;
		border: 1px solid #eee;
	}
	.portfolio__image {
		position: absolute;
		width:100%;
		min-height: 100%;
		max-height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 5px;
		transform: scale(1);
		transition: all .4s;
		will-change: transform;
	}
	.portfolio__hover {
		width: 100%;
		height: 90px;
		padding: 15px;
		position: absolute;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #eee;
		overflow: hidden;

		transition: all .4s;
	}
	.portfolio__name {
		color: #333;
		margin: 0;
		margin-bottom: 10px;
		text-align: center;
		position: relative;
		transition: all .4s;
	}
	.portfolio__date {
		font-size: 15px;
		color: #333;
		position: relative;
		transition: all .6s;
	}
</style>
