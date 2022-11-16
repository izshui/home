/* ajax检查用户是否登录，并显示相应的登录状态 */
/**
function ajaxLoginInfo(urlKey) {
    if(!urlKey){
        var href = window.location.href;
        var hash = window.location.hash;
        if(hash){
          href = href.replace(hash, "");
        }
        urlKey = href;
    }
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: '/user/user/AjaxLoginInfo',
        jsonpCallback: "callbackUserinfo",
        data: {urlKey: urlKey},
        success: function(data) {
            if (data.status) {
                $('#check_login').html(data.content);
            }
        },
        error: function(data) {
            alert('服务器无响应，请联系管理员!');
        }
    });
}
$(function(){
    ajaxLoginInfo();
});
**/