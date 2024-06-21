import { tasksProps } from "@/types";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks, setTasks }: tasksProps) => {
  return (
    <ul className="py-16 w-[95%] sm:w-[80%] lg:w-[60%] h-full flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
};

export default Tasks;
