const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => {
    return connection.seed.run();
});

afterAll(() => {
    return connection.destroy();
});

describe("app", () => {
    it("status: 404 for invalid path", () => {
        return request(app)
            .get("/invalid-path")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Oopsie, Path Not Found!");
            });
    })

    describe("/api", () => {
        describe("/topics", () => {
            describe("GET", () => {
                it("status 200: responds with status 200", () => {
                    return request(app).get("/api/topics").expect(200);
                });
                it('returns status 200 and an object containing an array of topics', () => {
                    return request(app)
                      .get('/api/topics')
                      .expect(200)
                      .then(({ body: { topics } }) => {
                        expect(topics).toHaveLength(3);
                        expect(Object.keys(topics[0])).toEqual(
                          expect.arrayContaining(['description', 'slug'])
                        );
                      });
                  });
            });
        });
    });
});