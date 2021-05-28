$(function(){
    init(); //초기함수 호출(임시)
});

//초기함수
function init(){
    //풀페이지 셋팅
    $(".fullpage").fullpage({
        sectionsColor:["", "#eaeef2", "#b6e4fe", "#e2dcd4", "#fff"], //배경색 설정
        navigation:true, //메뉴 유무
        navigationTooltips:["MAIN", "PROFILE", "SKILL", "PORTFOLIO", "CONTACT"], //메뉴명
        scrollingSpeed:1500, //메뉴이동 스크롤 스피드
        anchors:["main", "profile", "skill", "portfolio", "contact"],
    });

    //// 메인
    // 배경처리(페럴럭스 플러그인)
    $("#section0").parallax({
        imageSrc:"img/bg_main.png"
    });

    $("#section0 .link-wrap .link-unit .btn").mouseover(function(){
        var _index = $(this).parent().index();
        $("#section0 .bg-wrap .bg").removeClass("on");
        $("#section0 .bg-wrap .bg").eq(_index).addClass("on");
    });

    $("#section0 .link-wrap .link-unit .btn").mouseout(function(){
        $("#section0 .bg-wrap .bg").removeClass("on");
    });
}