export const sampleNotes = [
  {
    id: 1,
    content: "Exploring the beauty of open skies and endless roads. Life is a journey, not a destination.",
    title: "Wanderlust",
    dateTime: "2024-09-24T19:30:59.0511161",
    category: {
      id: 2,
      name: "Public Category",
      accessType: 0,
    },
  },
  {
    id: 3,
    content: "A note to self: Keep going no matter what. Success is just around the corner.",
    title: "Motivation",
    dateTime: "2024-09-17T22:56:10.4904032",
    category: {
      id: 2,
      name: "Public Category",
      accessType: 0,
    },
  },
  {
    id: 1014,
    content: "This is a secret note only meant for me. The deepest thoughts are often unspoken.",
    title: "Hidden Thoughts",
    dateTime: "2024-08-29T14:25:22.1234567",
    category: {
      id: 1021,
      name: "Private Category",
      accessType: 1,
    },
  },
  {
    id: 4,
    content: "Groceries to buy: Milk, Eggs, Bread, Butter, and some veggies for the week.",
    title: "Grocery List",
    dateTime: "2024-09-21T08:30:10.6543210",
    category: {
      id: 1022,
      name: "Daily Tasks",
      accessType: 0,
    },
  },
  {
    id: 5,
    content: "Ideas for my next big project: Innovating with AI in healthcare solutions.",
    title: "Project Ideas",
    dateTime: "2024-09-23T10:00:00.0000000",
    category: {
      id: 2,
      name: "Public Category",
      accessType: 0,
    },
  },
];

export const sampleCategories = [
  {
    id: 2,
    name: "Public Category",
    accessType: 0,
    noteIds: [1, 3, 5],
  },
  {
    id: 1021,
    name: "Private Category",
    accessType: 1,
    noteIds: [1014],
  },
  {
    id: 1022,
    name: "Daily Tasks",
    accessType: 0,
    noteIds: [4],
  },
];
