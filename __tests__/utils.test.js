const { formatTime } = require("../db/utils/data-manipulation");

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

// {
//     title: 'Living in the shadow of a great man',
//     topic: 'mitch',
//     author: 'butter_bridge',
//     body: 'I find this existence challenging',
//     created_at: 1542284514171,
//     votes: 100,
//   },
