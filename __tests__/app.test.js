const request = require("supertest")
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => {
    return connection.seed.run();
})

afterAll(() => {
    return connection.destroy();
})

describe("app", () => {
    it("status: 404 for invalid path", () => {
        return request(app)
            .get("/invalid-path")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Oopsie, Path Not Found!");
            })
    })

    describe("/api", () => {
        describe("/topics", () => {
            describe("GET", () => {
                it("status 200: responds with status 200", () => {
                    return request(app).get("/api/topics").expect(200);
                })
                it('returns status 200 and an object containing an array of topics', () => {
                    return request(app)
                      .get('/api/topics')
                      .expect(200)
                      .then(({ body: { topics } }) => {
                        expect(topics).toHaveLength(3);
                        expect(Object.keys(topics[0])).toEqual(
                          expect.arrayContaining(['description', 'slug'])
                        )
                      })
                  })
            })

            describe("POST",()=>{
                it("status: 201: responds with status 201",()=>{
                    return request(app)
                        .post('/api/topics')
                        .send({slug:"test", description:"I'm a test"})
                        .expect(201)
                })
                it("status: 201: responds with newly posted topic",()=>{
                    return request(app)
                        .post('/api/topics')
                        .send({slug:"test", description:"I'm a test"})
                        .expect(201)
                        .then(({body:{topic}})=>{
                            expect(topic).toEqual({slug:"test", description:"I'm a test"})
                        })
                })
                it("status 400: for missing slug",() =>{
                    return request(app)
                    .post('/api/topics')
                    .send({description:"I'm a test"})
                    .expect(400)
                    .then(({body:{msg}})=>{
                        expect(msg).toBe("Bad request.")
                    })
                })
                it("status 400: for failing schema validation (not a unique slug)",() =>{
                    return request(app)
                    .post('/api/topics')
                    .send({slug: "cats", description:"Not dogs"})
                    .expect(400)
                    .then(({body:{msg}})=>{
                        expect(msg).toBe("Bad request.")
                    })
                })
                // it("status 400: for incorrect data type",() =>{
                //     return request(app)
                //     .post('/api/topics')
                //     .send({slug: 5, description: 4})
                //     .expect(400)
                //     .then(({body:{msg}})=>{
                //         expect(msg).toBe("Bad request.")
                //     })
                // })
                // it("status 400: for additional fields",() =>{
                //     return request(app)
                //     .post('/api/topics')
                //     .send({slug:"test", description:"I'm a test", im_a_test:"I'm a test"})
                //     .expect(400)
                //     .then(({body:{msg}})=>{
                //         expect(msg).toBe("Bad request.")
                //     })
                // })
            })
            describe("INVALID METHODS", () => {
                it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
                    const invalidMethods = ["delete", "patch", "put"];

                    const promises = invalidMethods.map((method) => {
                        return request(app)[method]("/api/topics")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).toBe("Method Not Allowed.");
                            });
                    });
                    return Promise.all(promises);
                })
            })
        })
    })
})