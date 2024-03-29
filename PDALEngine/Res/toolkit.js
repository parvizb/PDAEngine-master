﻿function Ajax(pageName, Mehtod, jData, fnOk, fnFail) {

    $('#loadingBar').show();
    $.ajax({
        type: "POST",
        url: pageName + "/" + Mehtod,
        data: jData, // the data in JSON format.  Note it is *not* a JSON object, is is a literal string in JSON format
        contentType: "application/json; charset=utf-8", // we are sending in JSON format so we need to specify this
        dataType: "json", // the data type we want back.  The data will come back in JSON format
        success: function (data) {
            $('#loadingBar').hide();

            fnOk(data);


            // it's a quirk, but the JSON data comes back in a property called "d"; {"d":"Hello Aidy F"}
        },
        error: function (xhr, status) {
            alert(xhr.response);
            $('#loadingBar').hide();
            fnFail(xhr);

            switch (status) {

            }
        }
    });


}
var pagingArray = new Array();

function GenPagingLinks() {
    pagingArray = new Array();
    var q = $('[rowcount]');
    if (q.length == 0) {
        return;
    }
    else {
        var counter = parseInt(q.val());
        var i = 1;
        var j = 1;
        while (i <= totalRecords) {
            pagingArray.push({ start: i, end: i + counter ,caption:j , isCurrent:  i==fromRecords  ,showit :  Math.abs (  i - (fromRecords)  ) <(10*counter)    });
            i += counter;
            j += 1;
        }

        if (toRecords > totalRecords) {
            toRecords = totalRecords;
        }
        if (pagingArray.length > 0) {
            pagingArray[0].showit = true;
            pagingArray[pagingArray.length - 1].showit = true;
        }
        currentScope.pagingArray = pagingArray;
        currentScope.PaginCounter = counter;
        PagingMover();
    }

}
function PagingMover() {

    currentScope.fromRecords = fromRecords;
    currentScope.toRecords = toRecords;
    currentScope.totalRecords = totalRecords;
 
    currentScope.$apply({});
}
function goPaging(start) {
    
    fromRecords =parseInt( start);
    var q = $('[rowcount]');
    if (q.length == 0) {
        toRecords = 9999999999999999;
    }
    else {
        toRecords =  fromRecords + parseInt(q.val()) - 1;

    }
 
    window.CurrentSerachMethod();
    PagingMover();
}



function resetPaging() {
    fromRecords = 1;
    pagingArray = new Array();
    currentScope.pagingArray = pagingArray;
    var q= $('[rowcount]');
    if(q.length==0)
    {
        toRecords=9999999999999999;
    }
    else
    {
        toRecords =fromRecords + parseInt( q.val()  )-1;
    }
    totalRecords = 0;
}
var fromRecords = 1;
var toRecords = 999999999999;
var totalRecords = 0;

var Validator = new Object();
var Messager = new Object();
Messager.errors = new Array();
Messager.info = new Array();
Validator.ClearErrors = function () {
    Messager.errors = new Array();

}
Messager.ClearInfos = function () {
    Messager.info = new Array();



}
mergeArray = function (a1, b1) {
    console.log(a1);
    console.log(b1);
    var keys = Object.keys(b1);
    for (var i = 0; i < keys.length; i++) {
        a1[keys[i]] = b1[keys[i]];

    }
   
}


Validator.CheckEmpty = function (id, caption, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', '');
    }
}


Validator.CheckStringLength = function (id, caption, len, row) {
    var val = $("#" + id).val();
    if (val.length != len) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + ' طول عبارت  ' + caption + ' بایستی ' + len + ' حرف یا رقم باَشد');
    }
    else {
        $('#' + id).css('background', '');
    }
}
Validator.CheckRegDate = function (id, caption, len, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');
        var parts = val.split('/');
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]);
        var day = parseInt(parts[2]);
        if ((year < 1300) || (year > 9999) || (month < 1) || (month > 12) || (day < 1) || (day > (month < 7 ? 31 : 30))) {
            Messager.errors.push('تاریخ وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegInteger = function (id, caption, len, row) {
    var val = $("#" + id).val().replace(/,/g,'');
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');

        if ((val == "") || (isNaN(val))) {
            Messager.errors.push('عدد وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegFloat = function (id, caption, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');

        if ((val == "") || (isNaN(parseFloat(val)))) {
            Messager.errors.push('عدد وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegSelect2 = function (id, caption,row) {
    var val = $("#" + id).val();
    if (val == null) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', '');
    }


}
function BackPage() {
    if (getDailOpen() == "") {


        window.history.back(0);
        setTimeout(LoadCache, 1000);
    }
    else {
        return $("#mdl" + getDailOpen()).modal('hide');

    }
}

Validator.ShowErrors = function () {
    $('#myModalLabel').html('خطا');
    var str = '';
    for (var l = 0; l < Messager.errors.length; l++) {
        str += Messager.errors[l] + "</br>";

    }
    $('.modal-body[n]').html(str);
    $('#myModal').modal()
}
Validator.RegEmail = function (id, caption) {


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var r = re.test($('#' + id).val());
    if (r == false) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push(' پست الکترونیک وارد شده در  ' + caption + ' صحیح نیست ');
    }
    else {
        $('#' + id).css('background', '');
    }

}
Messager.ShowInfo = function (title) {
    $('#myModalLabel').html(title);
    var str = '';
    for (var l = 0; l < Messager.info.length; l++) {
        str += Messager.info[l] + "</br>";

    }
    $('.modal-body[n]').html(str);
    $('#myModal').modal()
}
function LoadCache() {
  
        if (Dic[document.title] != null) {
            CurrentSerachMethod(null, Dic[document.title]);
        }
        
 
}
function TableViewAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location='/home/LogIn' }, 2000);

            }
        }
        else {
            dx.records = JSON.parse(dx.retrunValue).Records;
            for (var l = 0; l < dx.records.length; l++) {
                dx.records[l].RowState = 'NoChange';
                dx.records[l].selected = false;
                dx.records[l].rndId = Math.round(Math.random() * 99999999999999);


            }
      
            fnOk(dx);
        
        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}

function ScallerAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location = '/home/LogIn' }, 2000);

            }
        }
        else {
            fnOk(dx);

        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}


function ScallerAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location = '/home/LogIn' }, 2000);

            }
        }
        else {
            fnOk(dx);

        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}


Messager.ShowMessage = function (title, message) {
    Messager.ClearInfos();
    Messager.info.push(message);
    Messager.ShowInfo(title);

}
function toInput(key, value) {
    var obj = new Object();
    obj.key = key;
    obj.value = value;
    return obj;
}

function ConfirmAsk(message, strFun) {
    $('#myModalLabel').html('تایید');
    $('.modal-body').html(message);
    $('#myModalYesNo').modal();
    window.confirmFun = strFun;
}

function NormalResult() {
    $('a[pdaajaxsyntax]').each(function () { $(this).attr('onClick', $(this).attr('pdaajaxsyntax')) });
    $('[moneytype="yes"]').each(function () { NumberInput(null, $(this)[0]) });
}

function In(value) {
    for (var l = 1; l < arguments; l++) {
        if (value == arguments[l]) {
            return true;
        }
    }
    return false;
}
var targetFuns = null;
var Plen = 0;

function confirmInputBox() {
    var arrays = new Array();
    for (var l = 0; l < Plen; l++) {
        arrays.push($('#arg' + l).val());

    }
    targetFuns(arrays);
     
}

function InputBox(title,captions, fun) {
    Plen = captions.length;
    targetFuns = fun;

    var s = '';
   
    for (var l = 0; l < captions.length; l++) {
        s += ' <form class="form-horizontal"  role="form"> <div class="form-group"> <label class="col-sm-3  control-label " > ' + captions[l] + ' </label>  <div  class="col-sm-9" ><input type="text"   class="form-control" id="arg' + l + '" /></div></div></form>';
    }
  
 
    $('#DInputBoxTitle').html(title);
    $('[name="inputBody"]')[0].innerHTML = s;
    $('#DInputBox').modal();
}

function Num(v) {

    try {
        if (v === undefined) {
            return 0;
        }
        v = v.toString();
        return parseFloat(v.replace(/,/g, ''));
    }
    catch (ex) {
        return 0;

    }

}

function blockNonIntNumber(e) {
    if (e.charCode == 0) {

        return true;
    }



    if (e.charCode == 45) {

        return true;
    }
    if (e.charCode < 48) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;
}
function blockNonTimeNumber(e) {
    if (e.charCode == 0) {

        return true;
    }
    if (e.charCode == 58) {

        return true;
    }
    if (e.charCode < 48) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;

}
function ReformatDate(con) {
    var r = $('#' + con).val();
    if (r.length == 8) {
        par = r.split('/');
        if (par.length == 1) {
            $('#' + con).val(r.substring(0, 4) + '/' + r.substring(4, 6) + '/' + r.substring(6, 8));

        }

    }
}

function blockNonDateNumber(e) {


    if (e.charCode < 47) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;

}
var sss;
var sss;
function Select2AjaxInit(id, fun) {

    var r = $('#' + id).select2({

        ajax: {
            url: "/Home/Select2Ajax",
            dataType: 'json',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            params: {
                contentType: 'application/json; charset=utf-8'
            },
            quietMillis: 100,
            data: fun,
            processResults: function (data) {
                sss = data.results;


                return data;
            }

        }
    });

    return r;

}
function Select2AjaxInitTable(id, fun) {
    var valx = $('#' + id).val();
    var r = $('#' + id).select2({

        ajax: {
            url: "/Home/Select2AjaxTable",
            dataType: 'json',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            params: {
                contentType: 'application/json; charset=utf-8'
            },
            quietMillis: 100,
            data: fun,
            processResults: function (data) {
                sss = data.results;


                return data;
            }

        }
    });
    
    return r;

}
function NumberInput(e, t) {
    t.value = t.value.replace(/,/g, '');
    t.value = addCommas(t.value);

}
function ShowAsMoney(v) {
 
    v = v.toString().replace(/,/g, '');
    v = addCommas(v);
    return v;
}
function ShowBoolean(v) {
    switch (v) {
        case 'True':
            return 'بله';
            break;
        case 'False':
            return 'خیر';
            break;
        case '':
            return 'نا مشخص';
            break;

    }

}
//درج کاما برای عدد
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function TinyMceEditor(id) {

    tinymce.EditorManager.remove();
    tinymce.init({ selector: '#' + id, plugins: 'print preview fullpage searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime lists textcolor wordcount imagetools contextmenu colorpicker textpattern help', toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat', language: 'fa_IR' });


}
function goToLink(link) {
    var d = document.createElement('a');
    d.href = link;
    document.body.appendChild(d);
    d.click();

    document.removeChild(d);
}

function getDailOpen() {
    var r = "";
    $('div[isDailog]').each(function () {
        if ($(this)[0].style.display == 'block') {
            r= $(this).attr('PageName');
        }
      
       

    });

    return r;
}

var ScopeDlg = new Array();
function Para(id) {
 
    var d = getDailOpen();
    r = document.getElementById('txt' + (d!=""? d : window.pageName) + id);
    if (r != null) {
        if (r.getAttribute('Type') == 'Number') {
            return parseFloat($('#' + r.id).val());
        }
        else {
            if ($('#txt' + id).attr('moneymode') != 'yes') {
                return $('#' + r.id).val();
            }
            else {

                return Num(   $('#' + r.id).val());
            }
         
        }
    }
    else {
        return $('#' + r.id).val();

    }

}
function Select2AjaxMultValuesSetStatic(controllId, records, valueColumn) {
    var s = document.getElementById(controllId);

    var vals = new Array();
    for (var l = 0; l < records.length; l++) {
     
        vals.push(records[l][valueColumn]);
      
    }
    $('#' + controllId).val(vals).trigger('change');
}
function Select2AjaxMultValuesSet(controllId,records,valueColumn,titleColumn) {
    var s=document.getElementById(controllId);
    s.innerHTML = "";
    var vals = new Array();
    for (var l = 0; l < records.length; l++) {
        var o = document.createElement('option');
        o.value = records[l][valueColumn];
        o.innerHTML = records[l][titleColumn];
        vals.push(records[l][valueColumn]);
        s.appendChild(o);
    }
    $('#' + controllId).val(vals).trigger('change');
}

function Select2AjaxDirect(pageName,pageParameter,stringValue,controllId) {
    var o=new Object();
    o.PageName=pageName;
    o.PageParameterName=pageParameter;
    o.value=stringValue;

    Ajax("Home", "getDBSelect2DirectValue", JSON.stringify(o), function (data) {
        var o = document.createElement('option');
        o.value = stringValue;
        o.innerHTML = data.value;
     
      
        document.getElementById(controllId).innerHTML = "";
        document.getElementById(controllId).appendChild(o);

        $('#' + controllId).trigger('change');

    },
    function (d) {
        if (d.status == 200) {


        }
        else {
            alert('خطا دریافت اطلاعات');

        }
    });
}


function GetElement(id) {

    var d = getDailOpen();
    r = document.getElementById('txt' + (d != "" ? d : window.pageName) + id);
    
    return r;
}
function Query(id) {

    return routeParams[id];
}

var JsEventInterface = new Object();
JsEventInterface.beforeValidate = null;
JsEventInterface.afterVaildate = null;
JsEventInterface.BeforeSubmit = null;
JsEventInterface.AfterSubmit = null;
JsEventInterface.BeforeOkReqSubmit = null;
JsEventInterface.AfterOkReqSubmit = null;
JsEventInterface.BeforeFailReqSubmit = null;
JsEventInterface.AfterFailReqSubmit = null;
JsEventInterface.BeforeReadTable = null;
JsEventInterface.AfterReadTable = null;
JsEventInterface.BeforeOkReqReadTable = null;
JsEventInterface.AfterOkReqReadTable = null;
JsEventInterface.BeforeFailReqReadTable = null;
JsEventInterface.AfterFailReqReadTable = null;
JsEventInterface.BeforeSelect2AjaxInit = null;
JsEventInterface.AfterSelect2AjaxInit = null;
JsEventInterface.BeforeSelect2AjaxGrab = null;
JsEventInterface.AfterSelect2AjaxGrab = null;
JsEventInterface.BeforeInitForm = null;
JsEventInterface.AfterInitForm = null;
JsEventInterface.BeforeInitStartValue = null;
JsEventInterface.AfterInitStartValue = null;
JsEventInterface.BeforeOkReqInitStartValue = null;
JsEventInterface.AfterOkReqInitStartValue = null;
JsEventInterface.BeforeFailReqInitStartValue = null;
JsEventInterface.PageChange = null;
JsEventInterface.BeforeInitAjaxAction = null;
JsEventInterface.AfterInitAjaxAction = null;
JsEventInterface.BeforeOkReqInitAjaxAction = null;
JsEventInterface.AfterOkReqInitAjaxAction = null;
JsEventInterface.BeforeFailReqInitAjaxAction = null;

function CheckAllTable(b) {
    $('[tableCheck]').each(function () {
 
        $(this).attr('checked', b);
        sendCheckboxToRecord($(this)[0]);
    });


}
function sendCheckboxToRecord(obj) {

    angular.element(obj).scope().record.selected = obj.checked;
}


lastRecord = null;

function MergeNow(v) {
    console.log(JSON.stringify(v));
    var keys = Object.keys(v[0]);
  
    for (var i = 0; i < keys.length; i++) {
  
        if ((keys[i] != "rndId") && (keys[i] != "selected") && (keys[i] != "RowState")) {
            
            lastRecord[keys[i]] = v[0][keys[i]];
        }
    }
    currentScope.$apply({});
    NormalResult();
}
function GoValuePage(e, st, link) {
 
    if (e.keyCode == 13) {
        var d = document.createElement('a');
        d.href = '#/' + link + '/' + st;
  
        document.body.appendChild(d);
        d.click();
        document.body.removeChild(d);
    }
}
function ExportXls(id) {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = $('.table-bordered')[0]; // id of table

    for (j = 0 ; j < tab.rows.length ; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
    tab_text = tab_text.replace(/V/gi, "");
    tab_text = tab_text.replace(/^/gi, "");
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
    {
        var a = document.createElement('a');
        a.innerHTML = "Click here";
        a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
        a.target = '_blank';
        a.download = window.pageName +'.xls';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}



 
function RecalcScopes() {
    currentScope.$apply(function () { });
    if (dlgScope != null) {
        dlgScope.$apply(function () { });
    }
}

function SetupDlgScope() {

    (Object.getOwnPropertyNames(currentScope).filter(function (p) {
        var s= (typeof currentScope[p] === 'function') ;
        if(s==true)
            {
            dlgScope[p] = currentScope[p];

        }
    }));

}
function LogOut() {
    var a = document.createElement('a');
    a.innerHTML = "Click here";
    a.href = "/home/LogOut";
 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}
var TempRecords = null;
var tit = null;
var Dic = new Array();
function StoreCache() {
  


}
function GenStyleForTableResponse() {
    var d = document.getElementsByTagName('table');
    if (d.length == 0) {
        return;

    }
    var th = d[0].getElementsByTagName('th');
    var r = '';
    for (var l = 0; l < th.length; l++) {
        r+='td:nth-of-type(' + (l+1).toString() +'):before { content: "' + th[l].innerText +'"; }'

    }
 
}

function PovitTableMake(datas, row, Column, value) {
    var rows = new Array();
    var columns = new Array();
    var realData = new Array();
    var sumValues = new Array();
    for (var i = 0; i < datas.length; i++) {
        var r = datas[i][row];
        var rindex = rows.indexOf(r);
        if (rindex == -1) {
            rows.push(r);
            var o = new Object();
            o.title = r;
            o.sumValue = 0;
            realData.push(o);
            rindex = realData.length - 1;
        }
        var c = datas[i][Column];
        var cindex = columns.indexOf(c);
        if (cindex == -1) {
            columns.push(c);
            sumValues.push(0);
            cindex = columns.length - 1;
        }
        realData[rindex]['col' + cindex] = (realData[rindex]['col' + cindex] === undefined ? parseFloat(datas[i][value]) : realData[rindex]['col' + cindex] + datas[i][value]);
        realData[rindex]['sumValue'] +=  parseFloat( datas[i][value] )
        sumValues[cindex] += parseFloat(datas[i][value]);

    }
    var sumO = new Object();
    sumO.title = 'جمع';
    
    for (var k = 0; k < columns.length; k++) {
        sumO['col' + k] = sumValues[k];
      
    }
    realData.push(sumO);
    var returnObject = new Object();
    returnObject.columns = columns;
    returnObject.RealDatas = realData;
    return returnObject;
}

function ExportCsv() {
    // Select rows from table_id
    var rows = document.getElementsByClassName('table-bordered')[0];
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(';'));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_'  + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


var EntitySerach = new Array();
