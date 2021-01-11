const { formatTime, createLookUp } = require("../db/utils/data-manipulation");

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

describe('createLookUp', () => {
    it('takes an empty array and returns an empty object', () => {
        const inputArr = [];
        const expected = {};
        const actual = createLookUp(inputArr);
        expect(actual).toEqual(expected);
    })
    it('handles a single comment object', () => {
        const inputArr = [{
            comment_id: 1,
            body:
              'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
            belongs_to: 'Living',
            created_by: 'butter_bridge',
            votes: 14,
            created_at: 1479818163389,
          }];
        const expected = {Living: 1};
        const actual = createLookUp(inputArr);
        expect(actual).toEqual(expected);
    })
    it('handles multiple comment objects', () => {
        const inputArr = [{
            comment_id: 1,
            body:
              'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
            belongs_to: 'Living',
            created_by: 'butter_bridge',
            votes: 14,
            created_at: 1479818163389,
          }, 
          {
          comment_id: 2,
          body:
            'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
          belongs_to: 'Dying',
          created_by: 'butter_bridge',
          votes: 14,
          created_at: 1479818163389,
        }];
        const expected = {Living: 1, Dying: 2};
        const actual = createLookUp(inputArr);
        expect(actual).toEqual(expected);
    })
})

// {
//     body:
//       'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
//     belongs_to: 'Living in the shadow of a great man',
//     created_by: 'butter_bridge',
//     votes: 14,
//     created_at: 1479818163389,
//   },
