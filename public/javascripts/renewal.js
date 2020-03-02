$(document).ready(function(){
    $(".renewalActive").click((e)=>{
        e.preventDefault();
        console.log("EXECUTE")
        $.ajax({
            method: "POST",
            url: "/",
            data: {
                id: 66666
            },
            dataType: "json"
            
        }).done( (data)=>{
            alert("DONE!");
        }).fail((error)=>{
            alert(error);
        });
    });
});
