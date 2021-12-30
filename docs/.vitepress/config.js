module.exports = {
  port: '8080',
  base: '/',
  lang: 'zh-CN',
  title: '六个骨头的主页',
  description: '这是我的第一个 VitePress 站点',

  theme: './theme',
  themeConfig: {
    // logo: '/logo.svg',
    nav: [// 导航栏
      {
        text: '概述',
        link: '/'
      }, {
        text: '收藏夹',
        items: [
          { text: '其他', link: '/notes/math' },
        ]
      }, {
        text: '项目介绍',
        items: [
          { text: '笔记', link: '/guide/vue/test03' }, // 可不写后缀 .md
          { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
        ]
      }, {
        text: '学习笔记',
        items: [
          { text: '数学', link: '/notes/math' },
          { text: '电子信息', link: '/notes/electronic' },
          { text: '互联网技术', link: '/notes/web' },
          { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
        ]
      }, {
        text: '友情链接',
        items: [
          { text: 'JackZhu的博客', link: 'http://jackzhu.top/' },
        ]
      }
    ],
  },
}

// nohup yarn docs: dev--port 8080 &
