import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventBoardColumn, EventBoardTask } from "@/types/eventBoard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Ellipsis, Plus, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface ColumnContainerProps {
  column: EventBoardColumn;
  updateColumn: (id: string, name: string) => void;
  deleteColumn: (id: string) => void;
  tasks: EventBoardTask[];
  createTask: (columnId: string) => void;
  updateTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
}

function ColumnContainer({
  column,
  updateColumn,
  deleteColumn,
  tasks,
  createTask,
  updateTask,
  deleteTask,
}: ColumnContainerProps) {
  const [editMode, setEditMode] = useState(false);

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex max-h-[500px] w-[18rem] flex-col rounded-md border border-primary bg-white px-4 py-2 opacity-50"
      >
        {/* Column title */}
        <section className="flex min-h-[2.5rem] items-start justify-between">
          <div
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
            className="flex w-[13.5rem] items-start gap-3"
          >
            <div className="flex h-[2rem] items-center">
              <p className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-xs">
                0
              </p>
            </div>
            <div className="mt-1 w-full">
              {!editMode ? (
                <p className="flex w-full items-start overflow-hidden text-ellipsis font-semibold">
                  {column.name}
                </p>
              ) : (
                <input
                  autoFocus
                  className="-ml-2 w-full overflow-hidden text-ellipsis bg-background px-2 font-semibold"
                  value={column.name}
                  onBlur={() => setEditMode(false)}
                  onChange={(e) => updateColumn(column.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape")
                      setEditMode(false);
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex h-[2rem] items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 px-2" variant="ghost">
                  <Ellipsis size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>List actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => deleteColumn(column.id)}
                  className="cursor-pointer gap-2"
                >
                  <Trash2 size={20} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Column task container */}
        <section className="flex flex-grow">
          <div className="flex w-full flex-col gap-4 overflow-auto">
            <SortableContext items={tasksId}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
        </section>

        {/* Column footer */}
        <section>
          <div>
            <Button
              onClick={() => createTask(column.id)}
              className="mt-2 flex w-[16rem] items-center justify-start gap-2"
              variant={"ghost"}
            >
              <Plus size={20} />
              Add a card
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex max-h-[500px] w-[18rem] flex-col rounded-md border bg-white px-4 py-2"
    >
      {/* Column title */}
      <section className="flex min-h-[2.5rem] items-start justify-between">
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditMode(true)}
          className="flex w-[13.5rem] items-start gap-3"
        >
          <div className="flex h-[2rem] items-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-xs">
              {tasks.filter((task) => task.columnId === column.id).length}
            </p>
          </div>
          <div className="mt-1 w-full">
            {!editMode ? (
              <p className="flex w-full items-start overflow-hidden text-ellipsis font-semibold">
                {column.name}
              </p>
            ) : (
              <input
                autoFocus
                className="-ml-2 w-full overflow-hidden text-ellipsis bg-background px-2 font-semibold"
                value={column.name}
                onBlur={() => setEditMode(false)}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape")
                    setEditMode(false);
                }}
              />
            )}
          </div>
        </div>

        <div className="flex h-[2rem] items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 px-2" variant="ghost">
                <Ellipsis size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>List actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => deleteColumn(column.id)}
                className="cursor-pointer gap-2"
              >
                <Trash2 size={20} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Column task container */}
      <section className="flex flex-grow">
        <div className="flex w-full flex-col gap-4 overflow-auto">
          <SortableContext items={tasks}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>
      </section>

      {/* Column footer */}
      <section>
        <div>
          <Button
            onClick={() => createTask(column.id)}
            className="mt-2 flex w-[16rem] items-center justify-start gap-2"
            variant={"ghost"}
          >
            <Plus size={20} />
            Add a card
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ColumnContainer;
