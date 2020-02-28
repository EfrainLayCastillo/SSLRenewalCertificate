$(document).ready(function(){
    var source = $("#search-results").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#render-listing')

    $("#listing").click((e)=>{
        e.preventDefault()
        $.ajax({
            method: "POST",
            url:"/"
        }).done((data)=>{
            console.log(data);
            $results.html( dataTemplate(data) );
        })
    });




    $(".renewalActive").click((e)=>{
        e.preventDefault();
        alert("nani");

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
