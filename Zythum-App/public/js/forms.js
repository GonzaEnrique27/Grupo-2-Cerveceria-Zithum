/* const $formLogin = document.querySelector('#form-login');
const $createAccount = document.querySelector('.create-account span');
const $formRegister = document.querySelector('.form-register');
const $toLogin = document.querySelector('.form-register #to-login');
const $inputs = $formLogin.elements;

$createAccount.addEventListener('click', (e)=>{
    $formLogin.classList.remove('display-flex');
    $formLogin.classList.add('display-none');
    $formRegister.classList.remove('display-none');
    $formRegister.classList.add('display-flex');
})

$toLogin.addEventListener('click', (e)=>{
    $formRegister.classList.remove('display-flex');
    $formRegister.classList.add('display-none');
    $formLogin.classList.remove('display-none');
    $formLogin.classList.add('display-flex');
}) */

function cambiar(){
    let name = document.getElementById('file-upload').files[0].name;

    if(name.length > 20){
        name = `  ${name.slice(0,3)}...${name.slice(-5)}`;
    }
    document.getElementById('info-file').innerHTML = name;
}