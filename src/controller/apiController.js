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
    const allDonations = await database
      .select(['donations.*', 'devices.type', 'devices.condition'])
      .table('donations')
      .innerJoin('devices', 'devices.donations_iddonation', 'donations.iddonation')
      .orderBy('donations.iddonation', 'desc')
    const response = []
    allDonations.forEach((donation) => {
      // Filtar todos resultados que possuem o mesmo id
      let filtered = allDonations.filter((element) => element.iddonation === donation.iddonation)

      // valida se existe elementos filtrados e se, caso exista, se ele já foi incluido na resposta
      if (filtered && filtered.length > 0 && !response.some((e) => e.iddonation === filtered[0].iddonation)) {
        let donationData = {
          id: donation.iddonation,
          name: donation.name,
          email: donation.email,
          phone: donation.phone,
          zip: donation.zip,
          city: donation.city,
          state: donation.state,
          streetAddress: donation.streetaddress,
          number: donation.number,
          complement: donation.complement,
          neighborhood: donation.neighborhood,
          deviceCount: donation.deviceCount,
          devices: []
        }

        filtered.forEach((donationFiltered) => {
          donationData.devices.push({
            type: donationFiltered.type,
            condition: donationFiltered.condition
          })
        })

        response.push(donationData)
      }
    })

    if (response.length == 0) {
      return res.status(200).json({ message: 'Nenhuma doação foi realizada ainda' })
    }

    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const donation = async (req, res) => {
  const {
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
    deviceCount,
    devices
  } = req.body
  const fields = [name, phone, zip, city, state, streetAddress, number, neighborhood, devices, deviceCount]
  const validationFiels = validators.validateField(fields)
  try {
    if (validationFiels.length > 0) {
      throw {
        statusCode: 400,
        error: true,
        requiredFields: validationFiels,
        errorMessage: 'Todos os campos obrigatórios devem ser informados'
      }
    }
    if (deviceCount !== devices.length) {
      throw {
        statusCode: 400,
        error: true,
        errorMessage: `A quantidade de equipamentos (${deviceCount.toString()}) não está de acordo com as informações de equipamentos enviados (${devices.length.toString()})`
      }
    }
    if (email && !validators.validateEmail(email)) {
      throw {
        statusCode: 400,
        error: true,
        errorMessage: 'O email informado não é válido.'
      }
    }

    if (!validators.validatePhone(phone)) {
      throw {
        statusCode: 400,
        error: true,
        errorMessage: 'O telefone informado não é valido.'
      }
    }

    if (validators.validateDevices(devices)) {
      throw {
        statusCode: 400,
        error: true,
        errorMessage: 'O tipo ou condição do equipamento não é válido.'
      }
    }
    const createDonation = await database
      .insert({
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
        deviceCount: deviceCount
      })
      .table('donations')
      .returning('iddonation')
    // Guardando ids dos devices cadastrados
    const devicesIds = []
    for (let device of devices) {
      let createDevice = await database
        .insert({
          type: device.type,
          condition: device.condition,
          donations_iddonation: createDonation[0]
        })
        .table('devices')
        .returning('iddevices')
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
