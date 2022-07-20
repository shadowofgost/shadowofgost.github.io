/*
 * @Author           : Albert Wang
 * @Time             : 2022-07-11 19:28:38
 * @Description      :
 * @Email            : shadowofgost@outlook.com
 * @FilePath         : /Blog/hexo-offline.config.cjs
 * @LastTime         : 2022-07-11 19:28:54
 * @LastAuthor       : Albert Wang
 * @Software         : Vscode
 * Copyright Notice : Copyright (c) 2022 Albert Wang 王子睿, All Rights Reserved.
 */
// offline config passed to workbox-build.
module.exports = {
  globPatterns: ['**/*.{js,html,css,png,jpg,gif,svg,webp,eot,ttf,woff,woff2}'],
  // 靜態文件合集，如果你的站點使用了例如 webp 格式的文件，請將文件類型添加進去。
  globDirectory: 'public',
  swDest: 'public/service-worker.js',
  maximumFileSizeToCacheInBytes: 10485760, // 緩存的最大文件大小，以字節為單位。
  skipWaiting: true,
  clientsClaim: true,
}
