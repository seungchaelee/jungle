$(function(){
    init();//초기함수 호출(임시)
});

//초기함수
function init(){
    //풀페이지 셋팅
    $(".fullpage").fullpage({
        sectionsColor:["", "#eaeef2", "#b6e4fe","#e2dcd4","#fff"],//배경색 설정
        navigation:true,//메뉴 유무
        navigationTooltips:["MAIN", "PROFILE", "SKILL", "PORTFOLIO", "CONTACT"],//메뉴명
        scrollingSpeed:1500,//메뉴이동 스크롤 스피드
        anchors:["main", "profile", "skill", "portfolio", "contact"],//주소생성 및 메뉴 바로가기
    });

    ////메인
    //배경처리(패럴럭스 플러그인)
    $("#section0").parallax({
        imageSrc:"img/bg_main.png"
    });

    $("#section0 .link-wrap .link-unit .btn").mouseover(function(){
        var _index = $(this).parent().index();//순서 찾기(index)
        $("#section0 .bg-wrap .bg").removeClass("on");//기존 on클래스 초기화
        $("#section0 .bg-wrap .bg").eq(_index).addClass("on");//같은 순번의 배경 on클래스 추가
    });

    $("#section0 .link-wrap .link-unit .btn").mouseout(function(){
        $("#section0 .bg-wrap .bg").removeClass("on"); //마우스 아웃시 on클래스 초기화
    });

    ////profile
    $("#section1 .link-wrap .link-unit .btn").mouseover(function(){
        var _index = $(this).parent().index() + 1;
        $("#section1 .bg-wrap").removeClass("on-1 on-2 on-3");
        $("#section1 .bg-wrap").addClass("on-" + _index);
    });

    $("#section1 .link-wrap .link-unit .btn").mouseout(function(){
        $("#section1 .bg-wrap").removeClass("on-1 on-2 on-3");
    });

    ////skill
    var _pos = [100, 45, 70, 25]; //좌표값
    var setId; //setInterval을 담는 변수
    $("#section2 .link-wrap .link-unit .btn").mouseover(function(){
        var _index = $(this).parent().index();
        var _posReverse = 100 - _pos[_index]; //좌표값 배열에서 index로 값을 찾고 그값을 100기준으로 반전
        $("#section2 .wave-wrap .unit").css("transform","translateY("+_posReverse+"%)"); //높이값 제어
        clearInterval(setId);
        setId = setInterval(checkPos,10); //카운팅 효과를 위한 setInterval을 호출하고 변수에 담음
    });
    $("#section2 .link-wrap .link-unit .btn").mouseout(function(){
        $("#section2 .wave-wrap .unit").css("transform","translateY(100%)");
    });

    $("#section2 .wave-wrap .unit").on("transitionend",function(){//setInterval을 멈추기 위한 애니메이션 끝시점 체크(transition 움직임이 끝날때)
        clearInterval(setId);//setInterval을 clear처리
    });

    //높이값을 체크해서 숫자를 업데이트 해주는 함수
    function checkPos(){
        var _tpos = $("#section2 .wave-wrap .unit").css("transform").split(",")[5]; //파도(unit)에 대한 transform값(matrix)중에서 6번째 값만 가져옴
        _tpos = _tpos.replace(")",""); //값뒤의 ")"부분을 replace를 통해 제거
        var _th = $("#section2 .wave-wrap").height(); //백분률로 표현하기 위한 전체 높이값을 알아냄
        var _per = _tpos / _th; //현재값 / 전체값
        var _per1 = 100 - Math.round(_per * 100); //백분율로 표현후 다시 100기준으로 반전
        $("#section2 .wave-wrap .unit .num > strong").text(_per1); //strong태그에 업데이트
    }

    ////portfolio
    $("#section3 .photo-wrap > ul").slick();

}