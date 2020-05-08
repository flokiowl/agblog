<template>
	<div class="template-admin">
		<div class="admin-top">
			<div class="admin-top-icon">
				<i class="el-icon-suitcase"></i>
			</div>
			<div class="admin-top-info">
				<h1>Портфолио</h1>
				<p>Мои работы</p>
			</div>
		</div>
		<div class="admin-content">
			<div class="text-right">
				<el-button class="admin-add-btn" type="primary" to="/admin/work/create" @click="createLink">Добавить</el-button>
			</div>
			<el-table :data="works" border style="width: 100%">
				<el-table-column label="Название" prop="name">
				</el-table-column>
				<el-table-column align="center"  label="Дата" width="200">
					<template slot-scope="{row: {date}}">
						<i class="el-icon-time"></i>
						<span style="margin-left: 5px"> {{ date | date('date') }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="Просмотры" width="150">
					<template slot-scope="{row: {views}}">
						<i class="el-icon-view"></i>
						<span style="margin-left: 5px">{{ views}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="Комментарии" width="150">
					<template slot-scope="{row: {comments}}">
						<i class="el-icon-chat-dot-round"></i>
						<span style="margin-left: 5px">{{comments.length}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="Действия" width="200">
					<template slot-scope="{row}">
						<el-tooltip effect="dark" content="Редактировать" placement="top">
							<el-button icon="el-icon-edit" type="primary" circle @click="open(row._id)"/>
						</el-tooltip>
						<el-tooltip effect="dark" content="Удалить" placement="top">
							<el-button icon="el-icon-delete" type="danger" circle @click="remove(row._id)"/>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
    export default {
		layout: 'adminLayout',
		middleware: ['admin-auth'],
		head: {
			title: `Портфолио | ${process.env.appName}`
		},
		async asyncData({store}) {
			const works = await store.dispatch('work/fetchAdmin')
			return {works}
		},
		methods: {
			open(id) {
				this.$router.push(`/admin/work/${id}`)
			},
			createLink() {
				this.$router.push(`/admin/work/create`)
			},
			async remove(id) {
				try {
					await this.$confirm('Удалить работу?', 'Внимание!', {
						confirmButtonText: 'OK',
						cancelButtonText: 'Отмена',
						type: 'warning'
					})
					await this.$store.dispatch('work/remove', id)
					this.works = this.works.filter(p => p._id !== id)
					this.$message.success('Работа удалена')
				} catch (e) {

				}
			}
		}
    }
</script>

<style lang="scss" scoped>

</style>
