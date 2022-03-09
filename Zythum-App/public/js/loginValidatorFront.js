 const formularioLogin = document.getElementById('form-login'); // Traemos el ID de formulario
 const inputsLogin = document.querySelectorAll('#form-login input'); //  Seleccionamos todos los input que se encuentran dentro de la etiqueta form con su ID


 // EXPRESIONES REGULARES //

const expresionesLogin = {
 	password: /^.{2,25}$/, // 8 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

 //CUANDO LOS CAMPOS ESTEN VACIOS MOSTRAR FALSE//

const camposLogin = {
    email: false,
    pass: false
  }

const errores = {
  email: 'Ingrese un correo válido.',
  pass: 'Campo Obligatorio'
}

   // VALIDACION EN CADA UNO DE LOS CAMPOS //

const validarFormularioLogin = (e) => {
    switch (e.target.name) {
      case "email":
        validarCampoLogin(expresionesLogin.correo, e.target, 'email');
        break;
      case "pass":
        validarCampoLogin(expresionesLogin.password, e.target, 'pass');
        break;
    }
}


   // FUNCION PARA VALIDAR LOS CAMPOS //

const validarCampoLogin = (expresion, input, campo) => {
  if(expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} .error`).innerHTML = "";
    camposLogin[campo]= true
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} .error`).innerHTML = errores[campo];
    camposLogin[campo]= false
  }
}
 // EVENTO AL LEVANTAR LA TECLA //

 inputsLogin.forEach((input)=>{
     input.addEventListener('keyup', validarFormularioLogin)
     input.addEventListener('blur', validarFormularioLogin)

    })
   // EVENTO EN EL BOTON SUBMIT //

formularioLogin.addEventListener('submit', (e) => {
     e.preventDefault()          
     if (camposLogin.email && camposLogin.pass){
       formularioLogin.submit();
  
       /* document.querySelectorAll('formulario__grupo-correcto').forEach((icono)=>{
         icono.classList.remove('formulario__grupo-correcto')
       }) */
      
    }                                
   })