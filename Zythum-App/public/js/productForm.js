function qs(e){
    return document.querySelector(e);
}

window.addEventListener('load', ()=>{
    const $form = qs('#create-product');
    const $formErrors = qs('#formErrors')
    const $brand = qs('#brand');
    const $brandErrors = qs('#brandErrors');
    const $category = qs('#category');
    const $categoryErrors = qs('#categoryErrors');
    const $subcategory = qs('#subcategory');
    const $subcategoryErrors = qs('#subcategoryErrors');
    const $size = qs('#size');
    const $sizeErrors = qs('#sizeErrors');
    const $taste = qs('#taste');
    const $tasteErrors = qs('#tasteErrors');
    const $alcohol = qs('#alcohol');
    const $alcoholErrors = qs('#alcoholErrors');
    const $density = qs('#density');
    const $densityErrors = qs('#densityErrors');
    const $amargor = qs('#amargor');
    const $amargorErrors = qs('#amargorErrors');
    const $stock = qs('#stock');
    const $stockErrors = qs('#stockErrors');
    const $price = qs('#price');
    const $priceErrors = qs('#priceErrors');
    const $discount = qs('#discount');
    const $discountErrors = qs('#discountErrors');
    const $description = qs('#description');
    const $descriptionErrors = qs('#descriptionErrors');
    const $image = qs('#image');
    const $imageErrors = qs('#imageErrors');
    let validationsErrors = false;
    let regExpNum = /^([0-9])*$/;
    let regExImage = /(.jpg|.jpeg|.png|.gif)$/i;

    $brand.addEventListener('blur', function(){
        if(!$brand.value.trim()){
            $brandErrors.innerHTML = 'Campo requerido';
            $brand.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $brand.classList.remove('is-invalid');
            $brand.classList.add('is-valid');
            $brandErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $category.addEventListener('blur', function(){
        if(!$category.value.trim()){
            $categoryErrors.innerHTML = 'Campo requerido';
            $category.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $category.classList.remove('is-invalid');
            $category.classList.add('is-valid');
            $categoryErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $subcategory.addEventListener('blur', function(){
        if(!$subcategory.value.trim()){
            $subcategoryErrors.innerHTML = 'Campo requerido';
            $subcategory.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $subcategory.classList.remove('is-invalid');
            $subcategory.classList.add('is-valid');
            $subcategoryErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $size.addEventListener('blur', function(){
        if(!$size.value.trim()){
            $sizeErrors.innerHTML = 'Campo requerido';
            $size.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $size.classList.remove('is-invalid');
            $size.classList.add('is-valid');
            $sizeErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $taste.addEventListener('blur', function(){
        if(!$taste.value.trim()){
            $tasteErrors.innerHTML = 'Campo requerido';
            $taste.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $taste.classList.remove('is-invalid');
            $taste.classList.add('is-valid');
            $tasteErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $alcohol.addEventListener('blur', function(){
        switch (true) {
            case !$alcohol.value.trim():
                $alcoholErrors.innerHTML = 'Campo requerido';
                $alcohol.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExpNum.test($alcohol.value):
                $alcoholErrors.innerHTML = 'Ingrese solo números'
                $alcohol.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $alcohol.classList.remove('is-invalid');
                $alcohol.classList.add('is-valid');
                $alcoholErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $density.addEventListener('blur', function(){
        switch (true) {
            case !$density.value.trim():
                $densityErrors.innerHTML = 'Campo requerido';
                $density.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExpNum.test($density.value):
                $densityErrors.innerHTML = 'Ingrese solo números'
                $density.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $density.classList.remove('is-invalid');
                $density.classList.add('is-valid');
                $densityErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $amargor.addEventListener('blur', function(){
        switch (true) {
            case !$amargor.value.trim():
                $amargorErrors.innerHTML = 'Campo requerido';
                $amargor.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExpNum.test($amargor.value):
                $amargorErrors.innerHTML = 'Ingrese solo números'
                $amargor.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $amargor.classList.remove('is-invalid');
                $amargor.classList.add('is-valid');
                $amargorErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $stock.addEventListener('blur', function(){
        switch (true) {
            case !$stock.value.trim() || $stock.value == 0:
                $stockErrors.innerHTML = 'Ingrese al menos una unidad.';
                $stock.classList.add('is-invalid');
                validationsErrors = true
                break;
            case !regExpNum.test($stock.value):
                $stockErrors.innerHTML = 'Ingrese solo números';
                $stock.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $stock.classList.remove('is-invalid');
                $stock.classList.add('is-valid');
                $stockErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $price.addEventListener('blur', function(){
        switch (true) {
            case !$price.value.trim() || $stock.value == 0:
                $priceErrors.innerHTML = 'Ingrese un valor mayor a 0';
                $price.classList.add('is-invalid')
                validationsErrors = true;
                break;
            case !regExpNum.test($price.value):
                $priceErrors.innerHTML = 'Ingrese solo números'
                $price.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
                $priceErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $discount.addEventListener('blur', function(){
        switch (true) {
            case !$discount.value.trim():
                $discount.classList.remove('is-invalid');
                $discount.classList.add('is-valid');
                $discount.value = 0;
                validationsErrors = false;
                break;
            case $discount.value >= 100:
                $discountErrors.innerHTML = 'Ingrese un valor menor que 100';
                $discount.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExpNum.test($discount.value):
                $discountErrors.innerHTML = 'Ingrese solo números';
                $discount.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $discount.classList.remove('is-invalid');
                $discount.classList.add('is-valid');
                $discountErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })

    $description.addEventListener('blur', function(){
        if(!$description.value.trim()){
            $descriptionErrors.innerHTML = 'Campo requerido';
            $description.classList.add('is-invalid')
            validationsErrors = true
        } else {
            $description.classList.remove('is-invalid');
            $description.classList.add('is-valid');
            $descriptionErrors.innerHTML = ''
            validationsErrors = false
        }
    })

    $image.addEventListener('change', ()=>{
        if (regExImage.exec($image.value)) {
            const file = $image.files[0];
            const imagen = URL.createObjectURL(file);
            /* const $imgPreview = document.querySelector('#imagen-previa');
            $imgPreview.src = imagen; */
            $image.classList.remove('is-invalid');
            $image.classList.add('is-valid');
            $imageErrors.innerHTML = '';
            validationsErrors = false;
        } else {
            /* const $imgPreview = document.querySelector('#imagen-previa');
            $imgPreview.src = ""; */
            $image.classList.add('is-invalid');
            $imageErrors.innerHTML = 'Solo extensiones .jpg .jpeg .png .gif'
        }
    })

    $form.addEventListener('submit', function(e) {
        e.preventDefault()
        let error = false;
        let elementsForm = this.elements;
        for (let i = 0; i < elementsForm.length - 1; i++) {
            if(elementsForm[i].name != 'discount' && elementsForm[i].value == '' && elementsForm[i].type !== 'file'){
                elementsForm[i].classList.add('is-invalid');
                $formErrors.innerHTML = 'Los campos indicados son obligatorios';
                error = true;
            }
        }
        if(!error && !validationsErrors) {
            $form.submit()
        }
    })
})