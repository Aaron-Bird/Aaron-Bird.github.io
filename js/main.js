$(document).ready(function() {
    if ($('.main-index').length > 0) {
        var articles = $('.cell');
        articles.on('click', function(event) {
            if (event.target.tagName === "A") { return };
            window.location.href = $(this).find('.read-more a')[0].href;
        });
    }
});

// $(function(){
//     var navEls = $('#top-nav li a')
//     navEls.each(function (_, el) {
//         $(el).on('mouseenter', function(event) {
//             var text = new Blotter.Text(event.currentTarget.innerText, {
//                 family : "serif",
//                 size : 6,
//               });
//               var material = new Blotter.RollingDistortMaterial();
//               material.uniforms.uSpeed.value = 0.25;
//               var blotter = new Blotter(material, {
//                 texts : text
//               });
//               $(el).children('a').hide()
//               var scope = blotter.forText(text);
//               scope.appendTo(el);
//         })
//         $(el).on('mouseleave', function() {
//             $(el).children('a').show()
//             $(el).children('canvas').remove()
//          })
//     })
// })

// table of contents
$(function() {
    var tocNode = $('.post-toc');
    if (tocNode.length === 0) { return };
    var postEl = $('.main>.post');

    $(window).on('resize scroll', function(eve) {
        var topDistance = postEl.offset().top - $(window).scrollTop();
        var leftDistance = postEl.offset().left + postEl.innerWidth();
        if (topDistance <= 10) {
            tocNode.css({
                position: 'fixed',
                left: leftDistance + 'px',
                right: 'auto',
                top: '10px'
            });
        } else {
            tocNode.css({
                'position': 'absolute',
                right: '-300px',
                left: 'auto',
                top: 'auto'
            });
        }
    });

    $('.post-toc').find('.toc-link').on('click', function(event) {   
        // li.toc-item 
        // ├──a.toc-link < this
        // │   ├──span.toc-text < event
        // ├──ol.toc
        // │   ├──li.toc-item < show these li
        // │   ├──...
        // li.toc-item 
        // ├──a.toc-link
        // ├──ol.toc
        // │   ├── li.toc-item < hide these li
        // │   ├──...
        // li...
        var parent = this.parentElement;
        // show child element
        $(parent).children('ol').children('li').show();
        // hide child element of parent's slibing elements  
        $(parent).siblings('li').find('li').hide();
        // get target title's height
        var moveDis = $(this.getAttribute('href')).offset().top;
        // scroll animation 
        $('html, body').animate({
            scrollTop: moveDis,
        }, 500);
        // fix bug: navigation beats when clicking navigation elements
        return false;
    });
});