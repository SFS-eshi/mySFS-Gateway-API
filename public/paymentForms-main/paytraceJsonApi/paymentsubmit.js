$( document ).ready(function() {
  // do this first, or wrap in a try/catch to ensure the form is never un-hooked
  paytrace.hookFormSubmit('#myform');
  paytrace.hookFormSubmit('#cc-form');

  // set the key from an AJAX call (in this case via a relative URL)
  paytrace.setKeyAjax('/jsonAPI/public_key.pem'); // Aperture Science Demo
});

function getUrlValue(vars){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == vars){
            return KeyValuePair[1];
        }
    }
}

function customerCCchanged() {
  var ccSel = document.getElementById("customerccSelect");
  var ccSelVal = ccSel.options[ccSel.selectedIndex].value;
  var ccNum = document.querySelector('#customerccNumber');
  
  ccNum.value = ccSelVal;

  alert(ccNum.value);
}

function ccChanged() {
  var ccSel = document.getElementById("ccSelect, customerccSelect");
  var ccSelVal = ccSel.options[ccSel.selectedIndex].value;
  var ccNum = document.querySelector('#ccNumber, #customerccNumber');
  
  ccNum.value = ccSelVal;

  alert(ccNum.value);
}

function correctNum() {
  // Grab the number on loss of focus:
  var num = parseFloat(document.getElementById("ccAmount").value);

  // If we need to shorten the number...
  if( countDecimals(num) > 2) {
    // Change the decimal places to two:
    var nfix = num.toFixed(2);

    document.querySelector("#ccAmount").value = nfix;
    alert("Your AMOUNT value was all jacked up. Fixing it...");
  }
}

var countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}