const edad = document.querySelector('#edad')
const email = document.querySelector('#email')
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const password = document.querySelector('#password')
const errorList = document.querySelector('#errorList')
const form = document.querySelector('form')

const errores = {
  nombre   : {
    isEmpty        : true,
    isNotText      : true,
    isBiggerThan20 : true
  },
  apellido : {
    isEmpty        : true,
    isNotText      : true,
    isBiggerThan20 : true
  },
  edad     : {
    isNotNumber : true
  },
  password : {
    doesntHaveNumber    : true,
    isNotBetween9And20  : true,
    doesntHaveLowerCase : true,
    doesntHaveUpperCase : true
  },
  email    : {
    isEmpty    : true,
    isNotEmail : true
  }
}

const errorNames = {
  isEmpty             : 'No puede estar vacio',
  isNotText           : 'Solo acepta texto',
  isBiggerThan20      : 'No puede exceder los 20 caracteres',
  doesntHaveNumber    : 'Debe contener un numero',
  isNotBetween9And20  : 'Debe tener entre 9 y 20 caracteres',
  doesntHaveLowerCase : 'Debe contener una minuscula',
  doesntHaveUpperCase : 'Debe contener una mayuscula',
  isNotNumber         : 'Solo acepta numeros',
  isNotEmail          : 'No es un email valido'
}

/** Hacer las validaciones con regex */
// al armar la funcion de esta manera, (re) => (e) =>{} , la currifico y la dejo point free
const check = re => e => e.value.search(re) === -1

const isEmpty = check(/^.+$/)
const isNotText = check(/^[A-Za-z ]+$/)
const isNotEmail = check(/^[\w-.]+@(gmail|outlook|icloud)\.com$/)
const isNotNumber = check(/^\d*$/)
const isBiggerThan20 = check(/^.{0,20}$/)
const doesntHaveNumber = check(/\d/)
const isNotBetween9And20 = check(/^.{9,21}$/)
const doesntHaveLowerCase = check(/[a-z]/)
const doesntHaveUpperCase = check(/[A-Z]/)

// Events
edad.addEventListener('blur', validarEdad)
email.addEventListener('blur', validarEmail)
nombre.addEventListener('blur', validarNombre)
apellido.addEventListener('blur', validarApellido)
password.addEventListener('blur', validarPassword)

// Submit
form.addEventListener('submit', e => {
  if (errorQty(errores) !== 0) {
    e.preventDefault()
  }
})

function validarNombre() {
  errores.nombre.isEmpty = isEmpty(this)
  errores.nombre.isNotText = isNotText(this)
  errores.nombre.isBiggerThan20 = isBiggerThan20(this)
  validar()
}

function validarApellido() {
  errores.apellido.isEmpty = isEmpty(this)
  errores.apellido.isNotText = isNotText(this)
  errores.apellido.isBiggerThan20 = isBiggerThan20(this)
  validar()
}

function validarEdad() {
  errores.edad.isNotNumber = isNotNumber(this)
  validar()
}

function validarPassword() {
  errores.password.isEmpty = isEmpty(this)
  errores.password.doesntHaveNumber = doesntHaveNumber(this)
  errores.password.isNotBetween9And20 = isNotBetween9And20(this)
  errores.password.doesntHaveLowerCase = doesntHaveLowerCase(this)
  errores.password.doesntHaveUpperCase = doesntHaveUpperCase(this)
  validar()
}

function validarEmail() {
  errores.email.isEmpty = isEmpty(this)
  errores.email.isNotEmail = isNotEmail(this)
  validar()
}

function validar() {
  errorList.innerHTML = ''
  for (const input in errores) {
    for (const validacion in errores[input]) {
      if (errores[input][validacion]) {
        const li = document.createElement('li')
        li.textContent = `${input}: ${errorNames[validacion]}`
        errorList.append(li)
      }
    }
  }
}

const errorQty = errores => {
  const o = []
  for (const key in errores) {
    o.push(...Object.values(errores[key]))
  }

  return o.filter(x => x == true).length
}
