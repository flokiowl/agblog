<template>
    <div class="comment__item">
		<div class="comment__image">
			<span>{{comment.name | firstLetter}}</span>
		</div>
		<div class="comment__inner">
			<header class="comment__header">
				<cite class="comment__author">{{comment.name}}</cite>
				<time class="comment__time">{{this.commentTime}}</time>
				<!--<span>Редактировать</span>
				<span>Удалить</span>-->
			</header>
			<div class="comment__body" v-html="comment.text" :key="comment.text"></div>
		</div>
	</div>
</template>

<script>
	const moment = require('moment')
	export default {
		props: {
			comment: {
				type: Object,
				required: true
			}
		},
		computed: {
			commentTime() {
				let commentTime = new Date(this.comment.date)
				return moment(commentTime, "YYYYMMDD").locale('ru').fromNow();
			}
		},
		filters: {
			firstLetter: function (value) {
				if (!value) return ''
				value = value.toString()
				return value.charAt(0)
			}
		}
	}
</script>

<style lang="scss" scoped>
    .comment__item {
        display:flex;
		margin-bottom: 60px;
    }
	.comment__image {
		min-width: 75px;
		min-height: 75px;
		max-height: 75px;
		margin-right: 20px;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		span {
			font-size: 50px;
			line-height: 1;
			font-weight: 400;
			text-transform: uppercase;
			display: inline-block;
			margin-top: 10px;
			color: #555;
			opacity: 0.5;
		}
	}
	.comment__author {
		display: inline-block;
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: 700;
		font-style: normal;
		/*text-transform: uppercase;*/
		color: #000;
	}
	.comment__time {
		display: inline-block;
		padding-left: 11px;
		font-size: 14px;
		font-style: italic;
		color: #777;
	}
    .comment__body {
		white-space: pre-line;
		color: #555;
		font-size: 16px;
		line-height: 18px;
    }

	@media screen and (max-width:768px) {
		.comment__inner {
			flex-grow: 1;
		}
		.comment__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;
		}
		.comment__author {
			margin-bottom: 0;
		}
		.comment__time {
			line-height: 1;
		}
	}

	@media screen and (max-width:550px) {
		.comment__image {
			min-width: 55px;
			min-height: 55px;
			max-height: 55px;
			margin-right: 10px;
			span {
				font-size: 38px;
			}
		}

		.comment__body {
			font-size: 14px;
		}
	}

</style>
