const formulario = document.getElementById('formulario'); // Traemos el ID de formulario
const inputs = document.querySelectorAll('#formulario input'); //  Seleccionamos todos los input que se encuentran dentro de la etiqueta form con su ID

// EXPRESIONES REGULARES //

const expresiones = {               
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 6 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}


//CUANDO LOS CAMPOS ESTEN VACIOS MOSTRAR FALSE//

const campos = {
  nombre : false,
  lastname: false,
  email: false,
  password:false
}

// VALIDACION EN CADA UNO DE LOS CAMPOS //

const validarFormulario = (e) => {
 switch (e.target.name) {
   case "nombre":
    validarCampo(expresiones.nombre, e.target, 'name')
   break;
  
   case "lastname":
    validarCampo(expresiones.nombre, e.target, 'lastname')

   break;

   case "email":
    validarCampo(expresiones.correo, e.target, 'email')

   break;

   case "password":
    validarCampo(expresiones.password, e.target, 'password')
    validarPassword2()

   break;
   
   case "password2":
     validarPassword2()

   break;
 }

}


 // FUNCION PARA VALIDAR LOS CAMPOS //

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	  campos[campo]= true
  } else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo]= false
  }
}



// FUNCION PARA QUE LAS CONTRASEÑAS COINCIDAN //

const validarPassword2 = () =>{
  const inputPassword1 = document.getElementById('password')
  const inputPassword2 = document.getElementById('password2')
  if (inputPassword1.value !== inputPassword2.value){
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos['password']= false
  }else {
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos['password'] = true

  }

}

// FUNCION AL LEVANTAR LA TECLA //

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})


// EVENTO EN EL BOTON SUBMIT //

formulario.addEventListener('',(e) => {          
  e.preventDefault()                                  
  const terminos = document.getElementById ('notificaciones')
  if (campos.nombre && campos.lastname && campos.email && campos.password && terminos.checked){
    formulario.reset();

    document.querySelectorAll('formulario__grupo-correcto').forEach((icono)=>{
      icono.classList.remove('formulario__grupo-correcto')
    })
    
  }                                
})



































// const form  = document.getElementsByTagName('form')[0];
// const email = document.getElementById('email');
// const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// let error = email;
// while ((error = error.nextSibling).nodeType != 1);



// function addEvent(element, event, callback) {
//   let previousEventCallBack = element["on"+event];
//   element["on"+event] = function (e) {
//     const output = callback(e);

//     if (output === false) return false;

//     if (typeof previousEventCallBack === 'function') {
//       output = previousEventCallBack(e);
//       if(output === false) return false;
//     }
//   }
// };


// addEvent(window, "load", function () {
//   const test = email.value.length === 0 || emailRegExp.test(email.value);

//   email.className = test ? "valid" : "invalid";
// });


// addEvent(email, "input", function () {
//   const test = email.value.length === 0 || emailRegExp.test(email.value);
//   if (test) {
//     email.className = "valid";
//     error.innerHTML = "";
//     error.className = "error";
//   } else {
//     email.className = "invalid";
//   }
// });

// addEvent(form, "submit", function () {
//   const test = email.value.length === 0 || emailRegExp.test(email.value);

//   if (!test) {
//     email.className = "Invalido";
//     error.innerHTML = "Se requiere un Email!";
//     error.className = "Error active";

//     return false;
//   } else {
//     email.className = "valid";
//     error.innerHTML = "";
//     error.className = "error";
//   }
// });