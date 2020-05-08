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
				some sorting tools will be here
			</section>
			<el-row :gutter="25">
				<el-col :span="8" v-for="work in works" :key="work.id">
					<div class="portfolio__item">
						<nuxt-link class="portfolio__link" :to="`/work/${work._id}`"></nuxt-link>
						<figure class="portfolio__inner">
							<img class="portfolio__image" :src="work.image[0].url" :alt="work.name">
							<figcaption class="portfolio__hover">
								<h3 class="portfolio__name">{{work.name}}</h3>
								<span class="portfolio__divider"></span>
								<span class="portfolio__date">{{new Date(work.date) | dateFormat('MMMM YYYY')}}</span>
							</figcaption>
						</figure>
					</div>
				</el-col>
			</el-row>
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
				// works: [
				// 	{
				// 		id: 1,
				// 		name: 'Геопростір',
				// 		description: 'random description 1',
				// 		preview: ['@/assets/portfolio/berlin.jpg'],
				// 		image: [],
				// 		tech: ['html', 'scss', 'nuxtjs', 'mongodb', 'nodejs'],
				// 		date: new Date(),
				// 		repo_link: '/',
				// 		site_link: '/',
				// 		category: ''
				// 	},
				// 	{
				// 		id: 2,
				// 		name: 'Державна електронна система у сфері будівництва',
				// 		description: 'random description 2',
				// 		preview: ['@/assets/portfolio/sklad.jpg'],
				// 		image: [],
				// 		tech: ['html', 'less', 'vuejs', 'mysql', 'php'],
				// 		date: new Date(),
				// 		repo_link: '/',
				// 		site_link: '/',
				// 		category: ''
				// 	},
				// 	{
				// 		id: 3,
				// 		name: 'Питомник Антипова',
				// 		description: 'random description 3',
				// 		preview: ['@/assets/portfolio/note.jpg'],
				// 		image: [],
				// 		tech: ['stylus', 'react', 'postgresql', 'php'],
				// 		date: new Date(),
				// 		repo_link: '/',
				// 		site_link: '/',
				// 		category: ''
				// 	},
				// 	{
				// 		id: 4,
				// 		name: 'Центр організації дорожнього руху',
				// 		description: 'random description 3',
				// 		preview: ['@/assets/portfolio/berlin.jpg'],
				// 		image: [],
				// 		tech: ['stylus', 'react', 'postgresql', 'php'],
				// 		date: new Date(),
				// 		repo_link: '/',
				// 		site_link: '/',
				// 		category: ''
				// 	},
				// 	{
				// 		id: 5,
				// 		name: 'Rizor Hovertrax',
				// 		description: 'random description 3',
				// 		preview: ['@/assets/portfolio/sklad.jpg'],
				// 		image: [],
				// 		tech: ['stylus', 'react', 'postgresql', 'php'],
				// 		date: new Date(),
				// 		repo_link: '/',
				// 		site_link: '/',
				// 		category: ''
				// 	}
				// ]
			}
		}
    }
</script>

<style lang="scss">
	.portfolio {
		padding-bottom: 100px;
	}
	.portfolio__tools {
		padding-bottom: 40px;
	}
	.portfolio__item {
		position: relative;
		margin-bottom: 25px;
		&:hover {
			.portfolio__hover {
				opacity: 1;
				visibility: visible;
				transform: translate(10px,10px);
				transition: all .5s;
				h3 {
					top: 0;
					opacity: 1;
					transition: all .7s;
				}
				span {
					left: 0;
					opacity: 1;
					transition: all .7s;
				}
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
		height: 250px;
	}
	.portfolio__image {
		width:100%;
		min-height: 100%;
		max-height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.portfolio__hover {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,.9);

		opacity: 0;
		visibility: hidden;
		transform: translate(0,0);
		transition: all .5s;
	}
	.portfolio__name {
		margin: 0;
		margin-bottom: 10px;
		text-align: center;
		max-width: 80%;
		position: relative;
		top: -40px;
		opacity: 0;
		transition: all .7s;
	}
	.portfolio__divider {
		background: #fff;
		height: 2px;
		width: 100px;
		margin-left: -100px;
	}
	.portfolio__date {
		font-size: 15px;
		color: #c8c8c8;
		margin-top: 10px;
		position: relative;
		left: -40px;
		opacity: 0;
		transition: all .7s;
	}
</style>
