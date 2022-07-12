// -*- coding: utf-8 -*-
/**
 * @Author           :  Albert Wang
 * @Time             : 2022-07-12 13:24:10
 * @Description      :
 * @Email            :  shadowofgost@outlook.com
 * @FilePath         : /Blog/gulpfile.js
 * @LastTime         : 2022-07-12 15:15:09
 * @LastAuthor       :  Albert Wang
 * @Software         :  Vscode
 * @ Copyright Notice : Copyright (c) 2022 Albert Wang 王子睿, All Rights Reserved.
 */
var gulp = require('gulp');
var cleanCSS = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var htmlclean = require("gulp-htmlclean");
var imagemin = require("gulp-imagemin");
var pump = require("pump");
const terser = require("gulp-terser");

//pwa
//gulp.task("generate-service-worker", () => {
//	return workbox.injectManifest({
//		swSrc: "./hexo-offline.config.js",
//		swDest: "./public/service-worker.js",
//		globDirectory: "./public",
//		globPatterns: ["**/*.{html,css,js,json,woff2}"],
//		modifyURLPrefix: {
//			"": "./",
//		},
//	});
//});

//minify js tester
gulp.task("compress", async(cb)=> {
	//var options = {};
	await pump(
		[
			gulp.src(["./public/**/**/*.js", "!./public/**/**/*.min.js"]),
			terser(),
			gulp.dest("./public"),
		],
		cb
	);
});

//css
gulp.task("minify-css", async() => {
	return await gulp
		.src("./public/**/**/*.css")
		.pipe(
			cleanCSS({
				compatibility: "ie11",
			})
		)
		.pipe(gulp.dest("./public"));
});

// 压缩 public 目录内 html
gulp.task("minify-html", async() => {
	return  await gulp
		.src("./public/**/*.html")
		.pipe(htmlclean())
		.pipe(
			htmlmin({
				removeComments: true, //清除 HTML 註释
				collapseWhitespace: true, //压缩 HTML
				collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
				removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
				removeScriptTypeAttributes: true, //删除 <script> 的 type="text/javascript"
				removeStyleLinkTypeAttributes: true, //删除 <style> 和 <link> 的 type="text/css"
				minifyJS: true, //压缩页面 JS
				minifyCSS: true, //压缩页面 CSS
				minifyURLs: true,
			})
		)
		.pipe(gulp.dest("./public"));
});

// 压缩 public/uploads 目录内图片
gulp.task("minify-images", async () => {
	await gulp.src("./public/**/img/*.*")
			.pipe(
			imagemin({
				optimizationLevel: 5, //类型：Number  预设：3  取值範围：0-7（优化等级）
				progressive: true, //类型：Boolean 预设：false 无失真压缩jpg图片
				interlaced: true, //类型：Boolean 预设：false 隔行扫描gif进行渲染
				multipass: true, //类型：Boolean 预设：false 多次优化svg直到完全优化
			})
		)
			.pipe(gulp.dest("./public"));
});

// 执行 gulp 命令时执行的任务
gulp.task(
	"default",
	gulp.series(
		gulp.parallel("compress", "minify-html", "minify-css", "minify-images")
	)
);
