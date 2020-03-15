(function($) {
  $.alerts = {
    alert: function(title, message, callback) {
      if( title == null ) title = 'Alert';
      $.alerts._show(title, message, null, 'alert', function(result) {
        if( callback ) callback(result);
      });
    },

    confirm: function(title, message, callback) {
      if( title == null ) title = 'Confirm';
      $.alerts._show(title, message, null, 'confirm', function(result) {
        if( callback ) callback(result);
      });
    },

    _show: function(title, msg, value, type, callback) {
      var _html = "";
      _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
      _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
      if (type == "alert") {
        _html += '<input id="mb_btn_ok" type="button" value="确定" />';
      }
      if (type == "confirm") {
        _html += '<btton id="mb_btn_no" type="button">取 消</btton>';
        _html += '<btton id="mb_btn_ok" type="button">确 定</btton>';
      }
      _html += '</div></div>';
                    //必须先将_html添加到body，再设置Css样式
                    $("body").append(_html); GenerateCss();

                    switch( type ) {
                      case 'alert':

                      $("#mb_btn_ok").click( function() {
                        $.alerts._hide();
                        callback(true);
                      });
                      $("#mb_btn_ok").focus().keypress( function(e) {
                        if( e.keyCode == 13 || e.keyCode == 27 ) $("#mb_btn_ok").trigger('click');
                      });
                      break;
                      case 'confirm':

                      $("#mb_btn_ok").click( function() {
                        $.alerts._hide();
                        if( callback ) callback(true);
                      });
                      $("#mb_btn_no").click( function() {
                        $.alerts._hide();
                        // if( callback ) callback(false);
                      });
                      $("#mb_btn_no").focus();
                      $("#mb_btn_ok, #mb_btn_no").keypress( function(e) {
                        if( e.keyCode == 13 ) $("#mb_btn_ok").trigger('click');
                        if( e.keyCode == 27 ) $("#mb_btn_no").trigger('click');
                      });
                      break;
                    }
                  },
                  _hide: function() {
                   $("#mb_box,#mb_con").remove();
                 }
               }
    // Shortuct functions
    fz_alert = function(title, message, callback) {
      $.alerts.alert(title, message, callback);
    }

    fz_confirm = function(title, message, callback) {
      $.alerts.confirm(title, message, callback);
    };

      //生成Css
      var GenerateCss = function () {

        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
          filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        if(msite){
          $("#mb_con").css({ zIndex: '999999', width: '320px', position: 'fixed',
            backgroundColor: 'White', borderRadius:'3px', opacity: 1
          });
        }
        else{
          $("#mb_con").css({ zIndex: '999999', width: '450px', padding: '10px', position: 'fixed',
            backgroundColor: 'White', borderRadius:'3px', opacity: 1
          });
        }

        $("#mb_tit").css({ display: 'block', fontSize: '16px', color: '#444', padding: '10px 15px',
          backgroundColor: '#fff', borderRadius: '15px 15px 0 0',
          fontWeight: 'bold'
        });

        $("#mb_msg").css({ padding: '20px', lineHeight: '40px', textAlign:'center',
          fontSize: '18px' ,color:'#4c4c4c'
        });

        $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',
          border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
          lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'
        });

        $("#mb_btnbox").css({ margin: '15px 0px 10px 0', textAlign: 'center' });
        $("#mb_btn_ok,#mb_btn_no").css({ width: '80px', height: '30px', padding: '5px 15px', color: 'white', border: 'none', borderRadius:'3px', 'font-size': '16px'});
        $("#mb_btn_ok").css({ backgroundColor: '#3DB4F1' });
        $("#mb_btn_no").css({ backgroundColor: 'gray', marginRight: '40px' });


    //右上角关闭按钮hover样式
    $("#mb_ico").hover(function () {
      $(this).css({ backgroundColor: 'Red', color: 'White' });
    }, function () {
      $(this).css({ backgroundColor: '#DDD', color: 'black' });
    });

    _widht = document.documentElement.clientWidth;

    var boxWidth = $("#mb_con").width();

    //让提示框居中
    $("#mb_con").css({ top: '35%', left: (_widht - boxWidth) / 2 + "px" });
  }
})(jQuery);

(function($) {
  fz_transit = function(type, msg, interval) {
        // 不要重复创建
        if($("#fz_transitor").length > 0){
          return false;
        }
        var _html = "";
        _html += '<div id="fz_transitor">' + msg + '</div>';
        $("body").append(_html);
        bindCSS(type);
        window.setTimeout(function() {
          if(type == 0){
            $("#fz_transitor").fadeTo(interval, 500).slideUp(500, function(){
              $(this).remove();
            });
          }
          else{
            $("#fz_transitor").slideUp(500, function(){
              $(this).remove();
            });
          }
        }, 500);
      };

      var bindCSS = function (type) {
        $("#fz_transitor").css({
          position: 'fixed',
          top: '70px',
          'z-index': '83480',
          border: '0',
          padding: '10px',
          margin: 'auto',
          'border-radius': '15px',
          'text-align': 'center',
          'font-size': '16px',
          color:'#fff'
        });

        if(type == 0){
          $("#fz_transitor").css({
            width: '150px',
            background:'rgba(116,197,68, 1)'
          });
        }
        else{
          $("#fz_transitor").css({
            width: '250px',
            background: '#000',
            opacity: 0.72
          });
        }

        var boxWidth = $("#fz_transitor").width()
        _widht = document.documentElement.clientWidth;
        $("#fz_transitor").css({ left: (_widht - boxWidth) / 2 + "px" });
      }

    })(jQuery);

    $(document).ready(function(){

      $("#save_file").click(function(){
        upload();
      });

      $("#pseudo_input").click(function () {
        $("#fileInput").click();
      });

      $("#save_text").click(function () {
        var content = document.getElementsByClassName("ql-editor")[0].innerHTML;
        var scontent = strip(content).replace(/[\r\n]/g,"");
        if( scontent.length == 0 ){
          fz_transit(1, "好像还没什么内容", 2000);
          return false;
        }
        get_tag('text', {content: content});
      });

      $("#user_share").click(function () {
        $.get('/utags', function (r) {
          if (r.status == 0) {
            $("#user_share_div").html(r.data.html);
          }
          else {
            fz_transit(1, r.msg, 2000);
            return
          }
        })
      });

      $("#show_share_file").click(function () {
        $(this).addClass('active');
        $("#show_share_text").removeClass('active');
        $("#share_file").show();
        $("#share_text").hide();
        $("#show_tag").hide()
      });

      $("#show_share_text").click(function () {
        $("#show_share_text").addClass('active');
        $("#show_share_file").removeClass('active');
        $("#share_file").hide();
        $("#share_text").show();
        $("#show_tag").hide()
      });

      $("#show_share").click(function () {
        $(this).addClass('active');
        $("#show_retrieve").removeClass('active');
        $("#show_qr").removeClass('active');
        $("#share_ops").show();
        $("#retrieve_ops").hide();
        $("#qr_ops").hide();
      });

      $("#show_retrieve").click(function () {
        $(this).addClass('active');
        $("#show_share").removeClass('active');
        $("#show_qr").removeClass('active');
        $("#share_ops").hide();
        $("#retrieve_ops").show();
        $("#qr_ops").hide();
      });

      $("#show_qr").click(function () {
        $(this).addClass('active');
        $("#show_share").removeClass('active');
        $("#show_retrieve").removeClass('active');
        $("#share_ops").hide();
        $("#retrieve_ops").hide();
        $("#qr_ops").show();
      });

      $("#share_nav_share").click(function () {
        $(this).addClass('active');
        $("#share_nav_retrieve").removeClass('active');
        $("#share_ops").show();
        $("#retrieve_ops").hide();
        $("#qr_ops").hide();
      });

      $("#share_nav_retrieve").click(function () {
        $(this).addClass('active');
        $("#share_nav_share").removeClass('active');
        $("#share_ops").hide();
        $("#retrieve_ops").show();
        $("#qr_ops").hide();
      });

      $("#re_share").click(function () {
        window.location.href = '/';
        $("#show_share_file").addClass('active');
        $("#show_share_text").removeClass('active');
        $("#share_file").show();
        $("#share_text").hide();
        $("#show_tag").hide();
        $("#uploadfile").html("");
        $("#select_file").show();
        file = "";
        document.getElementsByClassName("ql-editor")[0].innerHTML = ""
      });


      $("#rbtn").click(function () {
        var tag = $("#rtag").val();
        if(tag.length != 4){
          fz_transit(1, "提取码输入有误", 2000);
          return false;
        }
        window.location.href = '/s/'+tag;
      });

      $("#do_dl").click(function(){
        tag = $(this).attr("data-tag");
        godl(tag);
      });
    });
    function strip(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }

    function drag(event){
      dom = event.currentTarget
    }

    function drop(event){
      event.preventDefault();
      var files = event.target.files || event.dataTransfer.files;
  this.analysisList(files);		//解析列表函数
  return false;
}

function allowDrop(event){
  event.preventDefault();
}

function upload_with_input(event){
  var files = event.target.files || event.dataTransfer.files;
  this.analysisList(files);		//解析列表函数
  return false;
}

function analysisList(obj){
  var that = this;
  //解析列表函数
  if( obj.length != 1 ){
    fz_transit(1, "多个文件请打包后上传", 2000);
    return false;
  }

  for( var i=0;i<obj.length;i++ ){
    var fileObj = obj[i];		//单个文件
    var name = fileObj.name;	//文件名
    var size = Math.round(fileObj.size/1024*100)/100;	//文件大小
    var ext = fileType(name);	//文件类型，获取的是文件的后缀
    var oss = random_str(8) + '.' + ext;
    if(name.length > 100){
      fz_transit(1, "文件名请不要超过100个字", 2000);
      return;
    }
    fname = name;
    if(size > 1024){
      fsize = Math.round(size/1024*100)/100 + 'MB'
    }
    else{
      fsize = size + 'KB'
    }
    $("#uploadfile").html(fname);
    file = obj[i];
    fobj = {
      orig: name,
      size: size,
      type: ext,
      oss: oss
    };
  }
}

function random_str(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var rstr = '';
  for (var i = 0; i < len; i++) {
    rstr += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return rstr;
}

function fileType(name){
  var nameArr = name.split(".");
  return nameArr[nameArr.length-1].toLowerCase();
}

function upload() {
  if (file == '') {
    fz_transit(1, "请选择文件", 2000);
    return
  }
  if (size_limit < fobj.size) {
        // TODO improve
        fz_transit(1, "文件超过" + (size_limit / 1024) + "MB", 2000);
        return
      }
      $.get('/updl/utok', function (r) {
        if (r.status == 0) {
          $("#fz_loading_hint").html("上传中，请稍后")
          $("#fz_loading_mask").show();
          burn = $("input[id='cp_check']").prop('checked');
          multipartUploadWithSts(file,burn)
        }
        else {
          fz_transit(1, r.msg, 2000);
          return
        }
      })
    }


    function multipartUploadWithSts(file,burn) {
      $("#select_file").hide();
      $("#uploading").show();
      var formData = new FormData();
      formData.append("file",file);
      formData.append("stype",'file');
      formData.append("burn",burn);
      $.ajax({
        url:'/stag.html', /*接口域名地址*/
        type:'post',
        data: formData,
        xhr:function(){                        
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
             myXhr.upload.addEventListener('progress',function(e){                            
               var loaded = e.loaded;                  //已经上传大小情况 
                var total = e.total;                      //附件总大小 
                var percent = Math.floor(100*loaded/total);     //已经上传的百分比  
                console.log("已经上传了："+percent);                 
                $("#progress_bar").css({width: percent+'%'});  
                $("#progress_hint").html(percent + '%');                                                          
                }, false); // for handling the progress of the upload
             }
                        return myXhr;
        }, 
        contentType: false,
        processData: false,
        success:function(res){
          $("#uploading").hide();
          $("#share_text").hide();
          $("#show_tag").show();
          if(res.status==0){
            $("#fz_loading_mask").hide();
            if(msite){
              _width = 200
            }
            else{
              _width = 200
            }
            QrCodeWithLogo.toCanvas({
              canvas: document.getElementById("scanvas"),
              content: res.data.url,
              width: _width,
            });
            $("#stag_hint").html(res.data.tag)
          }else if(res.status==1){
           $("#fz_loading_hint").html("上传中，请稍后")
          $("#fz_loading_mask").hide();
          $("#select_file").show();
            fz_transit(res.status, res.msg, 2000);
          }else{
            fz_transit(res.status, res.msg, 2000);
          }
        }
      })
    }

    function get_tag(stype, sobj){
      $("#uploading").hide();
      $("#share_text").hide();
      $("#show_tag").show();
      var postData = new Object()
      if(stype == 'file'){
        postData.stype = 'file';
        postData.oss = sobj.oss;
        postData.orig = sobj.orig;
        postData.fsize = parseInt(sobj.size);
        postData.burn = $("input[id='cp_check']").prop('checked')
      }
      else{
        postData.stype = 'text';
        postData.content = sobj.content;
        postData.burn = $("input[id='cp_text_check']").prop('checked')
      }
      $.post('/stag', postData, function(r){
        if(r.status==0){
          $("#fz_loading_mask").hide();
          if(msite){
            _width = 200
          }
          else{
            _width = 200
          }
          QrCodeWithLogo.toCanvas({
            canvas: document.getElementById("scanvas"),
            content: r.data.url,
            width: _width,
            // logo: {
            //   src: "https://f0cdn.anyknew.com/cptool/img/copytool.png",
            // }
          });
          $("#stag_hint").html(r.data.tag)
        }else{
          fz_transit(r.status, r.msg, 2000);
        }
      });
    }