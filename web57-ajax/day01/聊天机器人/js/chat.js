$(function(){
    resetui()
    $("#btnSend").on("click",function(text){
        var text = $("#ipt").val()
        if(text.trim() === "") return $("#ipt").val('')
        $("#talk_list").append('<li class="right_word"><img src="img/person02.png" /><span>'+text+'</span></li>')
        $("#ipt").val('')
        resetui()
        getWord(text)
    })
    function getWord(text) {
        $.ajax({
            method:"get",
            url:"http://www.liulongbin.top:3006/api/robot",
            data:{
                spoken:text
            },
            success:function(res){
                if(res.message === "success") {
                    var msg = res.data.info.text
                    $("#talk_list").append('<li class="left_word"><img src="img/person01.png" /><span>'+msg+'</span></li>')
                }
                resetui()
                getVoice(msg)
            }
        })
    }
    function getVoice(text) {
        $.ajax({
            type:"get",
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                var voice = res.voiceUrl
                if(res.status === 200) {
                    $("#voice").attr("src",voice)
                }
            }
        })
    }
    $("#ipt").on("keyup",function(e){
        if(e.keyCode == 13) {
            $("#btnSend").click()
        }
    })
})