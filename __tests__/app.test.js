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
        it("status 405: for invalid methods DELETE, PATCH and PUT for /api/topics", () => {
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
        it("status 405: for invalid methods POST DELETE, PATCH and PUT for /users/:username", () => {
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
          return request(app).delete("/api/articles/1").expect(204);
        });
        it("status 204: deletes the specified article 204", () => {
          return request(app)
            .delete("/api/articles/1")
            .expect(204)
            .then(() => {
              return connection("articles").first().where("article_id", "=", 1);
            })
            .then((article) => {
              expect(article).toBe(undefined);
            });
        });
        it("status 400: returns an error if the article path is invalid", () => {
          return request(app)
            .delete("/api/articles/notAnId")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request.");
            });
        });
        it("status 404: returns an error if the article is potentially valid but does not exist yet", () => {
          return request(app)
            .delete("/api/articles/9999")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Article not found.");
            });
        });
      });
      describe("GET", () => {
        it("status 200: responds with status 200", () => {
          return request(app).get("/api/articles/1").expect(200);
        });
        it("status 200: responds with an object with the correct keys", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(Object.keys(article)).toEqual(
                expect.arrayContaining([
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at",
                  "comment_count",
                ])
              );
            });
        });
        it("status 200: responds with the correct article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              const expectedArticle = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100,
                comment_count: "13",
              };
              expect(article).toEqual(expectedArticle);
            });
        });
        it("status 400: BAD REQUEST -> responds with an error message if the article_id is invalid", () => {
          return request(app)
            .get("/api/articles/notAnId")
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe("Bad request.");
            });
        });
        it("status 404: NOT FOUND -> responds with an error message if the requested articles does not exist", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe("Article Not Found.");
            });
        });
      });
      describe("PATCH", () => {
        it("status 200: responds with status 200", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 2 })
            .expect(200);
        });
        it("status 200: responds with the specified article with votes patched with the specified number of votes", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 2 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.votes).toBe(102);
            });
        });
        it("status 200: works for negative numbers", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -2 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.votes).toBe(98);
            });
        });
        it("status 400: BAD REQUEST -> responds with an error message if the article_id is invalid", () => {
          return request(app)
            .patch("/api/articles/notAnId")
            .send({ inc_votes: -2 })
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe("Bad request.");
            });
        });
        it("status 404: NOT FOUND --> responds with an error message if the requested articles does not exist", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: -2 })
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe("Article Not Found.");
            });
        });
        it("status 400: BAD REQUEST -> malformed body responds with an error message when no body", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad Request: malformed/ missing body.");
            });
        });
        it("status 400: BAD REQUEST -> malformed body for additional fields", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({
              inc_votes: 1,
              im_a_test: "I'm a test",
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad Request: malformed/ missing body.");
            });
        });
      });

      describe("INVALID METHODS", () => {
        it("status 405: for invalid methods POST and PUT for /articles/:article_id", () => {
          const invalidMethods = ["post", "put"];

          const promises = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/articles/:article_id")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).toBe("Method Not Allowed.");
              });
          });
          return Promise.all(promises);
        });
      });
    });

    describe("/articles/:article_id/comments", () => {
      describe("GET", () => {
        it("status 200: responds with status 200", () => {
          return request(app).get("/api/articles/1/comments").expect(200);
        });
        it("status 200: returns an object containing array of comments", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(Object.keys(comments[0])).toEqual(
                expect.arrayContaining([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body",
                ])
              );
            });
        });
        it("status 200: returns an object containing an array of comments sorted by created_at in descending order as default", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        it("status 200: returns an object containing an array of comments sorted by created_at in ascending order when query provided", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).toBeSortedBy("created_at", {
                ascending: true,
              });
            });
        });
      });
    });
  });
});
