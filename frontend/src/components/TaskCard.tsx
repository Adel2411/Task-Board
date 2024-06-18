import { taskCardProps } from "@/types";

const TaskCard = ({ task }: taskCardProps) => {
  return (
    <li key={task._id} className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="font-semibold text-lg">{task.title}</h1>
      <p className="opacity-50">{task.description}</p>
    </li>
  );
};

export default TaskCard;
