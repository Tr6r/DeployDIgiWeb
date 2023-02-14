const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;

function check()
{
    alert("cuong");
    email = sessionStorage.getItem('email');
    axios.get(URL + "/SearchByEmail/"+email).then((response) =>{
        var healthies = response.data;

        for(var human of healthies )
        {
            sessionStorage.setItem('UID', human.UID);
            sessionStorage.setItem('Nation', human.Nation);
        }
    });
    

}