<template>
	<div class="portfolio">
		<div class="site-page-title" :style="{backgroundImage: `url(${photo})`}">
			<div class="container">
				<div class="text-center">
					<h2 class="page-title text-center">
						Резюме
						<div class="page-title-bottom">
							<ul class="breadcrumbs">
								<li class="breadcrumbs-item"><nuxt-link to="/" class="breadcrumbs-link">Главная</nuxt-link></li>
								<li><span class="breadcrumbs-link">Резюме</span></li>
							</ul>
						</div>
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import photo from '@/assets/bg-1.jpg'
	export default {
		name: "resume",
		head: {
			title: `Резюме | ${process.env.appName}`
		},
		data() {
			return {
				photo
			}
		}
	}
</script>

<style lang="scss">

</style>
