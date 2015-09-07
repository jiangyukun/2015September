/**
 * Created by DT27 on 15/6/6.
 */

$(function(){
    if(window.location.href.indexOf('?')<0){
        $('#link-login').attr('href', $('#link-login').attr('href')+"?refe="+window.location.href);
    }
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    $('#expire_time').datepicker({
        format: 'yyyy-mm-dd 23:59:59',
        startDate: "+0d",
        endDate: "+7d",
        todayHighlight: true,
        autoclose: true,
        forceParse: true,
        language: 'zh-CN'
    });
    $('#expire_time').datepicker('setDate',Date());
    $('#back-to-top').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop : 0},1000);
        return false;
    });
    $('#getInfo').on('click', function () {
        var validator = $( "#demand-post-form" ).validate();
        if(!validator.element( "#url" )) return;
        var $btn = $(this).button('loading');
        $.post(
            '/demand/getInfo',
            {
                "_token" : $(document).find( 'input[name=_token]' ).val(),
                "url" : $('#url').val()
            },
            function(result){
                if(result[0]['code']==0){
                    $('#title').val(result[1]['name']);
                    $('#price').val(result[1]['price']);
                    $('#goods-pic').attr('src', result[1]['img']);
                    $('#thumb').val(result[1]['img']);
                    $('#info-box').show();
                    $btn.button('reset');
                    $('#isInfo').val(1);
                }else{
                    alert(result[0]['msg']);
                    $btn.button('reset');
                    $('#isInfo').val(0);
                }
            }
        );
    })


    $('#getInfo_mb').on('click', function () {
        var validator = $( "#demand-post-form" ).validate();
        if(!validator.element( "#url" )) return;
        var $btn = $(this).button('loading');
        $.get(
            '/demand/getInfo',
            {
                "url" : $('#url').val()
            },
            function(result){
                if(result[0]['code']==0){
                    $('#title').val(result[1]['name']);
                    $('#price').val(result[1]['price']);
                    $('#goods-pic').attr('src', result[1]['img']);
                    $('#thumb').val(result[1]['img']);
                    $('#info-box').show();
                    $btn.button('reset');
                    $('#isInfo').val(1);
                }else{
                    alert(result[0]['msg']);
                    $btn.button('reset');
                    $('#isInfo').val(0);
                }
            }
        );
    })





    $('#getCode').removeAttr('disabled');
    $('#getCode').click(function () {
        var validator = $( "#reg-form" ).validate();
        if(validator.element( "#mobile" )) {
            SendCode();
        }
    });
    //$('.reg-form :text,:password').on('blur', function () {
    //    Validator($(this));
    //});

    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");
    // 验证码有效性验证
    jQuery.validator.addMethod("mobile_code", function(value, element) {
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "验证码为6位数字");

    $('#demand-post-form').validate({
        rules: {
            fCate: {
                required: true,
                min: 1
            },
            url: {
                required: true,
                url: true
            },
            isInfo: {
                required: true,
                min: 1
            },
            title: {
                required: true,
                minlength: 3
            },
            price: {
                required: true,
                number: true
            }
        },
        messages : {
            fCate : {
                min : "请选择分类"
            },
            isInfo : {
                min : "请先获取信息"
            }
        }
    })
    $('#login-form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            password:{
                required: true,
                minlength: 5
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });
    $('#reg-form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                remote: {
                    url:"/auth/is_username_exist",
                    type:"post",
                    dataType: "json",
                    data: {
                        "_token" : $(document).find( 'input[name=_token]' ).val(),
                        "username" : function(){
                            return $("#username").val();     //这个是取要验证的密码
                        }
                    },
                    dataFilter: function (data) {       //判断控制器返回的内容
                        return data == 0;
                    }
                }
            },
            password:{
                required: true,
                rangelength: [6, 18]
            },
            password_confirmation:{
                required: true,
                rangelength: [6, 18],
                equalTo: "#password"
            },
            mobile:{
                required: true,
                isMobile: true,
                remote: {
                    url:"/auth/is_mobile_exist",
                    type:"post",
                    dataType: "json",
                    data: {
                        "_token" : $(document).find( 'input[name=_token]' ).val(),
                        "mobile" : function(){
                            return $("#mobile").val();
                        }
                    },
                    dataFilter: function (data) {
                        return data == 0;
                    }
                }
            },
            mobile_code:{
                required: true,
                mobile_code: true,
                remote: {
                    url:"/auth/checkMobileCode",
                    type:"post",
                    dataType: "json",
                    data: {
                        "_token" : $(document).find( 'input[name=_token]' ).val(),
                        "mobile_code" : function(){
                            return $("#mobile_code").val();
                        },
                        "mobile" : function(){
                            return $("#mobile").val();
                        }
                    },
                    dataFilter: function (data) {
                        return data == 1;
                    }
                }
            }
        },
        messages : {
            mobile : {
                remote : "该手机号码已注册"
            },
            username : {
                remote : "该用户名已被使用"
            },
            mobile_code : {
                remote : "验证码错误"
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });

    $('#bid-post-form').validate({
        rules: {
            url: {
                required: true,
                url: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });

    var cates;
    $.get('/demand/cate', function(result){
        cates = result;
        //$('#goods-cates-f').
        for(var i=0;i<result.length;i++){
            $('#goods-cates-f').html($('#goods-cates-f').html()+'<option value="'+result[i]['id']+'">'+result[i]['slug']+'</option>');
        }
    });


    $('#goods-cates-f').change(function(){
        var fCateId = $(this).val();
        if(fCateId==0) return;
        var sCateHtml;
        for(var i=0;i<cates.length;i++){
            if(cates[i]['id']==fCateId){
                for(var y=0;y<cates[i]['children'].length;y++){
                    sCateHtml += '<option value="'+cates[i]['children'][y]['id']+'">'+cates[i]['children'][y]['slug']+'</option>';
                }
            }
        }
        $('#goods-cates-s').html('<option value="0">请选择</option>'+sCateHtml);
    });

    $('#goods-cates-s').change(function(){
        var fCateId = $(this).val();
        if(fCateId==0) return;
        var sCateHtml;
      var  ajaxurl="/ajax/category/?cateid="+fCateId+"&rnd="+new Date().getTime();
        $.get(ajaxurl, function (data) {
            var obj = eval(data);
            $(obj).each(function(index) {
                var val = obj[index];
                opt = $("<option/>").text(val.slug ).attr("value", val.id);
                $('#goods-cates-es' ).append(opt);
            });

        });
    });

    $('#bid-form').validate({
        rules: {
            price: {
                required: true,
                number: true
            },
            url: {
                url: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });
});
function SendCode() {

    $('#mobile_code').removeAttr('disabled').focus();
    var i = 5;
    var interval=window.setInterval(
        function() {
            if(i == 0) {
                $('#getCode').val('重新获取');
                $('#getCode').removeAttr('disabled').addClass('btn-default');
                clearInterval(interval);
            } else {
                $('#getCode').val('重新获取('+i+')');
                $('#getCode').attr('disabled','disabled').removeClass('btn-default');
                i--;
            }
        },
        1000
    );
   // return;
    $('#getCode').attr('disabled','disabled').removeClass('btn-default');
    $('#getCode').val('正在发送');
    $.post(
        '/auth/getRegCode',
        {
            "_token" : $(document).find( 'input[name=_token]' ).val(),
            "mobile" : $('#mobile').val()
        },
        function(result){
            if(result==0){
                $('#mobile_code').removeAttr('disabled').focus();

                var i = 5;
                var interval=window.setInterval(
                    function() {
                        if(i == 0) {
                            $('#getCode').val('重新获取');
                            $('#getCode').removeAttr('disabled').addClass('btn-default');
                            clearInterval(interval);
                        } else {
                            $('#getCode').val('重新获取('+i+')');
                            $('#getCode').attr('disabled','disabled').removeClass('btn-default');
                            i--;
                        }
                    },
                    1000
                );
            }else if(result==999){
                $('#getCode').val('频率过快');

                var i = 5;
                var interval=window.setInterval(
                    function() {
                        if(i == 0) {
                            $('#getCode').val('重新获取');
                            $('#getCode').removeAttr('disabled').addClass('btn-default');
                            clearInterval(interval);
                        } else {
                            $('#getCode').val('重新获取('+i+')');
                            $('#getCode').attr('disabled','disabled').removeClass('btn-default');
                            i--;
                        }
                    },
                    1000
                );
            }else{
                $('#getCode').val('('+result+')发送失败，请联系管理员');
            }
        }
    );
}
function Win(){
    $.post('/demand/win',{"_token" : $(document).find( 'input[name=_token]' ).val(),id:$('input:radio[name=chose-win]:checked').val()},
        function(data){
            location.reload();
        }
    );
}

function dropp(){
    $.post('/demand/win', {
            "_token": $(document).find('input[name=_token]').val(),
            "deid": $(document).find('input[name=demand_id]').val(),
            "action": "drop"
        },
        function (data) {
            location.reload();
        }
    );
}

function delayt(){
    $.post('/demand/win',{
            "_token" : $(document).find( 'input[name=_token]' ).val(),
            "deid": $('input:radio[name=chose-win]:checked').val(),
            "action": "delay"
        },
        function(data){
            location.reload();
        }
    );
}