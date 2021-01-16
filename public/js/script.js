$(document).ready(function () {

    // 回到頂端
jsBackToTop.addEventListener("click", ()=>{
    $('html, body').animate({ scrollTop: 0 }, 200);
}, true);

//改變收藏狀態
star.addEventListener("click",()=>{
    $('#star').toggleClass('like')
    $('#star').toggleClass('un-like')
})

});