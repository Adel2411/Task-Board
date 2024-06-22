import { tasksProps } from "@/types";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks, setTasks, isOwner }: tasksProps) => {
  return (
    <ul className="w-[95%] sm:w-[80%] lg:w-[60%] h-full flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          setTasks={setTasks}
          isOwner={isOwner}
        />
      ))}
    </ul>
  );
};

export default Tasks;
