$(document).ready(function(){
            console.log("Documento JQuery carregado!");


            $("input, textarea").on("focusin focusout", function(event){
                $(this).toggleClass("border-form");
                console.log(event);
                //$(this)refere-se ao elemento selecionado
                return 0;
            });

            $("#loader").fadeOut(1000);
            $("form").on("submit", function(event){
                console.log("Submeteu o formulário!");
                //prevenir a ação default = que a página seja recarregada
                event.preventDefault();
                $("#loader").fadeIn(1000, function(){
                    $(this).find("span").text("Carregado");  
                    $(this).find('.close').on("click", function(){
                        $("#loader").fadeOut(1000);
                    });
                });
    })
});