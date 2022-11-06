
window.callback = function(res){
    if(res.ret === 0){
        var but = document.getElementById("TencentCaptcha");
        document.getElementById("tcaptcha_ticket").value = res.ticket;
        document.getElementById("tcaptcha_randstr").value = res.randstr;
        document.getElementById("tcaptcha_007").value = 1;
        but.style.cssText = "color:#fff;background:#4fb845;border-color:#4fb845;pointer-events:none";
        but.innerHTML = tg_data.local.v_success;
    } else if(res.ret === 2) {
        var but = document.getElementById("TencentCaptcha");
        but.innerHTML = tg_data.local.v_canceled;
    }
}; 
if( !tg_data.is_007 ) {
    //var canvas_code = {};
}
function currentType(data) {
    var t = $(data).data('type');
    $('input[name="sites_type"]').val(t);
    if(t=='wechat'){
        $('.tg-wechat-id').show();
        $('.tg-sites-url').hide();
    }else{
        $('.tg-wechat-id').hide();
        $('.tg-sites-url').show();
    }
};
(function($){ 
    $('#get_info').click(function() {
        var url = $('.sites-link').val();
        if( url != '' ){
            if(isURL(url)){
                getUrlData(url);
            }else{
                showAlert({"status":3,"msg":tg_data.local.url_error});
            }
        }else{
            showAlert({"status":3,"msg":tg_data.local.fill_url});
        }
    });
    $('.post-tg').submit(function() {
        var t = $(this);
        var myform = t[0];

        if(t.hasClass('is-post')) tinyMCE.triggerSave();

        var formData = new FormData(myform);
        if( tg_data.is_007 ) {
            if($('#tcaptcha_007').val()!='1'){
                showAlert({"status":3,"msg":tg_data.local.v_first});
                return false;
            }
        } else {
            if($('#input_veri').val().toLowerCase() != canvas_code['tougao_captcha'].toLowerCase()){
                showAlert({"status":3,"msg":tg_data.local.code_error});
                return false;
            } 
            for (var i in canvas_code) {
                formData.append('canvas_code['+i+']', canvas_code[i]);
            }
        }
        $.ajax({
            url:         theme.ajaxurl,
            type:        'POST',
            dataType:    'json',
            data:        formData,
            cache:       false,
            processData: false,
            contentType: false
        }).done(function (result) {
            if(result.status == 1){
                if( !tg_data.is_007 ) {
                    drawCode('tougao_captcha', canvas_code);
                    $('#input_veri').val('');
                }else{
                    var but = document.getElementById("TencentCaptcha");
                    but.style.cssText = "";
                    but.innerHTML = tg_data.local.v_text;
                    $('#tcaptcha_007').val('');
                }
                $('.form-control').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                //清理图标
                $(".show-sites").attr("src", theme.addico);
                $(".tougao-sites").val('');
                $(".remove-sites").data('id','').hide();
                $(".upload-sites").val("").parent().removeClass('disabled');

                if (result.url) {
                    window.location.href = result.url;
                    window.location.reload;
                }
            }
            if(result.reset == 1){
                var but = document.getElementById("TencentCaptcha");
                but.style.cssText = "";
                but.innerHTML = tg_data.local.v_text;
                $('#tcaptcha_007').val('');
            }
            showAlert(result);
        }).fail(function (result) {
            showAlert({"status":3,"msg":tg_data.local.timeout});
        });
        return false;
    }); 
    $('.remove-ico').click(function() {
        var doc_id = $(this).data('type');
        $("#show_"+doc_id).attr("src", theme.addico);
        $("#remove_"+doc_id).hide();
        $("#upload_"+doc_id).val("");
    });
})(jQuery);
function uploadImg(file) {
    var doc_id = file.getAttribute("data-type");
    if (file.files != null && file.files[0] != null) {
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.files[0].name)) {
            $("#show_"+doc_id).attr("src", theme.addico);    
            $("#upload_"+doc_id).val("");
            $("#remove_"+doc_id).hide();
            showAlert({"status":3,"msg":tg_data.local.only_jpg});   
            return false;    
        } 
        if(file.files[0].size > (tg_data.sites_img_max * 1024)){
            $("#show_"+doc_id).attr("src", theme.addico);
            $("#upload_"+doc_id).val("");
            $("#remove_"+doc_id).hide();
            showAlert({"status":3,"msg":tg_data.local.sites_img_max_msg});
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file.files[0]);
        reader.onload = function(arg) {
            var image = new Image();
            image.src = arg.target.result;
            image.onload = function() { 
                $("#show_"+doc_id).attr("src", image.src);
                $("#remove_"+doc_id).show();
            };
            image.onerror = function() { 
                $("#show_"+doc_id).attr("src", theme.addico);
                $("#upload_"+doc_id).val("");
                $("#remove_"+doc_id).hide();
                showAlert({"status":3,"msg":tg_data.local.only_img});
                return false;
            }
        }
    }else{
        $("#show_"+doc_id).attr("src", theme.addico);
        $("#upload_"+doc_id).val("");
        $("#remove_"+doc_id).hide();
        showAlert({"status":2,"msg":tg_data.local.select_file});
        return false;
    }
};

function getUrlData(_url){
        $.post("//apiv2.iotheme.cn/webinfo/get.php", { url: _url, key:tg_data.theme_key },function(data,status){ 
            if(data.code==0){ 
                showAlert({"status":3,"msg":tg_data.local.get_failed});
            }
            else{ 
                dataInput(data);
                showAlert({"status":1,"msg":tg_data.local.get_success});
            } 
        }).fail(function () {
            showAlert({"status":3,"msg":tg_data.local.timeout2});
        });
} 
function dataInput(data) {
    var des = $('.sites-des');
    $('.sites-title').val(data.site_title); 
    des.val(data.site_description.slice(0,des.attr('maxlength'))); 
    change_input(des);
    $('.sites-keywords').val(data.site_keywords);
}