function indexScripts() {
    this.items = [];    
    
    this.init = function(){
        const that=this;
        $.ajax({
          url: "http://localhost/services.php?action=list",
            dataType: "json"
        })
          .done(function( data ) {
            for (var a in data) {
                items.push({sorszam: data[a].ID, todoText: data[a].text});
            }
            that.render();
          });
        /*items.push({sorszam:0, todoText:"Hello"});
        items.push({sorszam:1, todoText:"Hello1"});
        items.push({sorszam:2, todoText:"Hell2"});*/
        
        $('#addButton').on("click", this, addToDo);
    };
    
    this.render= function() {
        $("#container").empty();
        for (var i=0; i<this.items.length; i++){
            if (this.items[i] !== null) {
                 var text = '<div class="todo-item">'
                    +'<div class="sorszam"><span>'+items[i].sorszam+'</span></div>'
                    +'<div class="todo-text"><span>'+items[i].todoText+'</span></div>'
                    +'<button class="action" id="delete'+i+'" data-index="'+i+'">X</button>'
                    +'</div>'  
                  $("#container").append(text); 
                $('#delete'+i).on("click", this, deleteToDo)
                };
            };
        };
    
    this.deleteToDo= function(ev){
        var actual = $(this).data("index");
        ev.data.items[actual] = null;
        ev.data.render();
    };
    
    this.addToDo = function(ev){
        var extra = $("#txtToDo").val();
        ev.data.items.push({sorszam:items.length, todoText:extra});
        ev.data.render();
        
        const that=this;
        $.ajax({
          url: "http://localhost/services.php?action=add",
            /*contentType: "application/json",*/
            dataType:"json",
            data: {params: ev.data.items},
            method: "POST"
        })
          .done(function( data ) {
            console.log("OK");
          });
    }
    
    init();
};

indexScripts();