import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { EventBoardTask } from "@/types/eventBoard";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: EventBoardTask;
  updateTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
}

function TaskCard({ task, updateTask, deleteTask }: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div>
        <div className="rounded-md bg-gray-200">
          <Textarea
            className="bg-transparent"
            value={task.title}
            autoFocus
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                toggleEditMode();
              }
            }}
            onChange={(e) => {
              updateTask(task.id, e.target.value);
            }}
          ></Textarea>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative rounded-md bg-gray-200 p-[8px] hover:border-2 hover:border-stone-500 hover:p-[6px]"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        <p
          onClick={toggleEditMode}
          className="w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
        >
          {task.title}
        </p>
        {mouseIsOver && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                className="absolute right-0 top-0 h-9 w-9 rounded-full p-2.5"
              >
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{task.title}</DialogTitle>
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
