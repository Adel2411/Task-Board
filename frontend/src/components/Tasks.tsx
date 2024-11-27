import { tasksProps } from "@/types";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks, setTasks, isOwner }: tasksProps) => {
  return (
    <ul className="py-8 w-[95%] sm:w-[80%] lg:w-[60%] min-h-fit flex flex-col gap-3">
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
