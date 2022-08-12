const app = require("../app");
const request = require("supertest")
const db = require('../database/config')
describe("Suite de testes de institutions", () => {
    afterAll(async() => {
        // Closing the DB connection allows Jest to exit successfully.
        await db.destroy()
      })
    test("POST /institution enviado com campos faltando (city)", (done) => {
        request(app)
            .post("/institution")
            .expect("Content-Type", /json/)
            .send({
                name: "Paula",
                email: "paula1236@gmail.com",
                phone: "32998325220",
                zip: "36012-350",
                state: "minas gerais",
                streetAddress: "Rua 123",
                number: "2263",
                neighborhood: "São Mateus",
                complement:"apt 402",
                description:"alguma description",
                type:"socialedtech"
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
    test("POST /institution enviando email invalido", (done) => {
        request(app)
            .post("/institution")
            .expect("Content-Type", /json/)
            .send({
                name: "Paula",
                email: "paula1236",
                phone: "32998325220",
                zip: "36012-350",
                city: "juiz de fora",
                state: "minas gerais",
                streetAddress: "Rua 123",
                number: "2263",
                neighborhood: "São Mateus",
                complement:"apt 402",
                description:"alguma description",
                type:"socialedtech"

            })
            .expect(400)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
                expect(res.body).toEqual(expect.objectContaining({
                    statusCode: 400,
                    error: true,
                    errorMessage: "O email informado não é válido."
                }))
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
    test("POST /institution enviando type invalido", (done) => {
        request(app)
            .post("/institution")
            .expect("Content-Type", /json/)
            .send({
                name: "Paula",
                email: "paula1236@gmail.io",
                phone: "32998325220",
                zip: "36012-350",
                city: "juiz de fora",
                state: "minas gerais",
                streetAddress: "Rua 123",
                number: "2263",
                neighborhood: "São Mateus",
                complement:"apt 402",
                description:"alguma description",
                type:"some tiype"

            })
            .expect(400)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
                expect(res.body).toEqual(expect.objectContaining({
                    statusCode: 400,
                    error: true,
                    errorMessage: "O type informado não é valido."
                }))
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
    test("POST /institution enviando todos os dados corretamente", (done) => {
        request(app)
            .post("/institution")
            .expect("Content-Type", /json/)
            .send({
                name: "Paula",
                email: "paula1236@gmail.com",
                phone: "32998325220",
                zip: "36012-350",
                city: "juiz de fora",
                state: "minas gerais",
                streetAddress: "Rua 123",
                number: "2263",
                neighborhood: "São Mateus",
                complement:"apt 402",
                description:"alguma description",
                type:"socialedtech"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("sucess")
                expect(res.body.sucess).toBe(true)
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
})



