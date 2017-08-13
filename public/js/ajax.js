$(document).ready(() => {
  $('#ejsbutton').click(() => {
    var ajaxdata = $('#ajaxdata').val();
    if(!ajaxdata) return false; // 修复空白留言问题
    $('#ajaxdata').val(''); //修复"留言"以后，留言的内容仍然显示在留言输入框中
    console.log( $('#ajaxdata').val());
    $.ajax({
      type: 'post',
      url: '/message',
      data: 'mescontent=' +encodeURI(ajaxdata,"UTF-8")+ '&articleid=' + window.location.pathname ,
      //  encodeURI(需要编码内容,"UTF-8") 中文乱码解决
      dataType: 'json',
      contentType:"application/x-www-form-urlencoded; charset=utf-8",
      error: (error) => {
        console.log('error');
      },
      success: (data) => { // result 改成res之后删除下一句为什么不可以
        res = data;
        const html = new EJS({ url: '/ejs/testmessage.ejs' }).render(res); // 此处代码 我不知道为什么会这样
        console.log(html);
        $(html).insertAfter('#ejsmessage');
      },
    });
  });
});
