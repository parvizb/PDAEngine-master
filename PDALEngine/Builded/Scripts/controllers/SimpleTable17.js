﻿/// <reference path="../../Res/toolkit.js" />



var SimpleTable17=new Object();

var currentButton;
SimpleTable17.sendFiles=  function()
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
            SimpleTable17.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable17");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SimpleTable17.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SimpleTable17.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SimpleTable17';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PerId',$('#txtSimpleTable17PerId').val()));
    
                    Entity.Parameters.push( toInput('DateSave',$('#txtSimpleTable17DateSave').val()));
    
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
SimpleTable17.Validate= function()
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


SimpleTable17.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(SimpleTable17.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=SimpleTable17.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='SimpleTable17';
    Entity.Parameters=new Array();
                    
        

                
        

}
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.SimpleTable17records= data.records;
        totalRecords= data.RecordTotal;
    GenPagingLinks();
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.SimpleTable17records= data.records;
                  
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


SimpleTable17.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.SimpleTable17records.push(temp);
    currentScope.$apply();
               
    $('#cityid_' +temp.rndId).each (function() {$(this).val($(this).attr('valc')) });
                    
}

SimpleTable17.Save_Validate=function()
{
    Validator.ClearErrors();
                   
                    Validator.CheckRegSelect2('txtSimpleTable17PerId','شخص');
                           
            Validator.CheckRegDate('txtSimpleTable17DateSave','تاریخ ثبت');
                                                                    if(typeof ( currentScope.SimpleTable17records)!="undefined") {
    for (var l=0;l<currentScope.SimpleTable17records.length;l++)
{
    var r=currentScope.SimpleTable17records[l];

        if(r.selected == true){
      continue;
}
}
}
    if(typeof ( currentScope.SimpleTable17records)!="undefined") {
    for (var l=0;l<currentScope.SimpleTable17records.length;l++)
{
    var r=currentScope.SimpleTable17records[l];

    if(r.RowState !='Added'){
    continue;
}
Validator.CheckRegSelect2('cityid_' + r.rndId,'کد شهر',r.viewIndex+1);
}
}
if(typeof ( currentScope.SimpleTable17records)!="undefined") {
for(var l=0;l<currentScope.SimpleTable17records.length;l++)
{ 
    var record=currentScope.SimpleTable17records[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
SimpleTable17.Save=function()
{ 
    if(  SimpleTable17.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
        var rec=new Array();//hi
        //YOU ARE ASL
        rec.push(toInput('PerId',Para('PerId')));
            //YOU ARE ASL
        rec.push(toInput('DateSave',Para('DateSave')));
        informationRecords.push(rec);
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.SimpleTable17records.length;l++)
{
    var r=currentScope.SimpleTable17records[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi



rec.push(toInput('cityid', ( r['cityid']===undefined ? "": r['cityid'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Added'){
            continue;
        }
                var rec=new Array();//hi
                                                        rec.push(toInput('cityid', ( r['cityid']===undefined ? "": r['cityid'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='SimpleTable17';
Enity.CommandName='Save';
Enity.records=DataPass;
ScallerAjax('BatchCommand',Enity,function(data){

    
    Messager.ShowMessage('اطلاعات', data.Message );
 
     
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
    ///you are asl
    if(data.code==0)
    {
        window.returnValue=data.retrunValue;




                      
         
         
     
                        BackPage();
                 
         
    }
    try
    {
        $(obj).attr('disabled',false);
    }
    catch
    {

    }
    return;
},function(data)
{
    try
    {
        $(obj).attr('disabled',false);
    }
    catch
    {

    }
    return;
});
console.log(JSON.stringify(Enity));
}

