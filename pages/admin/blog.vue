<template>
	<div class="template-admin">
		<div class="admin-top">
			<div class="admin-top-icon">
				<i class="el-icon-tickets"></i>
			</div>
			<div class="admin-top-info">
				<h1>Блог</h1>
				<p>Интересные статьи и последние новости в IT</p>
			</div>
		</div>
		<div class="admin-content">
			<div class="text-right">
				<el-button class="admin-add-btn" type="primary" to="/admin/post/create" @click="createLink">Добавить</el-button>
			</div>
			<el-table :data="posts" border style="width: 100%">
				<el-table-column label="Название" prop="title">
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
							<el-button icon="el-icon-edit" type="primary" size="mini" circle @click="open(row._id)"/>
						</el-tooltip>
						<el-tooltip effect="dark" content="Удалить пост" placement="top">
							<el-button icon="el-icon-delete" type="danger" size="mini" circle @click="remove(row._id)"/>
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
    	title: `Блог | ${process.env.appName}`
	},
    async asyncData({store}) {
		const posts = await store.dispatch('post/fetchAdmin')
        return {posts}
    },
    methods: {
        open(id) {
            this.$router.push(`/admin/post/${id}`)
        },
		createLink() {
			this.$router.push(`/admin/post/create`)
		},
        async remove(id) {
            try {
                await this.$confirm('Удалить пост?', 'Внимание!', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
                })
                await this.$store.dispatch('post/remove', id)
                this.posts = this.posts.filter(p => p._id !== id)
                this.$message.success('Пост удален')
            } catch (e) {

            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
