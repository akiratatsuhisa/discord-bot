export const COMMANDS = {
  HELLO: {
    name: "hello",
    description: "Say hello.",
  },
  COUNTER: {
    name: "counter",
    description: "Initialize counter button.",
    options: [
      {
        name: "number",
        description: "Initial count number",
        type: 4,
        required: true,
      },
    ],
  },
};
