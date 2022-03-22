const formulario = document.getElementById('formulario'); // Traemos el ID de formulario
const inputs = document.querySelectorAll('#formulario input'); //  Seleccionamos todos los input que se encuentran dentro de la etiqueta form con su ID

// EXPRESIONES REGULARES //

const expresiones = {               
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,20}$/, // 8 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}


//CUANDO LOS CAMPOS ESTEN VACIOS MOSTRAR FALSE//

const campos = {
  name:false,
  lastname: false,
  email: false,
  password: false,
  password2: false
}

const errores = {
  name: 'Ingrese un nombre válido',
  lastname: 'Ingrese un apellido válido',
  email: 'Ingrese un correo válido',
  password: 'La contraseña tiene que ser de 8 a 12 dígitos.'
}

console.log(campos)
// VALIDACION EN CADA UNO DE LOS CAMPOS //

const validarFormulario = (e) => {
 switch (e.target.name) {
   case "name":
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
		document.querySelector(`#grupo__${campo} .error`).innerHTML = "";
	  campos[campo]= true;
  } else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .error`).innerHTML = errores[campo];
    campos[campo]= false;
  }
}



// FUNCION PARA QUE LAS CONTRASEÑAS COINCIDAN //

const validarPassword2 = () =>{
  const inputPassword1 = document.getElementById('password')
  const inputPassword2 = document.getElementById('password2')
  if ((inputPassword1.value !== inputPassword2.value) || inputPassword2.value.trim() == ''){
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
    if(inputPassword2.value.trim() == ''){
      document.querySelector(`#grupo__password2 .error`).innerHTML = 'Este campo es obligatorio';
    } else {
      document.querySelector(`#grupo__password2 .error`).innerHTML = "Las contraseñas deben coincidir.";
    }
		campos['password2'] = false;
  }else {
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .error`).innerHTML = "";
		campos['password2'] = true;

}}

// EVENTO AL LEVANTAR LA TECLA //

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})


// EVENTO EN EL BOTON SUBMIT //

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  const elements = e.target.elements;
  let error = false;

  for (let i = 0; i < elements.length -3; i++) {
  if (elements[i].value === ""){
    error = true
    document.getElementById("grupo__" + elements[i].name).classList.add('formulario__grupo-incorrecto')
    
  }
  
}

  const terminos = document.getElementById('notificaciones');

  if(!terminos.checked){
    document.querySelector('.input-checkbox .error').innerHTML = 'Debe aceptar los términos y condiciones.'
  } else if (campos.name && campos.lastname && campos.email && campos.password && terminos.checked){
    formulario.submit();     
  }         
})
  /* const terminos = document.getElementById('notificaciones')
  if (campos.name && campos.lastname && campos.email && campos.password && terminos.checked){
    
    formulario.submit();

    document.querySelectorAll('formulario__grupo-correcto').forEach((icono)=>{
       icono.classList.remove('formulario__grupo-correcto')
     })
     
   }     */     