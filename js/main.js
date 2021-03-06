var data={
    userName:{},
    password:{},
    fullName:{},
    date:{}
};

var userPanel = document.getElementById('userPanel');
var adminPanel = document.getElementById('adminPanel');
var userPanelBtn = document.getElementById('userPanelBtn');
var adminPanelBtn = document.getElementById('adminPanelBtn');

userPanelBtn.onclick = function (){
    if(userPanelBtn.getAttribute('class') !== 'disabled'){
        adminPanelBtn.setAttribute("class", "");
        userPanelBtn.setAttribute("class", "active");
        if (adminPanel.style.display != 'none') {
            adminPanel.style.display = 'none';
            userPanel.style.display = 'block';
        }
        else {
            userPanel.style.display = 'block';
        }
    }
    else{
        alert("Please save configurations first.");
    }
};

adminPanelBtn.onclick = function (){
    adminPanelBtn.setAttribute("class", "active");
    userPanelBtn.setAttribute("class", "");
    if (adminPanel.style.display == 'none') {
        userPanel.style.display = 'none';
        adminPanel.style.display = 'block';
    }
    else {
        userPanel.style.display = 'block';
    }
};

document.getElementById('saveConfigBtn').addEventListener('click',saveConfiguration);

function saveConfiguration(){

    userPanelBtn.setAttribute("class", "");

    var maxLengthUserName = document.getElementById('maxLengthUserName').value;
    var specialCharacterUserName = document.getElementById('specialCharacterUserName').value;
    var errMsgUserName = document.getElementById('errMsgUserName').value;
    var sucMsgUserName = document.getElementById('sucMsgUserName').value;
    data.userName.maxLen  = maxLengthUserName ? maxLengthUserName : 10;
    data.userName.specialCharacterAllowed = specialCharacterUserName ? specialCharacterUserName : '';
    data.userName.required = document.getElementById('optionalRequired').checked ? false : true;
    data.userName.errMsg = errMsgUserName ? errMsgUserName : 'Error in userName field';
    data.userName.sucMsg = sucMsgUserName ? sucMsgUserName : 'success';
    data.userName.regx = new RegExp("^[a-zA-Z0-9\."+data.userName.specialCharacterAllowed+"]+$");

    var minLengthPwd = document.getElementById('minLengthPwd').value;
    var maxLengthPwd = document.getElementById('maxLengthPwd').value;
    var specialCharacterPwd = document.getElementById('specialCharacterPwd').value;
    var sucMsgPwd = document.getElementById('sucMsgPwd').value;
    var errMsgPwd = document.getElementById('errMsgPwd').value;
    data.password.minLen = minLengthPwd ? minLengthPwd : 6;
    data.password.maxLen = maxLengthPwd ? maxLengthPwd : 12;
    data.password.specialCharacterAllowed = specialCharacterPwd ? specialCharacterPwd : '#@';
    data.password.errMsg = errMsgPwd ? errMsgPwd : 'Error in password field';
    data.password.sucMsg = sucMsgPwd ? sucMsgPwd : 'success';
    data.password.regx = new RegExp("^(?=.*?[A-Z])(?=(.*?[0-9]){2,})(?=(.*?["+data.password.specialCharacterAllowed+"]){2,}).{"+data.password.minLen+","+data.password.maxLen+"}$");

    var errMsgName = document.getElementById('errMsgName').value;
    var sucMsgName = document.getElementById('sucMsgName').value;
    var alphabetOnlyName = document.getElementById('alphabetOnlyName').value;
    data.fullName.alphabetOnly = alphabetOnlyName ? alphabetOnlyName : 'a-zA-Z0-9';
    data.fullName.oneSpaceAllowed = document.getElementById('oneSpaceAllowed').checked ? true : false;
    data.fullName.maxLenlimit40 = document.getElementById('maxLenlimit40').checked ? true : false;
    data.fullName.errMsg = errMsgName ? errMsgName : 'Error in name field';
    data.fullName.sucMsg = sucMsgName ? sucMsgName : 'success';
    data.fullName.regx = data.fullName.oneSpaceAllowed ? new RegExp("^["+data.fullName.alphabetOnly+"]+ ?(["+data.fullName.alphabetOnly+"]+$){1}") :  new RegExp("^["+data.fullName.alphabetOnly+"]+$"); 
    
    var possibleDateFormats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY','DD-MM-YYYY'];
    var relativeRegx = ['^(\\d{4})(\-)(0[1-9]|1[012])(\-)(0?[1-9]|[12][0-9]|3[01])$','^(\\d{4})(\/)(0[1-9]|1[012])(\/)(0?[1-9]|[12][0-9]|3[01])$','^(0?[1-9]|[12][0-9]|3[01])(\/)(0[1-9]|1[012])(\/)(\\d{4})$','^(0?[1-9]|[12][0-9]|3[01])(\-)(0[1-9]|1[012])(\-)(\\d{4})$'];
    var dateFormat = document.getElementById('dateFormat').value;
    var errMsgDate = document.getElementById('errMsgDate').value;
    var sucMsgDate = document.getElementById('sucMsgDate').value;
    data.date.format = dateFormat ? dateFormat:'dd/mm/yyyy';
    data.date.specailcharChange = document.getElementById('specailcharChange').checked ? true : false;
    var dateFormatIndex = getindexBasedOnChoosenDateFormat(possibleDateFormats, data.date.format);
    data.date.regx = (data.date.specailcharChange) ? new RegExp(relativeRegxWithSpChar[dateFormatIndex]) : new RegExp(relativeRegx[dateFormatIndex]);
    data.date.errMsg = errMsgDate ? errMsgDate : 'Error in date field';
    data.date.sucMsg = sucMsgDate ? sucMsgDate : 'success';

    tempAlert("Configuration Saved. <br>Now you can click on user panel.",800);
}

function getindexBasedOnChoosenDateFormat(srcArr,targetVal){
    for(var i=0;i<srcArr.length;i++){
        if(srcArr[i] === targetVal.toUpperCase()){
            return i;
        }
    }
}
function tempAlert(msg,duration)
{
     var el = document.createElement("div");
     el.setAttribute("style","position: absolute; top: 50%; left: 36%; background-color: #337ab7; width: 450px; height: 300px; text-align: center; vertical-align: text-bottom; line-height: 140px; color: white; font-size: x-large; border-radius: 30px;");
     el.innerHTML = msg;
     setTimeout(function(){
      el.parentNode.removeChild(el);
     },duration);
     document.body.appendChild(el);
}

function validate(obj){
    var errorMsgUsernameDiv = document.getElementById('errorMsgUsername');
    var errorMsgPwdDiv = document.getElementById('errorMsgPwd');
    var errorMsgNameDiv = document.getElementById('errorMsgName');
    var errorMsgDateDiv = document.getElementById('errorMsgDate');
    errorMsgUsernameDiv.innerHTML = '';
    errorMsgPwdDiv.innerHTML = '';
    errorMsgNameDiv.innerHTML = '';
    errorMsgDateDiv.innerHTML = '';
    var specialCharRegx = new RegExp(/^[!@#$%\^&*)(+=._-]*$/);
    var onlyAlphabetRegx = new RegExp(/^[A-z]+$/);
    var possibleDateFormats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY','DD-MM-YYYY'];
    switch(obj.id){
        case 'minLengthPwd':
            if(obj.value < 1){
                errorMsgPwdDiv.innerHTML = 'Please provide minimum length greater than 0';
                errorMsgPwdDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'maxLengthPwd':
            var minpwdlen = document.getElementById('minLengthPwd').value;
            if(obj.value < 1){
                errorMsgPwdDiv.innerHTML = 'Please provide maximum length greater than 0';
                errorMsgPwdDiv.setAttribute("style","color: red");
                obj.focus();
            }
            else if(minpwdlen > obj.value){
                errorMsgPwdDiv.innerHTML = 'Please provide maximum length greater than minimum length';
                errorMsgPwdDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'maxLengthUserName':
            if(obj.value < 1){
                errorMsgUsernameDiv.innerHTML = 'Please provide valid maximum length greater than 0';
                errorMsgUsernameDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'specialCharacterUserName':
            if(!obj.value.match(specialCharRegx)){
                errorMsgUsernameDiv.innerHTML = 'Please fill only special charaters like !@#$%\^&*)(+=._-';
                errorMsgUsernameDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'specialCharacterPwd':
            if(!obj.value.match(specialCharRegx)){
                errorMsgPwdDiv.innerHTML = 'Please fill only special charaters like !@#$%\^&*)(+=._-';
                errorMsgPwdDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'dateFormat':
            if(possibleDateFormats.indexOf(obj.value.toUpperCase()) === -1){
                errorMsgDateDiv.innerHTML = 'Please fill this field with only specified date formats';
                errorMsgDateDiv.setAttribute("style","color: red");
                //obj.focus();
            }
            break;
        case 'alphabetOnlyName':
            if(!obj.value.match(onlyAlphabetRegx)){
                errorMsgNameDiv.innerHTML = 'Please fill this field with only alphabets';
                errorMsgNameDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
    }
}

function validateUserInput(obj){
    var ErrorMsgDiv = document.getElementById('errorMsgUser');
    switch(obj.id){
        case 'userName':
            if(validateUserName(obj.value)){
                ErrorMsgDiv.innerHTML = data.userName.sucMsg;
                ErrorMsgDiv.setAttribute("style","color: green");
            }
            else{
                ErrorMsgDiv.innerHTML = data.userName.errMsg;
                ErrorMsgDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'fullName':
            if(validateName(obj.value)){
                ErrorMsgDiv.innerHTML = data.fullName.sucMsg;
                ErrorMsgDiv.setAttribute("style","color: green");
            }
            else{
                ErrorMsgDiv.innerHTML = data.fullName.errMsg;
                ErrorMsgDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'dateUser':
            if(validateDate(obj.value)){
                ErrorMsgDiv.innerHTML = data.date.sucMsg;
                ErrorMsgDiv.setAttribute("style","color: green");
            }
            else{
                ErrorMsgDiv.innerHTML = data.date.errMsg;
                ErrorMsgDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;
        case 'pwd':
            if(validatePassword(obj.value)){
                ErrorMsgDiv.innerHTML = data.password.sucMsg;
                ErrorMsgDiv.setAttribute("style","color: green");
            }
            else{
                ErrorMsgDiv.innerHTML = data.password.errMsg;
                ErrorMsgDiv.setAttribute("style","color: red");
                obj.focus();
            }
            break;      
    }
}

function validateUserName (userInputVal) {
    if(userInputVal.length > data.userName.maxLen) {
        return false;
    }
    else if(data.userName.required && userInputVal.length ===0) {
        return false;
    }
    else if(userInputVal.length > 0 && !userInputVal.match(data.userName.regx)){
        return false;
    }
    return true;
}

function validateName (userInputVal) {
    if(!userInputVal.match(data.fullName.regx)){
        return false;
    }
    if(data.fullName.maxLenlimit40 && (userInputVal.length > 40)) {
        return false;
    }
    return true;
}

function validatePassword(userInputVal) {
    if(userInputVal.length < data.password.minLen){
        return false;
    }
    else if(userInputVal.length > data.password.maxLen){
        return false;
    }
    else if(!userInputVal.match(data.password.regx)){
        return false;
    }
    return true;
}

function validateDate(userInputVal) {
    if(!userInputVal.match(data.date.regx)){
        return false;
    }
    else {
        return true;
    }
}
