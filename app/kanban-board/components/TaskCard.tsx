import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EventBoardTask } from "@/types/eventBoard";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: EventBoardTask;
  deleteTask: (id: string) => void;
}

function TaskCard({ task, deleteTask }: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <div>
      <div
        className="relative rounded-md bg-gray-200 p-[8px] hover:border-2 hover:border-stone-500 hover:p-[6px]"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        <div className="flex h-[100px] items-center">{task.title}</div>
        {mouseIsOver && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                className="absolute right-2 top-2 h-8 w-8 rounded-full p-2"
              >
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Button
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                Delete
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
