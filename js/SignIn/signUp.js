const URL = "https://digi27.azurewebsites.net/api/healthies";
var replace_email;
var count;
var validate,checkEmail;
var Hour;
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxyxxx-4xxx-yxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function printmsg()
{
    searchByEmail();
    var date = new Date();
    var month =date.getFullYear()+ "-" +(date.getMonth()+1) +"-" +(date.getDate());
    var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var UID = generateUUID();
    Hour_nose();
    
    
    checkValidate();
    setTimeout(() => {
    
    if(validate)
    {
        var newHuman = {
            UID: UID,
            Email: replace_email,
            Nation: document.getElementById("optNation").value,
            Language:document.getElementById("optLanguage").value,
            Hour_nose: Hour,
            Pass: document.getElementById("txtPassword").value,
            UID_Main_Account: null,
            Is_Beneficiary_Account: "n",
            Status: "chua kich hoat",
            Purchase_Date: "2023-2-8 15:1:07",
            Date:  month +" "+time,
            Users: [],
            User1: null
        }
        // alert('Tao thanh cong');
         addNew(newHuman);
    }
}
      , 1000);
};
function Hour_nose()
{
    if(document.getElementById("optNation").value === "Vietnam")
    {
        Hour = "7";
    }
    else if(document.getElementById("optNation").value === "Singapore")
    {
        Hour = "8";
    }else if(document.getElementById("optNation").value === "Korea")
    {
        Hour = "9";
    }else if(document.getElementById("optNation").value === "Hong Kong")
    {
        Hour = "8";
    }
    else if(document.getElementById("optNation").value === "Thailand")
    {
        Hour = "7";
    }
}
function checkValidate() {
    var emailID = document.getElementById("txtEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
        //  var keyword = document.getElementById("txtEmail").value;
        //  let checkEmail = searchByEmail();
        // var validate_pasword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/im;
        var validate_pasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
         const usr_input = document.getElementById("captcha-form").value;
    setTimeout(() => {

        if(document.getElementById("txtEmail").value == "")
    {
        alert("chua nhap email");
        validate =  false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        alert("Please enter correct email ID")
        validate =  false;
     }
     else if(checkEmail)
     {  
        alert("email bi trung");
        validate =  false;
     }
    else if(document.getElementById("txtPassword").value == "")
    {
        alert("chua nhap pass");
        validate =  false;
    }
    else if(!validate_pasword.test(document.getElementById("txtPassword").value))
    {
        alert("nhap sai dinh dang");
        validate =  false;
    }
    else if(document.getElementById("txtConfirmPassword").value == "")
    {
        alert("chua nhap confrom pass");
        validate =  false;
    }
    
    else if(document.getElementById("txtPassword").value != document.getElementById("txtConfirmPassword").value)
    {
        alert("Sai confrom pass");
        validate =  false;
    }
    else if(usr_input != captcha.innerHTML)
    {
        validate =  false;
        alert("Sai capcha");
        generate();
        document.getElementById("captcha-form").value = '';
    }
    else
    {
        validate = true;
    }
      }, 1000);
    
}
function addNew(newHuman) {
    axios.post(URL , newHuman).then((response) =>{
        var result = response.data;
        if(result){
            alert('Tao thanh cong');
            generate();
            clearTextboxes();
            window.location.href = "../html/index.html ";
        }else
        {
            alert('SORRY BABY !');
        }   
    });
}
function clearTextboxes()
{
    document.getElementById("txtEmail").value = '';
    document.getElementById("txtPassword").value = '';
    document.getElementById("txtConfirmPassword").value = '';
    document.getElementById("captcha-form").value = '';
}
function searchByEmail() {
    replace_email = document.getElementById("txtEmail").value.replace('.',',');
    count = 0;
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email === replace_email)
            {
                count = count + 1;
            }
        }
    });
    setTimeout(() => {
        if (count === 1)
    {
        checkEmail = true;
    }
    else checkEmail =  false;
      }, 1000);
}
