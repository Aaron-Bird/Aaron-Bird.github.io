$(document).ready(function() {
    if ($('.main-index').length > 0) {
        var articles = $('.cell');
        articles.on('click', function(event) {
            if (event.target.tagName === "A") { return };
            window.location.href = $(this).find('.read-more a')[0].href;
        });
    }
});

// table of contents
$(function() {
    var tocNode = $('.post-toc');
    console.log(tocNode)
    if (tocNode.length === 0) { return };
    var postEl = $('.main>.post');

    $(window).on('resize scroll', function(eve) {
        var topDistance = postEl.offset().top - $(window).scrollTop();
        var leftDistance = postEl.offset().left + postEl.innerWidth();
        if (topDistance <= 100) {
            tocNode.css({
                position: 'fixed',
                left: leftDistance + 'px',
                right: 'auto',
                top: '100px'
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