$(function(){
    // function getTime() {
    //     var data = new Date()
    //     var year = data.getFullYear()
    //     var month = data.getMonth()
    //     var date = data.getDate()
    //     date = date<10?"0"+date:date
    //     var hour =data.getHours()
    //     hour = hour<10?"0"+hour:hour
    //     var minutes = data.getMinutes()
    //     minutes = minutes<10?"0"+minutes:minutes
    //     var second = data.getSeconds()
    //     second = second<10?"0"+second:second
    //     return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second
    // }
    // var time = getTime()
    function getData() {
        $.ajax({
            method:"get",
            url:'http://www.liulongbin.top:3006/api/cmtlist',
            success:function(res){
                if(res.status !== 200) return alert("获取失败")
                var rows =[]
                $.each(res.data,function(i,item){
                    var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>'
                rows.push(str)
                })
                $('#cmt-list').empty().append(rows.join(''))
            }
        })
    }
    getData();
    /* $(".btn-primary").on("click",function(){
        var person = $("#person").val().trim()
        var content = $("#content").val().trim()
        if(person.length <= 0 || content.length<=0) {return alert("请输入完整内容")}
        $.ajax({
            method:"post",
            url:"http://www.liulongbin.top:3006/api/addcmt",
            data:{
                username:person,
                content:content,
            },
            success:function(res){
                if (res.status !== 201) {
                    return alert('发表评论失败！')
                }
                getData();
            }
            
        })
    }) */

    // 这里是对表单的form进行submit监听事件，而不是提交按钮
    $("#form1").submit(function(e){
        e.preventDefault()
        var data = $(this).serialize();
        $.ajax({
            method:"post",
            url:"http://www.liulongbin.top:3006/api/addcmt",
            data:data,
            success:function(res){
                if(res.status !== 201) return alert("评论发表失败")
                getData()
                // [0]把jq转成原生dom对象，用原生dom对象的reset方法重置表单内容
                $(this)[0].reset()
            }.bind(this)
        })
    })
})