var loadData; //로드된 json데이터를 담는 변수
var nameArr = []; //선택된 자리면을 저장하는 배열
var totalPrice = 0; //선택된 자리의 가격의 총합을 저장해주는 변수

$(function(){
    //인트로 관련함수 호출
    introFn();
    
    //자리셋팅 click이벤트
    $(".btn_setting").click(function(){
        reserveFn();
    });

    //자리선택 완료 click 이벤트
    $(".btn_submit").click(function(){
        $(".section.reservation").hide();
        $(".section.complete").show();
    });

    //완료후 리셋 click이벤트
    $(".btn_reset").click(function(){
        $(".section.complete").hide();
        $(".box_intro").show();
    });
})

//인트로 함수
function introFn(){
    $(".section.reservation").hide();
    $(".section.complete").hide();
}

//자리선택 함수
function reserveFn(){
    $(".section.reservation").show();
    $(".box_intro").hide();

    //자리선택 초기화 (li를 삭제처리)
    $(".section.reservation > ol").empty();
    //하단 선택정보 초기화
    $(".txt_info_number").text("");
    $(".txt_info_total").text(0);

    //json데이터 로드하는 ajax
    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success:function(result){
            //ajax결과값을 변수에 담는다
            loadData = result.seatInfo;

            //자리셋팅 반복문
            for(var i=0; i<loadData.length; i++){
                var n = loadData[i].name;
                var p = loadData[i].price;
                var r = loadData[i].reserve;
                $(".section.reservation > ol").append('<li class="unit"><button data-price="'+p+'" '+r+'>'+n+'</button></li>');
            }

            //동적으로 세팅된 버튼의 클릭 이벤트
            $(".section.reservation > ol .unit > button").click(function(){
                //select클래스 토글기능(있으면 빼주고 없으면 넣어주는 기능)
                $(this).toggleClass("select");
                
                nameArr = []; //배열 초기화
                totalPrice = 0; //총합계 초기화
                //셋팅된 11개의 버튼을 탐색(each문을 통해)
                $(".section.reservation > ol .unit > button").each(function(index){
                    //해당 순번의 버튼아 select라는 클래스가 있을 경우 true발생(hasClass를 통해)
                    if($(this).hasClass("select")){
                        //select를 갖고있는 버튼 순서에서 작동
                        nameArr.push(loadData[index].name) //배열에 선택된 자리명을 추가해줌
                        //totalPrice = totalPrice + loadData[index].price;
                        totalPrice += Number(loadData[index].price); //총합계변수에 선탣된 자리가격을 더함
                    }
                })
                //console.log(totalPrice)

                //자리 선택시 하단 정보를 업데이트
                $(".txt_info_number").text(nameArr);
                $(".txt_info_total").text(totalPrice);

                //자리 선택시 왼료 페이지의 정보를 업데이트
                $(".section.complete .txt_number").text(nameArr);
                $(".section.complete .txt_price > strong").text(totalPrice);
            });

        }
    });
}