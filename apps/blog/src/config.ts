export const SITE = {
  website: "https://blog.sixbones.dev/",
  author: "zrr1999",
  profile: "https://blog.sixbones.dev/",
  desc: "一个普通的个人博客",
  title: "六个骨头的博客",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "建议修改",
    url: "https://github.com/zrr1999/sixbones.dev/edit/main/",
  },
  dynamicOgImage: true,
  lang: "cn", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};
