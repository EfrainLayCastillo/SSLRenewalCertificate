$(document).ready(function(){
    $('form').submit(function(e) {
        e.preventDefault();
        // get all the inputs into an array.
        const values = {};

        $.each($(this).serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        console.log(values);

        $.ajax({
            type: 'POST',
            url: '/',
            data: values
        }).done((result)=>{
            window.location.href = "/";
        }).error((err)=> err)
    
    });
});
