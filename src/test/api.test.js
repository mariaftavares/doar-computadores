const request = require("supertest");
const app = require("../app");


describe("API test", () => {
   

    test("GET /", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0)
                expect(res.body).toEqual(expect.objectContaining({"alive": true}))
            })
            .end((err, res) => {
                if (err) return done(err);
                console.log(`Resposta da rota ${res.text}`)
                return done();
            });
    })
})