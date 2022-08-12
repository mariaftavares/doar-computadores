const validateField = (fields) => {
  let fieldsNotValid = []
  let fieldsNames = [
    'name',
    'phone',
    'zip',
    'city',
    'state',
    'streetAddress',
    'number',
    'neighborhood',
    'devices',
    'deviceCount'
  ]
  fields.forEach((field, index) => {
    if (typeof field === 'string') {
      if (!field || field.trim() == '') {
        fieldsNotValid.push(fieldsNames[index])
      }
    } else {
      if (!field || field.length === 0 || field == 0) {
        fieldsNotValid.push(fieldsNames[index])
      }
    }
  })
  return fieldsNotValid
}

const validateEmail = (email) => {
  const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  return regex.test(email)
}

const validateDevices = (devices) => {
  const types = {
    notebook: true,
    desktop: true,
    netbook: true,
    screen: true,
    printer: true,
    scanner: true
  }

  const conditions = {
    working: true,
    notworking: true,
    broken: true
  }
  const validation = devices.some(
    (device) =>
      !device.type ||
      !types[device.type.toLowerCase()] ||
      !device.condition ||
      !conditions[device.condition.toLowerCase()]
  )
  return validation
}

const validatePhone = (phone) => {
  const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$')
  return regex.test(phone)
}


const validateInstitutionType =(type) =>{
    return ['recycling','socialedtech','socialother'].includes(type.toLowerCase())
}

module.exports={
    validateField,
    validateEmail,
    validateDevices,
    validatePhone,
    validateInstitutionType
}
