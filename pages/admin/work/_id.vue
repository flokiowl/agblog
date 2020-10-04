<template>
	<div class="template-admin">
		<div class="admin-top">
			<div class="admin-top-icon">
				<i class="el-icon-suitcase"></i>
			</div>
			<div class="admin-top-info">
				<h1>{{work.name}}</h1>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/admin' }">Главная</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/admin/works' }">Портфолио</el-breadcrumb-item>
					<el-breadcrumb-item>{{work.currentWork.name}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="admin-content">
			<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Название работы" prop="name">
							<el-input v-model="controls.name" placeholder="Введите название работы"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="Технологии" prop="tech">
							<el-select
								style="width: 100%;"
								v-model="controls.tech"
								:change="techChanged = true"
								multiple
								allow-create
								filterable
								empty
								automatic-dropdown
								placeholder="Технологии">
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
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="Ссылка на сайт" prop="site_link">
							<el-input v-model="controls.site_link" placeholder="Внешняя ссылка на работу"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Ссылка на репозиторий" prop="repo_link">
							<el-input v-model="controls.repo_link" placeholder="Ссылка на репозиторий"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="Текст поста" prop="description">
					<vue-editor :editorOptions="editorSettings" v-model="controls.description"></vue-editor>
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-upload
							ref="uploadImage"
							class="mb image-upload-field"
							drag
							action="https://jsonplaceholder.typicode.com/posts/"
							:auto-upload="false"
							:file-list="work.currentWork.image"
							:on-remove="handleImageRemove"
							:on-change="handleImageChange"
							:on-preview="handlePictureCardPreview"
							:limit="10"
							multiple>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
							<div class="el-upload__tip" slot="tip">файлы с расширением jpg, png, svg и не больше 5 мегабайт</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" :alt="controls.name">
						</el-dialog>
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
				title: `Портфолио | ${this.work.currentWork.name}`
			}
		},
		validate({params}) {
			return Boolean(params.id)
		},
		async asyncData({store, params}) {
			const work = await store.dispatch('work/fetchAdminById', params.id)
			return {work}
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				loading: false,
				imageChanged: false,
				techChanged: false,
				image: [],
				controls: {
					name: '',
					description: '',
					date: '',
					tech: [],
					repo_link: '',
					site_link: ''
				},
				rules: {
					title: [
						{ required: true, message: 'Название работы не может быть пустым', trigger: 'blur' }
					],
					text: [
						{ required: true, message: 'Описание не должно быть пустым', trigger: 'blur' }
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
			this.controls.name = this.work.currentWork.name
			this.controls.description = this.work.currentWork.description
			this.controls.tech  = this.work.currentWork.tech
			this.controls.date  = this.work.currentWork.date
			this.controls.site_link = this.work.currentWork.site_link
			this.controls.repo_link = this.work.currentWork.repo_link
			this.image = this.work.currentWork.image
		},
		methods: {
			handlePictureCardPreview(file) {
				console.log(file, this.image)
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleImageChange(file, fileList) {
				console.log('fileList', fileList)
				this.imageChanged = true
				const isSizeAllow = file.size / 1024 / 1024 < 5
				if (!isSizeAllow) {
					this.$message.error('Размер изображения не должен превышать 5 мегабайт');
					this.$refs.uploadImage.clearFiles()
				} else {
					this.image.push(file.raw)
				}
				console.log('image', this.image)
			},
			handleImageRemove(file, fileList) {
				this.imageChanged = true
				this.image.splice(this.image.indexOf(file), 1)
				console.log(this.image)
			},
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (valid && this.image) {
						this.loading = true
						try {
							const formData = {
								id: this.work._id,
								name: this.controls.name,
								description: this.controls.description,
								date: this.controls.date,
								site_link: this.controls.site_link,
								repo_link: this.controls.repo_link,
							}
							if (this.techChanged) {
								formData.tech = this.controls.tech
							}
							if (this.imageChanged) {
								formData.image = this.image
							}
							await this.$store.dispatch('work/update', formData)
							this.$message.success('Работа обновлена')
							this.loading = false
						} catch (e) {
							this.loading = false
						}
					} else {
						this.$message.warning('Форма не валидна')
					}
				})
			},
			cancel() {
				this.$router.push('/admin/works')
			}
		}
	}
</script>

<style lang="scss">
	.image-upload-field {
		position: relative;
		.el-upload-list {
			position: absolute;
			top: -10px;
			left: 100%;
		}
	}
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
		transform: translate(-50%,-50%) !important;
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
