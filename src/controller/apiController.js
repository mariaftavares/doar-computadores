
const statusReturn = (req,res) =>{
    try {
        res.status(200).send({alive: true})
    } catch (error) {
        res.status(500).send({
            message: error.message
          })
    }
}



const donation = (req,res) =>{
    const {name,email,phone,zip,city,state,streetAddress,number,complement,neighborhood,deviceCount,devices} = req.body
    const fields = [name,phone,zip,city,state,streetAddress,number,neighborhood]
    try {
        if(validateField(fields) || !devices || !deviceCount){
            throw {
                statusCode: 400,
                error:true,
                requiredFiels:["name","phone","zip","city","state","streetAddress","number","neighborhood","deviceCount","devices"],
                errorMessage: "Todos os campos obrigatórios devem ser informados"
            }
        }
        if(email && !validateEmail(email)){
            throw {
                statusCode: 400,
                error:true,
                errorMessage: "O email informado não é válido"
            }
        }

        if(deviceCount !== devices.length){
            throw {
                statusCode: 400,
                error:true,
                errorMessage: `A quantidade de equipamentos (${deviceCount.toString()}) não está de acordo com as informações de equipamentos enviados (${devices.length.toString()})`
            }  
        }

        if(validateType(devices)){
            throw {
                statusCode: 400,
                error:true,
                errorMessage: "O tipo de equipamento não é válido"
            }  

        }

        res.status(200).json({success:true})

    } catch (error) {
        if(error.statusCode){
            res.status(error.statusCode).json(error)
        }

        else{
            res.status(500).send(error.message)
        }
        
    }
}
const validateField = (fields)=>{
    const validation = fields.some(field => !field || field.trim() == "")
    return validation;
}

const validateEmail = (email) => {
    const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/); 
    return regex.test(email);
}

const validateType = (devices) => {
    const types = {
        notebook: true,
        desktop: true,
        netbook: true,
        screen: true,
        printer: true,
        scanner:true
    }
    const validation = devices.some(device => !types[device.type.toLowerCase()])
    return validation;
}



module.exports ={
    statusReturn,
    donation
}
