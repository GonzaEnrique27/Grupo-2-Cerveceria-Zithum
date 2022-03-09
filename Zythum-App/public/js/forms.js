const $formLogin = document.querySelector('#form-login');
const $createAccount = document.querySelector('.create-account span');
const $inputs = $formLogin.elements;

$createAccount.addEventListener('click', (e)=>{
    $formLogin.style = 'display: none';
    $formRegister.style = 'display: block';
})

function cambiar(){
    let name = document.getElementById('file-upload').files[0].name;

    if(name.length > 20){
        name = `  ${name.slice(0,3)}...${name.slice(-5)}`;
    }
    document.getElementById('info-file').innerHTML = name;
}