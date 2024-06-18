import { tasksProps } from "@/types";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks }: tasksProps) => {
  return (
    <ul className="w-full h-full flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default Tasks;
