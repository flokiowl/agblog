<template>
	<el-container class="column">
		<AppNavigation/>
		<el-main>
			<nuxt/>
		</el-main>
		<footer class="footer">
			<div class="footer__content">
				<p class="footer__copyright">
					Copyrights {{new Date | dateFormat('YYYY')}}
					<nuxt-link to="/" class="default--hover">Andrew Golub - Web-developer</nuxt-link>
				</p>
				<p class="footer__rights">All Rights Reserved.</p>
			</div>
		</footer>
	</el-container>
</template>

<script>
import AppNavigation from '@/components/main/Navigation'
export default {
	components: {
		AppNavigation
	}
}
</script>

<style lang="scss">
	.el-container {
		flex-direction: column;
		min-height: 100vh;
	}
	.el-main {
		overflow-x: hidden;
		flex-grow: 1;
		margin-top: -80px;
		padding: 0;
		padding-top: 80px;
	}
	.footer {
		background: #fff;
	}
	.footer__content {
		padding-top: 50px;
		padding-bottom: 80px;
		border-top: 1px solid #eee;
		margin-left: 12%;
	}
	.footer__copyright {
		a {
			color: #333;
			font-weight: 700;
		}
	}
</style>
