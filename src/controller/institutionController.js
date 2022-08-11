const database = require('../database/config')
const validators = require('../validations/validators')
const insitution = async (req,res) => {
    const { name, email, phone, zip, city,
         state, streetAddress, number, complement,
         neighborhood, description,
         urlInstagram, urlLinkedin, urlFacebook,
         urlSite, type} = req.body;
         const validationFiels = validators.validateField([name, phone, zip, city, state, streetAddress, number, neighborhood,description])
         if(!email) validationFiels.push('email')
         try {
            if (validationFiels.length>0) {
                throw {
                    statusCode: 400,
                    error: true,
                    requiredFields:validationFiels,
                    errorMessage:"Todos os campos obrigatórios devem ser informados"
                }
            }
            if (!validators.validateEmail(email)) {
                throw {
                    statusCode: 400,
                    error: true,
                    errorMessage: "O email informado não é válido."
                }
            }
            const [emailAlreadyExists]= await database.select(['institutions.*'])
            .table('institutions')
            .where({ email })
            .limit(1);
            if(emailAlreadyExists) {
                console.log(emailAlreadyExists)
                throw {
                    statusCode: 400,
                    error: true,
                    errorMessage: "O email informado já está cadastrado."
                }
            }

            if (!validators.validatePhone(phone)) {
                throw {
                    statusCode: 400,
                    error: true,
                    errorMessage: "O telefone informado não é valido."
                }
            }
            if(!validators.validateInstitutionType(type)) {
                throw {
                    statusCode: 400,
                    error: true,
                    errorMessage: "O type informado não é valido."
                }
            }
            await database.insert({
                name,
                email,
                phone,
                zip,
                city,
                state,
                streetAddress,
                number,
                complement,
                neighborhood,
                description,
                urlInstagram,
                urlLinkedin,
                urlFacebook,
                urlSite,
                type,
            }).table('institutions')
            return res.json({ sucess:true})
         } catch (error) {
            return error.statusCode ?
            res.status(error.statusCode).json(error) :
             res.status(500).send(error.message)
         }
}
const getInstitutions = async(req,res) => {
    try {
        const allInstitutions = await database.select([
        'name',
        'phone',
        'zip',
        'city',
        'state',
        'streetAddress',
        'number',
        'complement',
        'neighborhood',
        'description',
        'urlInstagram',
        'urlLinkedin',
        'urlFacebook',
        'urlSite',
        'type'])
        .table('institutions')
        .orderBy('createdAt','desc')
        const returnInstitutions = allInstitutions.map((institution) => {
            institution.complement = institution.complement !== "" ? 
                institution.complement : "Sem complement"
            institution.urlLinkedin =  institution.urlLinkedin !== "" ?
                institution.urlLinkedin : "Sem Linkedin"
            institution.urlFacebook = institution.urlFacebook !== "" ?
                institution.urlFacebook : "Sem Facebook"
            institution.urlInstagram = institution.urlInstagram !== "" ?
                institution.urlInstagram : "Sem Instagram"
            institution.urlSite = institution.urlSite !== "" ?
                institution.urlSite : "Sem Website"
            return institution
        })
        return res.json(returnInstitutions)
    } catch (error) {
        return res.status(400).json({ error:error.message})
    }
}
module.exports ={
    insitution,
    getInstitutions
}