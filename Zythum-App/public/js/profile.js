function qs(e){
    return document.querySelector(e);
}

window.addEventListener('load', ()=>{
    let $formProfile = qs('.form-profile');
    let $inputs = document.querySelectorAll('.form-profile input');
    let $buttonEdit = qs('.edit-info');
    let $buttonSave = qs('.save-info');
    let $buttonCancel = qs('.cancel-info');

    $buttonEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        $buttonEdit.style.display = 'none';
        $buttonSave.style.display = 'block';
        $buttonCancel.style.display = 'block';
        for(let i = 0; i < $inputs.length; i++){
            $inputs[i].disabled = false;
        }
    })
})