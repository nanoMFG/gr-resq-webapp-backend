const dynamoose = require("../config/db");

const Cat = dynamoose.model(
  "Cat",
  new dynamoose.Schema({ id: Number, fname: String })
);

const create = async () => {
  try {
    await Cat.create({
      id: 1,
      fname: "meow",
    });
  } catch (e) {
    console.log(e);
  }
};

const read = async () => {
  try {
    const data = await Cat.get({ id: 1 });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

// create();
read();
