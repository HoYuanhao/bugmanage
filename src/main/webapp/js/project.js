 function check() {
            var key = event.keyCode;
            if (key == 13)
                search();       
            }
        
        function search(){
            var keyword=$("#seachtxt").val();
            if(keyword!='根据编号、标题、模块搜索'&&keyword!="q1"&&keyword!="")
            {
                keyword=keyword.trim().replace(" ","|nbsp;");
                window.location.href='/allbug_6f917cc1f60d4cad85909737e5644eb9/'+keyword+"/0/0";
            }
            else
                window.location.href='/allbug_6f917cc1f60d4cad85909737e5644eb9/ ';
        }
        

