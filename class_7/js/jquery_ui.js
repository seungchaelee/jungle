$(function(){
    //인풋을 키보드를 눌렀을때 (keypress) 이벤트
    $(".input_area > input[type = 'text']").keypress(function(event){

        if(event.keyCode == 13 && $(this).val().length != 0){ //엔터(keycode=13)일 경우와 입력중인 input의 value(입력값이) 값이 있을때 경우가 동시에 만졸할 경우만 실행
            var _val = $(this).val(); //입력중인 input의 value값을 담는 변수
            var _time; //입력된 순간의 현재시간을 담는 변수
            var _class = $(this).attr("class"); //입력된 input의 클래스 (my,your)를 알아내서 담는 변수

            //입력된 순간의 현재 시간 구하기
            var _date = new Date(); //Date객체(pc의 시간 관련 정보를 담고있는 오브젝트(정보덩어리))
            var _hh = _date.getHours(); //시 정보
            var _mm = _date.getMinutes(); //분 정보
            var _apm = "오전"; //오전,오후 구분하는 변수 
            if(_hh > 12){ //만약 시간이 12이상일 경우 
                _apm = "오후"; //오후로 변경
                // _hh = _hh - 12;
                _hh -= 12; //시간은 12를 감소시킴
            }
            _time = _apm+" "+_hh+":"+_mm; //시간 포멧으로 형태를 바꿔서 변수 저장 

            //말풍선 태그 append를 통해 동적 추가
            $(".chat_area").append('<div class="item '+_class+' "><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>');

            //동적으로 말풍선 추가된 이후 애니메이션 처리
            setTimeout(function(){ //setTimeout을 사용한 이유는 애니메이션 관련 클래스 사용시 동일 시점에 발생하면 애니메이션이 작동하지 않아 딜레이를 주기위해 사용함
                $(".chat_area .item").addClass("on");
            },10);

            //입력후 input의 내용 초기화(삭제)
            $(this).val("");

            //채팅창 맨 밑으로 갈수 있게 하는 스코롤 이벤트
            var _itemH = 0; //말풍선(item)들의 각각의 높이를 더해줄 변수

            //each문(반복문)을 통해 선택한 각요소들의 높이값을 체크 할수 있음
            $(".chat_area .item").each(function(index){
                // console.log($(this).height());
                _itemH += $(this).height() + 15;
            });
            //console.log(_itemH);

            //채팅창 영역에 스크롤 애니메이션 이벤트 발생시킴
            $(".chat_area").stop().animate({
                scrollTop:_itemH
            });
        }
    });
});