﻿/// <reference path="../../Res/toolkit.js" />



var SimpleTable13=new Object();

var currentButton;
SimpleTable13.sendFiles=  function()
{
    var data = new FormData();
 
        $('#loadingBar').show();
    $('#fileStatus').show();
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var progress = Math.round(evt.loaded * 100 / evt.total);
            $('#progessStatus').css('width'  , progress + '%');
            $('#progessStatus').attr('aria-valuenow'  , progress *2);
        }
    }, false);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
            window.fileUploaded=true;
            $('#loadingBar').hide();
            $('#fileStatus').hide();
            SimpleTable13.Submit(currentButton);
        } else {
            if((xhr.status==500) && (xhr.readyState == 4))
            {
                $('#fileStatus').hide();
                $('#loadingBar').hide();
                var dos=document.createElement("s");
                dos.innerHTML=xhr.responseText;
                 
                alert("خطا در ارسال فایل ها" +  dos.getElementsByTagName("title")[0].innerHTML );
                    
            }
         
        }
    };
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable13");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SimpleTable13.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SimpleTable13.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SimpleTable13';
    Entity.Parameters=new Array();
    ScallerAjax('ScallerSubmit',Entity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message  );
        
  
 

  
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
 
                    BackPage();
         
     
     
  


    $(obj).attr('disabled',false);
    return;
       
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});
};
SimpleTable13.Validate= function()
{
    Validator.ClearErrors();
    
    if(Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false ;
    }
    
    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}


SimpleTable13.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(SimpleTable13.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=SimpleTable13.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='SimpleTable13';
    Entity.Parameters=new Array();
    }
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.SimpleTable13records= data.records;
        totalRecords= data.RecordTotal;
    GenPagingLinks();
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.SimpleTable13records= data.records;
                  
        dlgScope.$apply(function(){});

    }
        $('[type="Select2Ajax"]').each(function(){
    $(this).val($(this).attr('valc'));

});
NormalResult();
        
$(obj).attr('disabled',false);
return;
          
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});


}




window.targetElement=null;




