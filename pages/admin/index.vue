<template>
	<div class="template-admin">
		<div class="admin-top">
			<div class="admin-top-icon">
				<i class="el-icon-menu"></i>
			</div>
			<div class="admin-top-info">
				<h1>Аналитика по постам</h1>
			</div>
		</div>
		<div class="admin-content">
			<AppAnalytics title="Количество просмотров" :labels="views.labels" :data="views.data" />
			<AppAnalytics title="Количество комментариев" :labels="comments.labels" :data="comments.data" />
		</div>
    </div>
</template>

<script>
	import AppAnalytics from '@/components/admin/AnalyticChart'
	export default {
		layout: 'adminLayout',
		middleware: ['admin-auth'],
		components: {
			AppAnalytics
		},
		head: {
			title: 'Аналитика'
		},
		async asyncData({store}) {
			const {views,comments} = await store.dispatch('post/getAnalytics')
			return {views,comments}
		}
	}
</script>

<style lang="scss" scoped>

</style>
