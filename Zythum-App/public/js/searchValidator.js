window.addEventListener('load', () => {
    $form = document.querySelector('#h-search-bar');
    $input = document.querySelector('#input-search');

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        if ($input.value.trim()) {
            $form.submit();
        }
    }); 
});