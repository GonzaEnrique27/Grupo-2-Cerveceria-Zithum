const formulario = document.getElementById('formulario'); // Traemos el ID de formulario
const inputs = document.querySelectorAll('#formulario input'); //  Seleccionamos todos los input que se encuentran dentro de la etiqueta form con su ID

// EXPRESIONES REGULARES //

const expresiones = {               
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 8 a 12 digitos.
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
		campos['password'] = false;
  }else {
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;

}}

// EVENTO AL LEVANTAR LA TECLA //

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})


// EVENTO EN EL BOTON SUBMIT //

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
                                             
  const terminos = document.getElementById('notificaciones')
  if (campos.name && campos.lastname && campos.email && campos.password && terminos.checked){
    console.log(campos.name)
    formulario.reset();

    document.querySelectorAll('formulario__grupo-correcto').forEach((icono)=>{
       icono.classList.remove('formulario__grupo-correcto')
     })
     
   }         
                
})
