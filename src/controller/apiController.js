const {
    default: knex
} = require('knex')
const database = require('../database/config')
const validators = require('../validations/validators')

const statusReturn = (req, res) => {
    try {
        res.status(200).send({
            alive: true
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const getDonations = async (req, res) => {
    try {
        const allDonations = await database.select(['donations.*', 'devices.type', 'devices.condition'])
            .table('donations')
            .innerJoin('devices', 'devices.donations_iddonation', 'donations.iddonation')
            .orderBy('donations.createDate', 'desc')
        const response = [];
        allDonations.forEach(donation => {
            let filtered = allDonations.filter(element => element.iddonation === donation.iddonation);

            if (filtered && filtered.length > 0 && !response.some(e => e.id === filtered[0].iddonation)) {
                let donationData = {
                    "id": donation.iddonation,
                    "name": donation.name,
                    "email": donation.email,
                    "phone": donation.phone,
                    "zip": donation.zip,
                    "city": donation.city,
                    "state": donation.state,
                    "streetAddress": donation.streetAddress,
                    "number": donation.number,
                    "complement": donation.complement,
                    "neighborhood": donation.neighborhood,
                    "deviceCount": donation.deviceCount,
                    "createDate": donation.createDate,
                    "devices": []
                }

                filtered.forEach(donationFiltered => {
                    donationData.devices.push({
                        "type": donationFiltered.type,
                        "condition": donationFiltered.condition
                    })
                })

                response.push(donationData);
            }
        })

        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const donation = async (req, res) => {
    const {name,email,phone,zip,city,state,streetAddress,number,complement,neighborhood,deviceCount,devices} = req.body
    const fields = [name, phone, zip, city, state, streetAddress, number, neighborhood]
    try {
        if (validators.validateField(fields) || !devices || !deviceCount) {
            throw {
                statusCode: 400,
                error: true,
                requiredFiels: ["name", "phone", "zip", "city", "state", "streetAddress", "number", "neighborhood", "deviceCount", "devices"],
                errorMessage: "Todos os campos obrigatórios devem ser informados"
            }
        }
        if (email && !validators.validateEmail(email)) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "O email informado não é válido."
            }
        }

        if (!validators.validatePhone(phone)) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "O telefone informado não é valido."
            }
        }

        if (deviceCount <= 0) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "O valor do deviceCount deve ser maior do que zero."
            }
        }

        if (deviceCount !== devices.length) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: `A quantidade de equipamentos (${deviceCount.toString()}) não está de acordo com as informações de equipamentos enviados (${devices.length.toString()})`
            }
        }

        if (validators.validateDevices(devices)) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "O tipo ou condição do equipamento não é válido."
            }

        }

        const createDonation = await database.insert({
            name: name,
            email: email,
            phone: phone,
            zip: zip,
            city: city,
            state: state,
            streetaddress: streetAddress,
            number: number,
            complement: complement,
            neighborhood: neighborhood,
            deviceCount: deviceCount}).table('donations').returning('iddonation')
        // Guardando ids dos devices cadastrados
        const devicesIds = [];
        for (let device of devices) {
            let createDevice = await database.insert({
                type: device.type,
                condition: device.condition,
                donations_iddonation: createDonation[0]
            }).table('devices').returning('iddevices')
            devicesIds.push(createDevice[0])
        }

        res.status(200).json({
            success: true,
            id_donation: createDonation[0],
            id_devices: devicesIds
        })

    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json(error)
        } else {
            res.status(500).send(error.message)
        }

    }
}


module.exports = {
    statusReturn,
    donation,
    getDonations
}