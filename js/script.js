const headerEl = document.querySelector('.header')
const btnNavEl = document.querySelector('.btn-mobile-nav')
const yearEl = document.querySelector('.year')
const linkEls = document.querySelectorAll('a:link')
const sectionHeroEl = document.querySelector('.section-hero')

/**
 * 设置网站 copyright 年份
 */
yearEl.textContent = new Date().getFullYear()

/**
 * mobile navigation 显示和隐藏
 */
btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open')
})

/**
 * 平滑滚动效果
 */
linkEls.forEach(function (linkEl) {
  linkEl.addEventListener('click', function (event) {
    // 阻止默认滚动到链接位置的行为
    event.preventDefault()

    const href = linkEl.getAttribute('href')
    // 滚动到顶部
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    // 滚动到对应的锚点位置, 现在的href是这样的，比如 #meals，#pricing，...。特别像 id 选择器
    if (href !== '#' && href.startsWith('#')) {
      // 根据href（id选择器）选择对应的section
      const sectionEl = document.querySelector(href)
      sectionEl.scrollIntoView({ behavior: 'smooth' })
    }

    // 关闭 mobile navigation
    if (linkEl.classList.contains('main-nav-link')) {
      headerEl.classList.toggle('nav-open')
    }
  })
})

/**
 * Sticky navigation
 */
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]
    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky')
    } else {
      document.body.classList.remove('sticky')
    }
  },
  {
    root: null, // 视口, null 代表视口是浏览器窗口
    threshold: 0, // 0 代表完全不在视口内就触发回调函数, 1 代表完全进入视口才触发回调函数
    rootMargin: '-80px', // 根元素的 margin, 视口向上扩展80px
  },
)
obs.observe(sectionHeroEl)
