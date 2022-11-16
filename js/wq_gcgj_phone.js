// JavaScript Document
   
var type_all = 1;
function change(type){
$('.tab').hide();
$('.tab').eq(type-1).show();
type_all = type;
$('.js').removeClass('submit_button1').removeClass('submit_button2').removeClass('submit_button3');
$('.js').addClass('submit_button'+type);
}



function showInput(){
var bps = $('#bps').val();
if(bps==0){
$('#bpsInputDiv').show();
}else{
$('#bpsInputDiv').hide();
}

}


function showInput2(){

var bps2 = $('#bps2').val();
if(bps2==0){
$('#bpsInputDiv2').show();
}else{
$('#bpsInputDiv2').hide();
}

}

function check(){

if(type_all==1){
var bps = $('#bps').val();

	if(!$('.wq_radio').prop('checked')){
	alert('请选择计算方向！');
	  return false;
	}

if(bps==0){//自定义
var bpsInput = $('#bpsInput').val();
if(!bpsInput){
alert('自定义码率不能为空');
$('#bpsInput').focus();
return false;
}

if(!isnums(bpsInput)){
alert('自定义码率只能为正整数');
$('#bpsInput').focus();
return false;
}
var bpsInputUnit = $('#bpsInputUnit').val();
bps = parseInt(bpsInput)*bpsInputUnit;

}

var num = $('#num').val();
if(!num){
alert('摄像头数量不能为空');
$('#num').focus();
return false;
}

if(!isnums(num)){
alert('摄像头数量只能为正整数');
$('#num').focus();
return false;
}


var time = $('#time').val();
if(!time){
alert('时间不能为空');
$('#time').focus();
return false;
}

if(!isnum(time)||time==0){
alert('时间只能为正整数或者带一位小数点的数');
$('#time').focus();
return false;
}



num = parseInt(num);

var unit = $('#unit').val();

var result = bps*num*time*unit/8;

result = bytesToSize(result);
var html = '<div style=" border:1px solid orange; margin-right:1rem;background-color: #EEEEEE;"><p style="font-size:14px; padding-top:10px;padding-bottom:10px;margin-left:20px;">提醒： 计算结果仅供参考</p>'+
'<p style="font-size:14px; margin-left:20px;padding-bottom:10px;padding-top:10px;">计算录像大小约为：<span style="color:#ff0000">'+result+'</span></p></div>';

$('#result').html(html);

}	


if(type_all==2){
var bps2 = $('#bps2').val();

if(bps2==0){//自定义
var bpsInput2 = $('#bpsInput2').val();
if(!bpsInput2){
alert('自定义码率不能为空');
$('#bpsInput2').focus();
return false;
}

if(!isnums(bpsInput2)){
alert('自定义码率只能为正整数');
$('#bpsInput2').focus();
return false;
}

var bpsInputUnit2 = $('#bpsInputUnit2').val();
bps2 = parseInt(bpsInput2)*bpsInputUnit2;

}

var volume2 = $('#volume2').val();
if(!volume2){
alert('容量不能为空');
$('#volume2').focus();
return false;
}

if(!isnums(volume2)){
alert('容量只能为正整数');
$('#volume2').focus();
return false;
}



var num2 = $('#num2').val();
if(!num2){
alert('摄像头数量不能为空');
$('#num2').focus();
return false;
}

if(!isnums(num2)){
alert('摄像头数量只能为正整数');
$('#num2').focus();
return false;
}

num2 = parseInt(num2);

volume2 = parseInt(volume2);
volume_unit2 = $('#volume_unit2').val();

var result = (volume2*volume_unit2*0.9)/((bps2*num2)/8);
result = fresh(result);
var html ='<div style=" border:1px solid orange; margin-right:1rem;background-color: #EEEEEE;"><p style="font-size:14px; padding-top:10px;padding-bottom:10px;margin-left:20px;">提醒： 计算结果仅供参考</p>'+ 
'<p style="font-size:14px; margin-left:20px;padding-bottom:10px;padding-top:10px;">计算录像时间约为：<span style="color:#ff0000">'+result+'</span></p></div>';

$('#result').html(html);

}



if(type_all==3){
var volume3 = $('#volume3').val();
if(!volume3){
alert('容量不能为空');
$('#volume3').focus();
return false;
}


if(!isnums(volume3)){
alert('容量只能为正整数');
$('#volume3').focus();
return false;
}


var num3 = $('#num3').val();
if(!num3){
alert('摄像头数量不能为空');
$('#num3').focus();
return false;
}

if(!isnums(num3)){
alert('摄像头数量只能为正整数');
$('#num3').focus();
return false;
}

var time3 = $('#time3').val();
if(!time3){
alert('时间不能为空');
$('#time3').focus();
return false;
}
if(!isnum(time3)){
alert('时间只能为整数或者带一位小数点的数');
$('#time3').focus();
return false;
}


num3 = parseInt(num3);
volume3 = parseInt(volume3);
volume_unit3 = $('#volume_unit3').val();
time_unit3 = $('#time_unit3').val();

var result = (volume3*volume_unit3*0.9)/(time3*time_unit3*num3)*8;
result =  bytesToSize2(result)

var html = '<div style=" border:1px solid orange; margin-right:1rem;background-color: #EEEEEE;"><p style="font-size:14px; padding-top:10px;padding-bottom:10px;margin-left:20px;">提醒： 计算结果仅供参考</p>'+
'<p style="font-size:14px; margin-left:20px;padding-bottom:10px;padding-top:10px;">计算码率约为：<span style="color:#ff0000">'+result+'</span></p></div>';

$('#result').html(html);

}



return false;
}



function bytesToSize(bytes) {
if (bytes === 0) return '0 B';
var k = 1024, // or 1024
sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}




function bytesToSize2(bytes) {
if (bytes === 0) return '0 B';
var k = 1000, // or 1024
sizes = ['b/S', 'Kb/S', 'Mb/S', 'Gb/S', 'Tb/S', 'Pb/S', 'Eb/S', 'Zb/S', 'Yb/S'],
i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}


function fresh(leftsecond){

if(leftsecond<0){leftsecond=0;}

d=parseInt(leftsecond/3600/24);

h=parseInt((leftsecond/3600)%24);

m=parseInt((leftsecond/60)%60);

s=parseInt(leftsecond%60);

all = d+"天 "+h+"时"+m+"分"+s+"秒";

return all;

}





$(function(){
    $('ul.nav2 li').click(function(){
        $(this).addClass('active1').siblings('li.active1').removeClass('active1');
        $('div.all_index>div:eq('+$(this).index()+')').show().siblings().hide();
    });
    
    $("#navarea li").hover(function () { 
        $(this).find("div:eq(0)").show(); 
    }, function () { 
        $(this).find("div:eq(0)").hide(); 
    }); 

    // 搜索
    $(".findmod").mouseover(function(){
        $("#search_type_content").addClass("cur");
        $("#Z_search_info").show();    
    }).mouseleave(function(){
        $("#search_type_content").removeClass("cur");
        $("#Z_search_info").hide();    
    });    
    
    
    $("#Z_search_info >li").mouseover(function(){
        $(this).addClass("hov");        
    }).mouseleave(function(){
        $(this).removeClass("hov");        
    });        
    
    $("#Z_search_info > li").click(function(){
        var type_data   = $(this).data();        
        var type_id     = parseInt(type_data.type_id);
        
        //$("#search_type_content").html(type_arr[type_id] + "<i></i>");
        $("#Z_search_type").val(type_id);
        $("#Z_search_info").hide();
    });
});


function isnums(num){
	var isnums=/^-?\d+$/;
	return(isnums.test(num));
	}


function isnum(num){
	var isnums=/^\d+(\.\d{1})?$/;
	return(isnums.test(num));
	}