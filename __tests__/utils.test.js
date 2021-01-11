const {
  formatTime,
  createLookUp,
  formatComments,
} = require("../db/utils/data-manipulation");

describe("formatTime", () => {
  it("returns an empty array when passed an empty array", () => {
    const actual = formatTime([]);
    expect(actual).toEqual([]);
  });
  it("formats the time of one object in the array", () => {
    const inputArr = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const actual = formatTime(inputArr);
    expect(actual[0].created_at instanceof Date).toBe(true);
  });
  it("formats the time of mutliple objects in an array", () => {
    const inputArr = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const actual = formatTime(inputArr);
    expect(actual[0].created_at instanceof Date).toBe(true);
    expect(actual[1].created_at instanceof Date).toBe(true);
  });
  it("does not mutate the inputed array", () => {
    const inputArr = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const arrCopy = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    formatTime(inputArr);
    expect(inputArr).toEqual(arrCopy);
  });
});

describe("createLookUp", () => {
  it("takes an empty array and returns an empty object", () => {
    const inputArr = [];
    const expected = {};
    const actual = createLookUp(inputArr);
    expect(actual).toEqual(expected);
  });
  it("handles a single comment object", () => {
    const inputArr = [
      {
        article_id: 1,
        title: "Sony",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171,
      },
    ];
    const expected = { Sony: 1 };
    const actual = createLookUp(inputArr);
    expect(actual).toEqual(expected);
  });
  it("handles multiple comment objects", () => {
    const inputArr = [
      {
        article_id: 1,
        title: "Vaio",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171,
      },
      {
        article_id: 2,
        title: "Sony",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171,
      },
    ];
    const expected = { Vaio: 1, Sony: 2 };
    const actual = createLookUp(inputArr);
    expect(actual).toEqual(expected);
  });
});

describe("formatComments", () => {
  it("returns an empty array", () => {
    const actual = formatComments([]);
    expect(actual).toEqual([]);
  });
  it("handles a single comment in the array", () => {
    const comment = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Sony",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const lookUp = { Sony: 1 };
    const actual = formatComments(comment, lookUp);
    expect(actual[0].article_id).toBe(1);
    expect(actual[0].created_at instanceof Date).toBe(true);
    expect(actual[0].author).toBe("butter_bridge");
    expect(actual[0].votes).toBe(14);
    // actual.forEach((element) => {
    //     console.log(element)
    //     expect(element).toHaveProperty("article_id")
    // })
  });
  it("handles mutliple comments in the array", () => {
    const comments = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Sony",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'Living',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389,
      },
    ];
    const lookUp = { Sony: 1, Living: 2 };
    const actual = formatComments(comments, lookUp);
    expect(actual.length).toBe(2)
    actual.forEach((comment) => {
        expect(comment).toHaveProperty("article_id");
        expect(comment).toHaveProperty("author");
        expect(comment.created_at instanceof Date).toBe(true);
        expect(comment).toHaveProperty("votes");
        expect(comment).toHaveProperty("body");
    })
  });
});