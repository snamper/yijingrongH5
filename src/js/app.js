FastClick.attach(document.body);

var $window = $(window);

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100* (clientWidth / 375)+ 'px';
    };

  // Abort if browser does not support addEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//andriod手机的点击事件
function iScrollClick(){
	if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
	if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
	if (/Silk/i.test(navigator.userAgent)) return false;
	if (/Android/i.test(navigator.userAgent)) {
		var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
		return parseFloat(s[0]+s[3]) < 44 ? false : true;
	}
}

// 导航栏固定到顶端
function fixedTop() {
    var JNode = $('.topbar'),
        SNode = $('.section');

      if(SNode.length){
        var navwidthTemp = JNode.width(),
            JNodeHeight = JNode.height();
        // 固定导航栏
        $(".contentdetail").on('scroll',function(){
          var SNodetop = SNode.offset().top,
              headHeight = $('.header').height();
          if(SNodetop <= JNodeHeight+headHeight)
          {
              JNode.addClass("fixed");
          }
          else{
              JNode.removeClass("fixed");
          }

          SNode.each(function(){
              var  SNodeTop = $(this).offset().top;
              var headHeight = $('.header').height();
              if(SNodeTop <= (JNodeHeight + headHeight + 6)){
                  var SNodeHref = $(this).attr('id');
                      $('a[name="'+SNodeHref+'"]').parent().addClass('active').siblings().removeClass('active');
              }
        });
    })

      anchorClick();
  }

  }


// 导航栏点击事件
function anchorClick() {
    var links = $('.topbar li a'),
        JNode = $('.topbar'),
        SNode = $('.section'),
        JNodeHeight = JNode.height();
        links.on('click',function(){
            $that = $(this);
            var sUserAgent = navigator.userAgent.toLowerCase();
            var isAndroid = sUserAgent.match(/android/i) == "android";
            if(isAndroid){
                JNode.addClass("fixed");
            }
            var scrollTopValue = $('#'+$that.attr("name")).offset().top,
            nowScroll = $('.ptable').offset().top;
            nowScroll = scrollTopValue - nowScroll - JNodeHeight + 10;
            $(".contentdetail").animate({
              scrollTop: nowScroll + "px"
            }, {
              duration: 200,
              easing: "swing"
            });
            return false;
        })
}

//  当滑动到相应的section位置时导航栏对应相应的链接标签
function linksActive() {
        // 固定导航栏
        $(".contentdetail").on('scroll',function(){
            var JNode = $('.topbar'),
                SNode = $('.section'),
                JNodeHeight = JNode.height();
          SNode.each(function(){
              var  SNodeTop = $(this).offset().top,
                   headHeight = $('.header').height();
              if(SNodeTop <= (JNodeHeight+headHeight+ 6)){
                  var SNodeHref = $(this).attr('id');
                      $('a[name="'+SNodeHref+'"]').parent().addClass('active').siblings().removeClass('active');
              }
          })
    });
}

// 轮播图
if($('#carousel').length){

    var sw = $window.width(),
        $c = $('#carousel'),
        $s = $('#scroller'),
        $i = $('#indicator'),
        l = $s.children().length;
    $c.height(12*sw/25);
    $s.width(sw*l).children().each(function(){
        $i.append('<div></div>');
        $(this).width(sw);
    });
    $i.children().first().addClass('active');

    var Carousel = new IScroll('#carousel',{
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            probeType: 1,
    		mouseWheel: true,
    		click:iScrollClick()
        });

    Carousel.on('scrollEnd',function(){
        $i.find('.active').removeClass('active');
        $i.children().eq(this.currentPage.pageX).addClass('active');
    });

    $c.on('touchmove',function(e){
        e.preventDefault();
    });
}
