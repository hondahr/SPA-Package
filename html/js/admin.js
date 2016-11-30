(function(){
  var loc = location.pathname;
  var uri = loc.split('/');
  var href = uri[1];
  var $data = href;
  var item = 0,i=0;
  var onoff='';
  var custid = 0;
  var page = loc.substring(1,250);//only works on page reload or initial load
  var adminPage = '<div id="admin-add-edit-page" class="container admin">'+
        '<div class="col-md-12"><input type="file" id="inv-upload" name="inv-upload" data-url="/ajax/upload"><br/><span id="img-holder"></span>'+
        '<div class="col-md-4">'+
          '<br />Page Link: <input id="add-pages-name" class="admin add-pages" placeholder="name of page (link)" title="name of page (link)">'+
          '<br />'+
          'Page Name: <input id="add-pages-heading" class="admin add-pages" placeholder="Page Heading H1 tag" title="Page Heading H1 tag">'+
        '</div>'+
        '<div class="col-md-4">'+
          'Meta Title <br /><textarea id="add-pages-meta-title" class="admin add-pages" placeholder="Meta Title" title="Meta Title"></textarea>'+
          '<br />'+
          'Meta Description<br /><textarea id="add-pages-meta-description" class="admin add-pages" placeholder="Meta Description" title="Meta Description"></textarea>'+
        '</div>'+
        '<div class="col-md-12">Text to go on this page, if any: <textarea id="add-pages-body" name="add-pages-body" class="admin add-pages"></textarea>'+
        '<br />'+
        '<button id="add-edit-page">Finish and Add/Edit Page</button><button id="cancel-page">Cancel Page Add/Edit</button></div>'+
      '</div></div>';
  
  var bgImgs = '<div class="col-md-12"><input type="file" id="inv-upload" name="inv-upload" data-url="/ajax/uploadBG"><br/><span id="img-holder"></span>';

  var adminNav = '<a id="admin-dd" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span class="caret"></span></a>'+
                    '<ul class="dropdown-menu">'+
                      '<li>'+
                      '<a id="admin-topnav" class="admin-link">Admin Top Nav</a>'+
                      '<a id="admin-leftnav" class="admin-link">Admin Left Nav</a>'+
                      '<a id="admin-index" class="admin-link">Admin index.html</a>'+
                      '<a id="admin-stylesheet" class="admin-link">Admin Stylesheet</a>'+
                      '<a id="admin-vars" class="admin-link">Admin vars.js</a>'+
                      '<a id="admin-bg-images" class="admin-link">Admin Backgrounds</a>'+
                      '<a id="edit-page" class="admin-add-edit-page-link admin-link">Edit This Page</a>'+
                      '<a class="logout admin-link">Log Out</a></li>'+
                    '</ul>'+
                 '</li>';

  $('#admin-nav').html(adminNav);
  
  $('#admin-bg-images').on('click',function(){  
    //~ $('#content').html(bgImgs);
    
    $.ajax({
      url:'/ajax/getBackgrounds',
      type:'post',
      dataType:'json',
      data:{}
    }).success(function(bg){
      console.log(bg);
      var bgs = '';
      $.each(bg,function(i,item){
        bgs += '<img title="Click to delete this image" data-img="'+item+'" class="delete-bg-img" src="/backgrounds/'+item+'" width=100 height=60>';
      });
      $('#content').html(bgImgs+bgs);
      upload('backgrounds');
    });
  });
  deleteBgImgs();
  function deleteBgImgs(){
    $('#content').on('click','.delete-bg-img',function(){
      var img = $(this).data('img');
      if(confirm('Are you sure you want to delete '+img+'?')){
        $.ajax({
          url:'/ajax/deleteBackground',
          type:'post',
          data:{
            bg:img
          }
        }).complete(function(){
          $('#content').empty();
          $('#admin-bg-images').trigger('click');
        });
      }
    });
  }
  
  $('#admin-stylesheet').on('click',function(){
    $.ajax({
      url:'/ajax/getCSS',
      type:'post',
      data:{}
    }).success(function(response){
      //~ console.log(response);
      var css = '<h3>Editing custom.css</h3><span id="color-holder"><button id="edit-css">Save Changes</button><input id="color-picker" placeholder="Color Picker"><button id="copyColor">Copy Color</button></span><br/><textarea id="css" cols=60 rows=30>'+response+'</textarea>';
      $('#content').html(css).show();
      var editor = CodeMirror.fromTextArea(document.getElementById("css"), {
        lineNumbers: true,
        mode: "text/css",
        matchBrackets: true
      });
      var options = '';
      $('#color-picker').ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
          $(el).val(hex);
          $(el).ColorPickerHide();
          $("#copyColor").on("click", function() {
            copyToClipboardMsg(document.getElementById("color-picker"), "msg");
          });
        },
        onBeforeShow: function () {
          $(this).ColorPickerSetColor(this.value);
        }
      })
      .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
      });
      $('#edit-css').on('click',function(){
        var css = editor.getValue();
        $.ajax({
          url:'/ajax/saveCSS',
          type:'post',
          data:{
            css:css
          }
        }).success(function(response){
          //~ success(response);
          success('custom.css updated successfully');
          $('#admin-stylesheet').trigger('click');
        });
      });
    });
    
    $(window).scroll(function(e){ 
      var $el = $('#color-holder'); 
      var isPositionFixed = ($el.css('position') == 'fixed');
      if ($(this).scrollTop() > 200 && !isPositionFixed){ 
        $('#color-holder').css({'position': 'fixed', 'top': '0px'}); 
      }
      if ($(this).scrollTop() < 200 && isPositionFixed)
      {
        $('#color-holder').css({'position': 'static', 'top': '0px'}); 
      } 
    });
  });
  
  
  
  $('#admin-index').on('click',function(){
    $.ajax({
      url:'/ajax/getIndex',
      type:'post',
      data:{}
    }).success(function(response){
      console.log(response);
      var css = '<h3>Editing index.html</h3><button id="edit-index">Save Changes</button><br/><textarea id="index" cols=90 rows=30>'+response+'</textarea>';
      $('#content').html(css).show();
      var editor = CodeMirror.fromTextArea(document.getElementById("index"), {
        lineNumbers: true,
        mode: "text/html",
        matchBrackets: true
      });
      $('#edit-index').on('click',function(){
        var index = editor.getValue();
        $.ajax({
          url:'/ajax/saveIndex',
          type:'post',
          data:{
            index:index
          }
        }).success(function(response){
          //~ alert(response);
          success('index.html updated successfully');
          $('#admin-index').trigger('click');
        });
      });
    });
  });
  
  $('#admin-vars').on('click',function(){
    $.ajax({
      url:'/ajax/getVars',
      type:'post',
      data:{}
    }).success(function(response){
      console.log(response);
      var css = '<h3>Editing vars.js</h3><button id="edit-vars">Save Changes</button><br/><textarea id="vars" cols=90 rows=30>'+response+'</textarea>';
      $('#content').html(css).show();
      var editor = CodeMirror.fromTextArea(document.getElementById("vars"), {
        lineNumbers: true,
        mode: "text/javascript",
        matchBrackets: true
      });
      $('#edit-vars').on('click',function(){
        var vars = editor.getValue();
        $.ajax({
          url:'/ajax/saveVars',
          type:'post',
          data:{
            vars:vars
          }
        }).success(function(response){
          //~ alert(response);
          success('vars.js updated successfully');
          $('#admin-vars').trigger('click');
        });
      });
    });
  });
  
  $('#admin-topnav').on('click',function(){
    hide4Admin();
    $.ajax({
      url:'/ajax/adminTopNav',
      type:'post',
      data:{}
    }).success(function(response){
      $('#content').html(response).show();
      // this is all done in php
      $('.admin-parent').on('blur',function(){
        var id = $(this).prop('id');
        id = id.split('_');
        var field = id[0];
        var value = $(this).val();
        if(field === 'active'){
          //~ alert($(this).prop('checked'));
          if($(this).prop('checked') == true){
            value = 1;
          } else {
            value = 0;
          }
        }
        $.ajax({
          url:'/ajax/updateTopNav',
          type:'post',
          data:{
            id:id[1],
            field:field,
            value:value
          }
        });
      });
      $('.admin-child').on('blur',function(){
        var id = $(this).prop('id');
        id = id.split('_');
        var field = id[0];
        var value = $(this).val();
        if(field === 'active'){
          //~ alert($(this).prop('checked'));
          if($(this).prop('checked') == true){
            value = 1;
          } else {
            value = 0;
          }
        }
        $.ajax({
          url:'/ajax/updateTopNav',
          type:'post',
          data:{
            id:id[1],
            field:field,
            value:value
          }
        });
      });
      $('#new-parent').on('click',function(){
        alert('new-cat');
        $.ajax({
          url:'/ajax/newParent',
          type:'post',
          data:{
            name:$('#name-new-parent').val(),
            url:$('#url-new-parent').val(),
            disp:$('#displayorder-new-parent').val()
          }
        }).success(function(response){
          $('#admin-topnav').trigger('click');
        });
      });
      $('.new-child').on('click',function(){
        var id = $(this).attr('parent-id');
        alert(id);
        $.ajax({
          url:'/ajax/newChild',
          type:'post',
          data:{
            parent:id,
            name:$('#name-new-child-'+id).val(),
            url:$('#url-new-child-'+id).val(),
            disp:$('#displayorder-new-child-'+id).val()
          }
        }).success(function(response){
          $('#admin-topnav').trigger('click');
        });
      });
    });
  });
  
  
  $('#admin-leftnav').on('click',function(){
    hide4Admin();
    $.ajax({
      url:'/ajax/adminLeftNav',
      type:'post',
      data:{}
    }).success(function(response){
      $('#content').html(response).show();
      // this is all done in php
      $('.admin-cat').on('blur',function(){
        var id = $(this).prop('id');
        id = id.split('_');
        var field = id[0];
        var value = $(this).val();
        if(field === 'active' || field === 'show'){
          //~ alert($(this).prop('checked'));
          if($(this).prop('checked') == true){
            value = 1;
          } else {
            value = 0;
          }
        }
        $.ajax({
          url:'/ajax/updateCategory',
          type:'post',
          data:{
            id:id[1],
            field:field,
            value:value
          }
        });
      });
      $('.admin-sub').on('blur',function(){
        var id = $(this).prop('id');
        id = id.split('_');
        var field = id[0];
        var value = $(this).val();
        if(field === 'active' || field === 'show'){
          //~ alert($(this).prop('checked'));
          if($(this).prop('checked') == true){
            value = 1;
          } else {
            value = 0;
          }
        }
        $.ajax({
          url:'/ajax/updateSubCategory',
          type:'post',
          data:{
            id:id[1],
            field:field,
            value:value
          }
        });
      });
      $('#new-cat').on('click',function(){
        //~ alert('new-cat');
        $.ajax({
          url:'/ajax/newCategory',
          type:'post',
          data:{
            name:$('#name-new-cat').val(),
            url:$('#url-new-cat').val(),
            disp:$('#displayorder-new-cat').val()
          }
        }).success(function(response){
          $('#admin-leftnav').trigger('click');
        });
      });
      $('.new-sub').on('click',function(){
        var id = $(this).attr('cat-id');
        $.ajax({
          url:'/ajax/newSubCategory',
          type:'post',
          data:{
            cat:id,
            name:$('#name-new-sub-'+id).val(),
            url:$('#url-new-sub-'+id).val(),
            disp:$('#displayorder-new-sub-'+id).val()
          }
        }).success(function(response){
          $('#admin-leftnav').trigger('click');
        });
      });
    });
  });

  $('.admin-add-edit-page-link').on('click',function(){
    hide4Admin();
    $('.add-pages').show();

    $('#admin').html(adminPage).show();
    upload('images');
    $('#results').hide();
    $('#main').hide();
    //~ buttonReload();
    $('#'+$data).hide();// hide the actual page while editing

    $id = $(this).prop('id');
     //~ alert($id);
    $('#admin-add-edit-page').css({'margin-top':'100px'}).show();
    var body = '';
    if($id === 'edit-page'){
      $('#add-pages-name').val(page);
      var heading = $('.page-header > h1').text();
      $('#add-pages-heading').val(heading);
      tinymceinit();

      $.ajax({
        url:'/ajax/getPage',
        type:'post',
        dataType:'json',
        data:{
          page:page
        }
      }).success(function(response){
        body = response.body;
        console.log(body);

        $('iframe').contents().find('body').html(body);
        $('#add-pages-meta-title').val(response.title);
        $('#add-pages-meta-description').val(response.description);
      });
    }


    $('#add-edit-page').on('click',function(){//submit the new page
      hide4Admin();
      $.ajax({
        url:'/ajax/addPage',
        type:'post',
        data:{
          name:$('#add-pages-name').val(),
          heading:$('#add-pages-heading').val(),
          title:$('#add-pages-meta-title').val(),
          description:$('#add-pages-meta-description').val(),
          keywords:$('#add-pages-meta-keywords').val(),
          body:$('iframe').contents().find('body').html()
        }
      }).success(function(response){
        location.reload();
      });
    });


    $('#cancel-page').on('click',function(){
      location.reload();
    });
  });


  function updateSubCat(id){
    $('#edit-subcategory').on('change',function(){
      var subcat = $(this).val();
      //~ alert(id);
      $.ajax({
        url:'/ajax/updateSubCat',
        type:'post',
        data:{
          id:id,
          subcat:subcat
        }
      }).success(function(r){
        console.log(r);
      });
    });
  }


//    _   _                                _       _ _     __    ____
//   | | (_)                              (_)     (_) |   /_ |  / /\ \
//   | |_ _ _ __  _   _ _ __ ___   ___ ___ _ _ __  _| |_   | | | |  | |
//   | __| | '_ \| | | | '_ ` _ \ / __/ _ \ | '_ \| | __|  | | | |  | |
//   | |_| | | | | |_| | | | | | | (_|  __/ | | | | | |_   | | | |  | |
//    \__|_|_| |_|\__, |_| |_| |_|\___\___|_|_| |_|_|\__|  |_| | |  | |
//                 __/ |                                        \_\/_/
//                |___/

  function tinymceinit(){
    tinymce.init({
        selector:'textarea#add-pages-body',
        fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 16pt 26pt 36pt",
        toolbar: 'fontselect | fontsizeselect forecolor backcolor | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
        plugins: 'textcolor colorpicker advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code',
        image_advtab: true,
        width:'600px',
        height:'400px'
        //~ content_css : "/css/main.css",
    });
    var ed = tinymce.activeEditor;
    var ifr = tinymce.DOM.get(ed.id + '_ifr');
    ed.dom.setAttrib(ifr, 'title', '');// set the popup title to blank
  }
  
  function upload(folder){
    $('#inv-upload').on('click',function(){
      //~ alert('file');
      $('#inv-upload').fileupload({
        formData:{

                id:item,
                title:'title'

        },
        done: function (e, data) {
          $('#img-holder').html('<img src="/'+folder+'/'+data.result+'" width=100><br /><input id="copyTarget" value="/'+folder+'/'+data.result+'"> <button id="copyButton">Copy</button><span id="msg"></span><br>');
          if(folder === 'backgrounds'){
            $('#admin-bg-images').trigger('click');
          } else {
            $("#copyButton").on("click", function() {
              copyToClipboardMsg(document.getElementById("copyTarget"), "msg");
            });
          }
        }
      });
    });
  }
})();
