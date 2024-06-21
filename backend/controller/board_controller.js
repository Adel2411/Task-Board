const Board = require("../models/Board");
const Task = require("../models/Task");
// create a default board with 4 tasks when a user is created

exports.createDefaultBoard = async (userId) => {
  console.log("test");
  const board = new Board({
    name: "My Task Board",
    owner: userId,
  });

  await board.save();

  const tasks = [
    {
      title: "Task in Progress",
      board: board._id,
    },
    {
      title: "Task Completed",
      board: board._id,
    },
    {
      title: "Task Won't Do",
      board: board._id,
    },
    {
      title: "Task To Do",
      board: board._id,
    },
  ];
  await Task.insertMany(tasks);
};
