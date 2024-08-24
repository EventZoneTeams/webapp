"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventBoardColumn } from "@/types/eventBoard";
import { useSortable } from "@dnd-kit/sortable";
import { Ellipsis, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface ColumnContainerProps {
  column: EventBoardColumn;
  deleteColumn: (id: string) => void;
}

function ColumnContainer(props: ColumnContainerProps) {
  const { column, deleteColumn } = props;

  const [editMode, setEditMode] = useState(false);

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
        className="flex h-[500px] max-h-[500px] w-[16rem] flex-col rounded-md border border-primary bg-white px-4 py-2 opacity-50"
      >
        {/* Column title */}
        <section
          {...attributes}
          {...listeners}
          className="flex min-h-[2.5rem] items-start justify-between"
        >
          <div className="flex items-start gap-2">
            <div className="flex h-[2rem] items-center">
              <p className="flex h-6 w-6 items-start justify-center rounded-sm bg-gray-200 text-xs"></p>
            </div>
            <div className="mt-1">
              <p className="flex items-start font-semibold">{column.name}</p>
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

        <hr />

        {/* Column task container */}
        <section>
          <div className="flex flex-grow">Content</div>
        </section>

        {/* Column footer */}
        <section>
          <div>Footer</div>
        </section>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[16rem] flex-col rounded-md border bg-white px-4 py-2"
    >
      {/* Column title */}
      <section className="flex min-h-[2.5rem] items-start justify-between">
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditMode(true)}
          className="flex w-full items-start gap-3 focus:cursor-grabbing"
        >
          <div className="flex h-[2rem] items-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-xs">
              0
            </p>
          </div>
          <div className="mt-1">
            {!editMode ? (
              <p className="flex items-start font-semibold">{column.name}</p>
            ) : (
              <input
                autoFocus
                className="w-full bg-background px-2 -ml-2"
                defaultValue={column.name}
                onBlur={() => setEditMode(false)}
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

      <hr />

      {/* Column task container */}
      <section>
        <div className="flex flex-grow">Content</div>
      </section>

      {/* Column footer */}
      <section>
        <div>Footer</div>
      </section>
    </div>
  );
}

export default ColumnContainer;
