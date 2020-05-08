<template>
	<el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form" class="demo-ruleForm">
        <h2 class="comment__title">Добавить комментарий</h2>
		<el-form-item class="comment__name" label="Ваше имя" prop="name" v-if="!userName">
			<el-input v-model="controls.name" />
		</el-form-item>
		<el-form-item class="comment__name" label="Ваше имя" prop="name" v-else>
			<el-input v-model="controls.name" disabled />
			<span class="comment__name-change" @click="clearName">Изменить</span>
		</el-form-item>
        <el-form-item class="comment__text" label="Текст комментария" prop="text">
			<vue-editor :editorOptions="editorSettings" :editorToolbar="customToolbar" v-model="controls.text"></vue-editor>
		</el-form-item>
		<el-form-item class="comment__submit intro__button">
			<span class="ui-line-decore"></span>
			<button type="submit" class="btn-default default--hover">
				Отправить
				<i class="ui-decor ml"></i>
			</button>
		</el-form-item>
	</el-form>
</template>

<script>
	import hljs from 'highlight.js'
	import { VueEditor } from "vue2-editor"
	import Cookie from 'cookie'
	import Cookies from 'js-cookie'
	import { uuid } from 'vue-uuid'
	export default {
		props: {
			postId: {
				type: String
			},
			workId: {
				type: String
			}
		},
		components: {
			VueEditor
		},
        data() {
            return {
                loading: false,
				uuid: uuid.v1(),
				userId: null,
				userName: null,
                controls: {
                    name: '',
                    text: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
                    ],
                    text: [
                        { required: true, message: 'Введите ваш комментарий', trigger: 'change' }
                    ]
                },
				editorSettings: {
					theme: 'snow',
					modules: {
						syntax: {
							highlight: text => hljs.highlightAuto(text).value
						}
					}
				},
				customToolbar: [
					["bold", "italic", "underline"],
					[{ list: "ordered" }, { list: "bullet" }],
					[{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
					['blockquote', 'code-block'],
					[{ 'color': [] }, { 'background': [] }],
					[{ 'script': 'sub'}, { 'script': 'super' }],
					['clean']
				]
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true
                        const formData = {
                            name: this.controls.name,
                            text: this.controls.text
                        }
                        if (this.postId) {
							formData.postId = this.postId
						}
                        if (this.workId) {
							formData.workId = this.workId
						}
						if (!!Cookies.get('uid') === false) {
							Cookies.set('uid', this.uuid.v4())
						}
						if (!!Cookies.get('userName') === false) {
							Cookies.set('userName', this.controls.name)
						}
                        try {
                        	const newComment = await this.$store.dispatch('comment/create', formData)
                            this.$message.success('Комментарий добавлен')
                            this.$emit('created', newComment)
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
			clearName() {
            	Cookies.remove('userName')
				this.userName = null
			}
        },
		mounted() {
			if (!!Cookies.get('uid')) {
				this.userId = Cookies.get('uid')
			}
			if (!!Cookies.get('userName')) {
				this.userName = Cookies.get('userName')
				this.controls.name = this.userName
			}
		}
	}
</script>

<style lang="scss">
	.comments,
	.work__comments {
		.quillWrapper {
			margin-top: 40px;
			font-weight: 400;
			background: #f4f4f4;
			.ql-toolbar.ql-snow {
				display: flex;
				flex-wrap: wrap;
				border: 0;
				border-bottom: 3px solid #fff;
			}
			.ql-container.ql-snow {
				border: 0;
			}
			.ql-formats {
				margin-bottom: 0;
				button,span {
					&:focus {
						outline: none;
					}
				}
				.ql-color {
					top: 0;
				}
				.ql-background {
					margin-top: -2px;
				}
			}
		}
	}
	.comment__name {
		position: relative;
		margin-bottom: 12px;
		.el-input__inner {
			background: #f4f4f4;
			border-radius: 0;
			border: 0;
			padding: 4px 20px;
			height: auto;
		}
		.el-input.is-disabled {
			.el-input__iner {
				background-color: #eee;
				border-color: #eee;
			}
		}
	}
	.comment__name-change {
		position: absolute;
		top: 15px;
		right: 0;
		font-size: 12px;
		line-height: 1;
		color: #777;
		cursor: pointer;
		&:hover {
			color: #777;
			text-decoration: underline;
		}
	}
	.comment__submit {
		.ui-line-decore {
			margin-top: 0;
			&:after {
				height: 70px;
				margin-top: 15px;
			}
		}
		button {
			font-size: 13px;
			font-weight: 700;
			width: 130px;
			text-align: left;
			white-space: nowrap;
			font-family: 'Artegra sans', sans-serif;
			border: 0;
			background: transparent;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
			&:focus {
				outline: none;
			}
		}
	}
</style>
