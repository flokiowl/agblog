<template>
	<div class="template-admin">
		<div class="admin-top">
			<div class="admin-top-icon">
				<i class="el-icon-tickets"></i>
			</div>
			<div class="admin-top-info">
				<h1>{{post.title}}</h1>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/admin' }">Главная</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/admin/blog' }">Блог</el-breadcrumb-item>
					<el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="admin-content">
			<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Введите название поста" prop="title">
							<el-input v-model="controls.title" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="Теги" prop="tags">
							<el-select
								style="width: 100%;"
								v-model="controls.tags"
								multiple
								allow-create
								filterable
								empty
								automatic-dropdown
								:change="tagsChanged = true"
								placeholder="Теги">
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="Дата" prop="date">
							<el-date-picker
								style="width: 100%;"
								v-model="controls.date"
								type="date"
								placeholder="Выберите дату"
								:default-value="Date.now()">
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="Текст поста" prop="text">
					<el-button class="mb" type="success" size="mini" plain @click="previewDialog = true">
						<i class="el-icon-view"></i>
					</el-button>
					<vue-editor :editorOptions="editorSettings" v-model="controls.text"></vue-editor>
				</el-form-item>
				<el-dialog title="Предпросмотр" :visible.sync="previewDialog">
					<div :key="controls.text" v-html="controls.text" class="post__body"></div>
				</el-dialog>
				<el-row>
					<el-col :span="6">
						<el-upload
							ref="upload"
							class="mb"
							drag
							action="https://jsonplaceholder.typicode.com/posts/"
							:auto-upload="false"
							:on-remove="handleImageRemove"
							:file-list="post.image"
							:on-change="handleImageChange">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
							<div class="el-upload__tip" slot="tip">файлы с расширением jpg, png, svg и не больше 5 мегабайт</div>
						</el-upload>
					</el-col>
					<el-col :span="18">
						<el-input
							type="textarea"
							:rows="8"
							placeholder="Введите тизер"
							v-model="controls.teaser">
						</el-input>
					</el-col>
				</el-row>
				<el-form-item class="text-center">
					<el-button round @click="cancel">Отмена</el-button>
					<el-button round native-type="submit" type="primary" :loading="loading">Обновить</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import hljs from 'highlight.js'
	import { VueEditor } from "vue2-editor"
	export default {
		layout: 'adminLayout',
		middleware: ['admin-auth'],
		components: {
			VueEditor
		},
		head() {
			return {
				title: `Пост | ${ this.post.title }`
			}
		},
		validate({params}) {
			return Boolean(params.id)
		},
		async asyncData({store, params}) {
			const post = await store.dispatch('post/fetchAdminById', params.id)
			return {post}
		},
		data() {
			return {
				previewDialog: false,
				loading: false,
				image: [],
				imageChanged: false,
				tagsChanged: false,
				controls: {
					title: '',
					text: '',
					tags: [],
					date: '',
					teaser: ''
				},
				rules: {
					text: [
						{ required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }
					]
				},
				editorSettings: {
					theme: 'snow',
					modules: {
						syntax: {
							highlight: text => hljs.highlightAuto(text).value
						}
					}
				}
			}
		},
		mounted() {
			this.controls.title = this.post.title
			this.controls.text = this.post.text
			this.controls.tags  = this.post.tags
			this.controls.date  = this.post.date
			this.controls.teaser = this.post.teaser
			this.image = this.post.image
		},
		methods: {
			handleImageChange(file, fileList) {
				this.imageChanged = true
				fileList.forEach((el) => {
					const isSizeAllow = el.size / 1024 / 1024 < 5
					if (!isSizeAllow) {
						this.$message.error('Размер изображения не должен превышать 5 мегабайт');
						this.$refs.upload.clearFiles()
					} else {
						this.image.push(el.raw)
					}
				})
			},
			handleImageRemove(file, fileList) {
				this.imageChanged = true
				this.image = [...fileList]
			},
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid && this.image) {
						this.loading = true
						try {
							let formData = {
								id: this.post._id,
								title: this.controls.title,
								text: this.controls.text,
								date: this.controls.date
							}
							if (this.tagsChanged) {
								formData.tags = this.controls.tags
							}
							if (this.imageChanged) {
								formData.image = this.image
							}
							await this.$store.dispatch('post/update', formData)
							this.$message.success('Пост обновлен')
							this.loading = false
						} catch (e) {
							this.loading = false
						}
					}
				})
			},
			cancel() {
				this.$router.push('/admin/blog')
			}
		}
	}
</script>

<style lang="scss">
	.quillWrapper {
		background: #fff;
		font-weight: 400;
	}
	.quillWrapper {
		.ql-toolbar.ql-snow {
			line-height: 1 !important;
			border: 1px solid #DCDFE6;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		.ql-container.ql-snow {
			border: 1px solid #DCDFE6;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	.ql-snow .ql-tooltip {
		position: absolute;
		left: 50% !important;
		top: 50% !important;
		transform: translate(-50%,-50%);
	}
	.el-upload-list {
		width: 365px;
	}
	.el-upload-list__item .el-icon-close {
		display: inline-block;
	}
	.post__body {
		font-family: 'Artegra Sans', sans-serif !important;
		.ql-align-center {
			text-align: center;
		}
		.ql-align-right {
			text-align: right;
		}
		.ql-align-justify {
			text-align: justify;
		}
		p {
			font-size: 17px;
			line-height: 25px;
			color: #333;
			font-weight: 400;
			span {
				color: #333 !important;
			}
		}
		img {
			max-width: 100%;
			height: auto;
		}
		a {
			color: rgb(219, 68, 84) !important;
			&:hover {
				text-decoration: underline;
			}
		}
		.ql-syntax {
			display: block;
			overflow-x: auto;
			padding: 15px;
			background: #002b36;
			color: #839496;
		}
		ul {
			li {
				padding-left: 20px;
				position: relative;
				&:before,&:after {
					content: "";
					position: absolute;
					left: 0;
					width: 8px;
					height: 2px;
					background: rgb(219,68,84);
				}
				&:before {
					transform: rotate(47deg);
					top: 7px;
				}
				&:after {
					transform: rotate(-47deg);
					top: 12px;
				}
			}
		}
		code {
			background-color: #eee;
			padding: 2px 10px;
			color: #303335 !important;
			border-radius: 2px;
		}
		blockquote {
			padding: 20px;
			padding-top: 70px;
			text-align: center;
			font-style: italic;
			font-size: 20px;
			color: #333;
			position: relative;
			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				background: #333;
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			&:after {
				content: '\201c';
				position: absolute;
				left: -10px;
				right: 0;
				top: 11px;
				font-size: 62px;
				line-height: 1;
				color: #fff;
				font-family: 'Arial', sans-serif;
			}
		}
	}
</style>
