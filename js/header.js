//- 360自动收录
(function () {
  var src =
    "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
  var bp = document.createElement("script");
  bp.src = src
  bp.id = "sozz"
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp,s)
})();

(function(){
var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
var bp = document.createElement("script");
  bp.src = src
  bp.id = "sozz"
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp,s)
})();


// 百度分析
// var _hmt = _hmt || [];
// (function () {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?c324da2f432614e220668504d972c9e5";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();
// 腾讯分析
var _mtac = {};
(function () {
  var mta = document.createElement("script");
  mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  mta.setAttribute("name", "MTAH5");
  mta.setAttribute("sid", "500730637");

  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mta, s);
})();

//- 百度自动收录
// (function () {
//   var bp = document.createElement("script");
//   var curProtocol = window.location.protocol.split(":")[0];
//   if (curProtocol === "https") {
//     bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
//   } else {
//     bp.src = "http://push.zhanzhang.baidu.com/push.js";
//   }
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(bp, s);
// })();

// stun主题内的header代码 这里配置了之后会覆盖主题里的代码
$(document).ready(function () {
  var $menuBtn = $('.header-nav-menubtn')
  var $menu = $('.header-nav-menu')
  var $menuItem = $('.header-nav-menu-item')
  var $submenu = $('.header-nav-submenu')
  var isMobile = $menuBtn.is(':visible')

  var isMenuShow = false
  var isSubmenuShow = false

  function resetMenuHeight () {
    $menuItem.velocity(
      {
        height: $menuItem.outerHeight()
      },
      {
        complete: function () {
          $submenu.css({ display: 'none', opacity: 0 })
        }
      }
    )
  }

  $(window).on(
    'resize',
    Stun.utils.throttle(function () {
      isMobile = $menuBtn.is(':visible')
      if (isMobile) {
        $submenu.removeClass('hide--force')

        if (isSubmenuShow) {
          resetMenuHeight()
          isSubmenuShow = false
        }
      } else {
        $submenu.css({ display: 'none', opacity: 0 })
      }
    }, 200)
  )

  var isNightModeFocus = true
  var $nightMode = $('.mode')

  $(document).on('click', function () {
    if ($menu.is(':visible')) {
      if (isMobile && isSubmenuShow) {
        resetMenuHeight()
        isSubmenuShow = false
      }
      $menu.css({ display: 'none' })
      isMenuShow = false
    }
    if (isNightModeFocus) {
      $nightMode.removeClass('mode--focus')
      isNightModeFocus = false
    }
  })

  Stun.utils.pjaxReloadHeader = function () {
    $menuBtn = $('.header-nav-menubtn')
    $menu = $('.header-nav-menu')
    $menuItem = $('.header-nav-menu-item')
    $submenu = $('.header-nav-submenu')
    isMobile = $menuBtn.is(':visible')

    isMenuShow = false
    isSubmenuShow = false

    function getNightMode () {
      var nightMode = false
      try {
        if (parseInt(Stun.utils.Cookies().get(NIGHT_MODE_COOKIES_KEY))) {
          nightMode = true
        }
      } catch (err) {
        /* empty */
      }
      return nightMode
    }

    if (CONFIG.nightMode && CONFIG.nightMode.enable) {
      var isNightMode = false
      var NIGHT_MODE_COOKIES_KEY = 'night_mode'
      $nightMode = $('.mode')
      isNightModeFocus = true

      if (getNightMode()) {
        $nightMode.addClass('mode--checked')
        $nightMode.addClass('mode--focus')
        $('html').addClass('nightmode')
        isNightMode = true
      } else {
        isNightMode = false
      }
      $('.mode').on('click', function (e) {
        e.stopPropagation()
        isNightMode = !isNightMode
        isNightModeFocus = true
        Stun.utils.Cookies().set(NIGHT_MODE_COOKIES_KEY, isNightMode ? 1 : 0)
        $nightMode.toggleClass('mode--checked')
        $nightMode.addClass('mode--focus')
        $('html').toggleClass('nightmode')
      })
    }

    $menuBtn.on('click', function (e) {
      e.stopPropagation()
      if (isMobile && isMenuShow && isSubmenuShow) {
        resetMenuHeight()
        isSubmenuShow = false
      }
      if (!isMenuShow) {
        isMenuShow = true
      } else {
        isMenuShow = false
      }
      $menu.velocity('stop').velocity(
        {
          opacity: isMenuShow ? 1 : 0
        },
        {
          duration: isMenuShow ? 200 : 0,
          display: isMenuShow ? 'block' : 'none'
        }
      )
    })

    // Whether to allow events to bubble in the menu.
    var isBubbleInMenu = false
    $('.header-nav-submenu-item').on('click', function () {
      isBubbleInMenu = true
    })

    $menuItem.on('click', function (e) {
      if (!isMobile) {
        return
      }
      var $submenu = $(this).find('.header-nav-submenu')
      if (!$submenu.length) {
        return
      }
      if (!isBubbleInMenu) {
        e.stopPropagation()
      } else {
        isBubbleInMenu = false
      }

      var menuItemHeight = $menuItem.outerHeight()
      var submenuHeight =
        menuItemHeight + Math.floor($submenu.outerHeight()) * $submenu.length
      var menuShowHeight = 0

      if ($(this).outerHeight() > menuItemHeight) {
        isSubmenuShow = false
        menuShowHeight = menuItemHeight
      } else {
        isSubmenuShow = true
        menuShowHeight = submenuHeight
      }
      $submenu.css({ display: 'block', opacity: 1 })
      // Accordion effect.
      $(this)
        .velocity('stop')
        .velocity({ height: menuShowHeight }, { duration: 300 })
        .siblings()
        .velocity({ height: menuItemHeight }, { duration: 300 })
    })

    $menuItem.on('mouseenter', function () {
      var $submenu = $(this).find('.header-nav-submenu')
      if (!$submenu.length) {
        return
      }
      if (!$submenu.is(':visible')) {
        if (isMobile) {
          $submenu.css({ display: 'block', opacity: 1 })
        } else {
          $submenu.removeClass('hide--force')
          $submenu
            .velocity('stop')
            .velocity('transition.slideUpIn', { duration: 200 })
        }
      }
    })

    $menuItem.on('mouseleave', function () {
      var $submenu = $(this).find('.header-nav-submenu')
      if (!$submenu.length) {
        return
      }
      if (!isMobile) {
        $submenu.addClass('hide--force')
        isSubmenuShow = false
      }
    })
  }

  Stun.utils.pjaxReloadScrollIcon = function () {
    if (CONFIG.header && CONFIG.header.scrollDownIcon) {
      $('.header-banner-arrow').on('click', function (e) {
        e.stopPropagation()
        $('#container').velocity('scroll', {
          offset: $('#header').outerHeight()
        })
      })
    }
  }

  // Initializaiton
  Stun.utils.pjaxReloadHeader()
  Stun.utils.pjaxReloadScrollIcon()
})