$(function(){
    
    //인풋을 키보드를 눌렀을때(keypress) 이벤트
    $(".input_area > input[type='text']").keypress(function(event){
        if(event.keyCode == 13 && $(this).val().length != 0){//엔터(keycode=13)일경우와 입력중인input의 value(입력값이) 있을때의 경우가 동시에 만족할 경우만 실행
            console.log($(this).val().length)
            var _val = $(this).val();//입력중인 input의 value값을 담는 변수
            var _time; //입력된 순간의 현재시간을 담는 변수
            var _class = $(this).attr("class"); //입력된 input의 클래스(my,your)를 알아내서 담는 변수

            //입력된 순간의 현재시간 구하기
            var _date = new Date();//Date객체(pc의 시간관련 정보를 담고있는 오브젝트(정보덩어리))
            var _hh = _date.getHours();//시 정보
            var _mm = _date.getMinutes();//분 정보
            var _apm = "오전";//오전,오후 구분하는 변수
            if(_hh > 12){//만약 시간이 12이상일 경우
                _apm ="오후"; //오후로 변경
                //_hh = _hh - 12;
                _hh -= 12; //시간은 12를 감소시킴
            }
            _time = _apm+" "+_hh+":"+_mm; //시간 포멧으로 형태를 바꿔서 변수 저장

            //말풍선 태그를 append를 통해 동적 추가
            $(".chat_area").append('<div class="item '+_class+' on"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>');
            
            //입력후 input의 내용 초기화(삭제)
            $(this).val("");
        }
    });
});