const request = require('supertest')
const app = require('../app')

describe('API test', () => {
  test('GET / ', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
        expect(res.body).toEqual(
          expect.objectContaining({
            alive: true
          })
        )
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviado com campos faltando (city)', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236@gmail.com',
        phone: '32998325220',
        zip: '36012-350',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 1,
        devices: [
          {
            type: 'printer',
            condition: 'working'
          }
        ]
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviando email invalido', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 1,
        devices: [
          {
            type: 'printer',
            condition: 'working'
          }
        ]
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
        expect(res.body).toEqual(
          expect.objectContaining({
            statusCode: 400,
            error: true,
            errorMessage: 'O email informado não é válido.'
          })
        )
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation não enviando devices', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236@gmail.com',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 1
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviando devicesCount diferente da quantidade de devices', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236@gmail.com',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 2,
        devices: [
          {
            type: 'printer',
            condition: 'working'
          }
        ]
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
        expect(res.body).toEqual(
          expect.objectContaining({
            statusCode: 400,
            error: true,
            errorMessage: `A quantidade de equipamentos (2) não está de acordo com as informações de equipamentos enviados (1)`
          })
        )
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviando devices com tipo inválido', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236@gmail.com',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 1,
        devices: [
          {
            type: 'celular',
            condition: 'working'
          }
        ]
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
        expect(res.body).toEqual(
          expect.objectContaining({
            statusCode: 400,
            error: true,
            errorMessage: 'O tipo ou condição do equipamento não é válido.'
          })
        )
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviando todos os dados corretamente', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula1236@gmail.com',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        complement: 'apt 402',
        deviceCount: 1,
        devices: [
          {
            type: 'printer',
            condition: 'working'
          }
        ]
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /donation enviando todos os dados exceto email e complemento(dados não obrigatórios)', (done) => {
    request(app)
      .post('/donation')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        phone: '32998325220',
        zip: '36012-350',
        city: 'juiz de fora',
        state: 'minas gerais',
        streetAddress: 'Rua 123',
        number: '2263',
        neighborhood: 'São Mateus',
        deviceCount: 1,
        devices: [
          {
            type: 'printer',
            condition: 'working'
          }
        ]
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })
})
