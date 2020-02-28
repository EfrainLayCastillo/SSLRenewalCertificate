$(".renewalActive").map((index, value)=>{
    
    $.ajax({
        method: "POST",
        url: "/renewal",
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