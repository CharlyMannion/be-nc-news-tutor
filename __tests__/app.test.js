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
  });

  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        it("status 200: responds with status 200", () => {
          return request(app).get("/api/topics").expect(200);
        });
        it("returns status 200 and an object containing an array of topics", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics).toHaveLength(3);
              expect(Object.keys(topics[0])).toEqual(
                expect.arrayContaining(["description", "slug"])
              );
            });
        });
      });

      describe("POST", () => {
        it("status: 201: responds with status 201", () => {
          return request(app)
            .post("/api/topics")
            .send({ slug: "test", description: "I'm a test" })
            .expect(201);
        });
        it("status: 201: responds with newly posted topic", () => {
          return request(app)
            .post("/api/topics")
            .send({ slug: "test", description: "I'm a test" })
            .expect(201)
            .then(({ body: { topic } }) => {
              expect(topic).toEqual({
                slug: "test",
                description: "I'm a test",
              });
            });
        });
        it("status 400: for missing slug", () => {
          return request(app)
            .post("/api/topics")
            .send({ description: "I'm a test" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request.");
            });
        });
        it("status 400: for failing schema validation (not a unique slug)", () => {
          return request(app)
            .post("/api/topics")
            .send({ slug: "cats", description: "Not dogs" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request.");
            });
        });
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
      });

      describe("INVALID METHODS", () => {
        it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
          const invalidMethods = ["delete", "patch", "put"];

          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/topics")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).toBe("Method Not Allowed.");
              });
          });
          return Promise.all(promises);
        });
      });
    });

    // COME BACK TO -> EXTENSION TASK
    describe("/users", () => {
      describe("GET", () => {});
    });

    describe("/users/:username", () => {
      describe("GET", () => {
        it("status 200: responds with status 200", () => {
          return request(app).get("/api/users/icellusedkars").expect(200);
        });
        it("status 200: responds with an object with the correct keys", () => {
          return request(app)
            .get("/api/users/icellusedkars")
            .expect(200)
            .then(({ body: { user } }) => {
              expect(Object.keys(user)).toEqual(
                expect.arrayContaining(["username", "name", "avatar_url"])
              );
            });
        });
        it("status 404: user not found", () => {
          return request(app)
            .get("/api/users/notauser")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("User not found.");
            });
        });
      });

      describe("INVALID METHODS", () => {
        it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
          const invalidMethods = ["post", "delete", "patch", "put"];

          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/users/:username")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).toBe("Method Not Allowed.");
              });
          });
          return Promise.all(promises);
        });
      });
    });

    describe("/articles/:article_id", () => {
      describe("DELETE", () => {
        it("status 204: returns 204", () => {
          return request(app)
            .delete("/api/articles/1")
            .expect(204)
        });
        it("status 204: deletes the specified article 204", () => {
            return request(app)
              .delete("/api/articles/1")
              .expect(204)
              .then(() => {
                  return connection('articles').first().where('article_id', "=", 1 )
              })
              .then((article) => {
                  expect(article).toBe(undefined)
              })
          });
      });
    });
  });
});
