// const formulario = document.getElementById('form-login'); // Traemos el ID de formulario
// const inputs = document.querySelectorAll('#form-login input'); //  Seleccionamos todos los input que se encuentran dentro de la etiqueta form con su ID


// // EXPRESIONES REGULARES //

// const expresiones = {
// 	password: /^.{8,12}$/, // 8 a 12 digitos.
// 	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
// }

// //CUANDO LOS CAMPOS ESTEN VACIOS MOSTRAR FALSE//

// const campos = {
//     email: false,
//     password: false
//   }

//   // VALIDACION EN CADA UNO DE LOS CAMPOS //

// const validarFormulario = (e) => {
//     switch (e.target.name) {
//         case "email":
//     validarCampo(expresiones.correo, e.target, 'email')

//    break;

//    case "pass":
//     validarCampo(expresiones.password, e.target, 'password')

//     break;
//     }
// }


//   // FUNCION PARA VALIDAR LOS CAMPOS //

// const validarCampo = (expresion, input, campo) => {
// 	if(expresion.test(input.value)){
// 		document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-correcto');
// 		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
// 		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
// 		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
// 	  campos[campo]= true
//   } else {
// 		document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-correcto');
// 		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
// 		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
// 		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
//     campos[campo]= false
//   }
// }

// // EVENTO AL LEVANTAR LA TECLA //

// inputs.forEach((input)=>{
//     input.addEventListener('keyup', validarFormulario)
//     input.addEventListener('blur', validarFormulario)
//   })

//   // EVENTO EN EL BOTON SUBMIT //

// formulario.addEventListener('submit', (e) => {
//     e.preventDefault()          
                                      
//     const terminos = document.getElementById ('notificaciones')
//     if (campos.email && campos.password){
//       formulario.reset();
  
//       document.querySelectorAll('formulario__grupo-correcto').forEach((icono)=>{
//         icono.classList.remove('formulario__grupo-correcto')
//       })
      
//     }                                
//   })