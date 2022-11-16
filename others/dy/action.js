/**
* Created by BEWINDOWEB on 2017/10/3.
*/
//执行“点赞+1”功能

function ac_article_upcount(aid,ip){
    var params = {"id":aid,"ip":ip};
    url = 'action/article_upcount.php';
    $.post(url,params,function(data){
        document.getElementById("cb_article_upcount"+"_"+aid).innerText =  data;
    },"json");
}


//后台退出登录
function ac_admin_exit(){
    var params = {};
    url = '../action/admin_exit.php';
    $.post(url,params,function(data){
        window.location.href = "../heiheihei.php";
    },"json");

}

//后台-首页管理-页面加载
function ac_admin_page(page){
    var elem = document.getElementById("href_content");
    elem.src = page;
}


function backup(aid){
    var params = {id:aid};
    url = 'action/article_upcount.php';
    $.post(url,params,function(data){
        //alert(data);//这个data就是test_post.php返回的数据
    },"text");
}