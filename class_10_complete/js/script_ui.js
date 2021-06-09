$(function(){
    //init();//초기함수 호출(임시)
    var _tc = $(".hidden-wrap > img").length; //이미지 총 갯수
    $(".hidden-wrap > img").imagesLoaded()
    .done(function(){ //모든 이미지 로드가 완료되는 시점에 발생하는 이벤트
        setTimeout(function(){
            $(".preload-wrap").addClass("complete");
            setTimeout(function(){
                $(".preload-wrap").remove();
            },700);
            init();
        },1000)
        
    })
    .progress(function(index){ //이미지 각각의 로드가 완료되는 시점에 한번씩 발생하는 이벤트
        var _pc = index.progressedCount;
        var _per = Math.floor(_pc / _tc * 100);
        //console.log(_per);
        $(".preload-wrap .count").text(_per);
        $(".preload-wrap .count").css("width", _per + "%");
    });
    //console.log(_tc);
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
        afterLoad:function(name, index){//해당화면에 도착시 발생하는 이벤트(index(순서)값을 알수 있음)
            //console.log(name, index)
            //$(".section").removeClass("on");
            $(".section").eq(index-1).addClass("on");
        },
        onLeave:function(old, index, direction){//해당화면을 떠날때 발생하는 이벤트(index = 도착하는 화면의 순서)
            //console.log(old, index, direction);
            if(index == 1){
                $("#section0 .ico").css("transform", "translateY(0)");
            }else{
                $("#section0 .ico").css("transform", "translateY(-330px)");
            }
        }
    })

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
    $("#section3 .photo-wrap > ul").slick({// slick jquery 플러그인
        arrows:false, //좌우버튼 비활성화
        slidesToShow:3, //한화면에 보여지는 이미지 갯수
        variableWidth:true, //이미지 크기만큼 보여줌(겸침현상 X)
        centerMode:true //기본 왼쪽 정렬이지만 가운데 정렬로 변경 시켜줌
    }).on("afterChange", function(event, slick, current){// 슬라이드가 한번 이동시 발생되는 이벤트(current인자: 순번(index))
        console.log(current);
        $("#section3 .txt-wrap > ul > li").removeClass("on"); //li전체의 on클래스를 삭제
        $("#section3 .txt-wrap > ul > li").eq(current).addClass("on"); //해당 index의 li에 on클래스를 추가
    })

    //portfolio cursor 효과
    document.addEventListener("mousemove",function(event){
        var pw = $(".photo-wrap").position().top; //커서의 부모인 photo-wrap의 상단 공간값 구함(공간값이 커서와 마우스 포인터의 차이를 없앰)
        var mx = event.pageX - 15; //마우스 x좌표값
        var my = event.pageY - 15 - pw; //마우스 y좌표값
        //console.log($(".photo-wrap").position().top)
        $("#section3 .photo-wrap .cursor").css({"top":my, "left":mx});
    })

    //// contact
    $("#section4 .input-wrap input[type=text]").on("textInput", function(event){ //input의 키프레스 이벤트
        var _t = event.originalEvent.data; //키프레스시 타이핑한 값(한글까지 체크함)
        //rgb(색상코드)에 쓰일 랜덤값(3개) 구함
        var _r = Math.floor(Math.random()*256); //Math.random: 랜덤값, Math.floor: 소수점 버림
        var _g = Math.floor(Math.random()*256);
        var _b = Math.floor(Math.random()*256);
        //애니메이션 타입을 랜덤으로 정할 값 구험(0~2)
        var _rn = Math.floor(Math.random()*3);
        
        // append : 추가될대상.append(추가객체)
        // appendTo : 추가객체.appendTo(추가될대상).추가이벤트1.추가이벤트2 ...
        // $("#section4 .txt-wrap .area").append("<span class='ani-"+_rn+"' style='color:rgb("+_r+", "+_g+", "+_b+")'>"+_t+"</span>");
        $("<span class='ani-"+_rn+"' style='color:rgb("+_r+", "+_g+", "+_b+")'>"+_t+"</span>")
        .appendTo($("#section4 .txt-wrap .area"))
        .on("animationend",function(){//css에서 만든 애니메이션이 끝나는 시점에 이벤트 발생
            $(this).remove(); //자신을 삭제
        })
        
    })

}