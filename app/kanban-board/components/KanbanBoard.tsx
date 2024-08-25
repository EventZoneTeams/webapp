"use client";

import { Button } from "@/components/ui/button";
import { EventBoardColumn, EventBoardTask } from "@/types/eventBoard";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<EventBoardColumn[]>([]);
  const [tasks, setTasks] = useState<EventBoardTask[]>([]);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns],
  );
  const [activeColumn, setActiveColumn] = useState<EventBoardColumn | null>(
    null,
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  console.log(columns);

  const createColumn = () => {
    const newColumn: EventBoardColumn = {
      id: Math.random().toString(36).substring(7),
      name: `Column ${columns.length + 1}`,
      color: null,
      eventBoardTasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: string) => {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);
  };

  const updateColumn = (id: string, name: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, name };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const createTask = (columnId: string) => {
    const newTask: EventBoardTask = {
      id: Math.random().toString(36).substring(7),
      columnId,
      title: `Task ${tasks.length + 1}`,
      description: "",
      dueDate: "",
      priority: null,
      eventBoardTaskAssignments: [],
      eventBoardTaskLabels: [],
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId !== overColumnId) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (column) => column.id === activeColumnId,
        );
        const overColumnIndex = columns.findIndex(
          (column) => column.id === overColumnId,
        );

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="ml-10 mt-10 flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <div key={column.id}>
                  <ColumnContainer
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                    deleteTask={deleteTask}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <Button
            className="flex w-[16rem] items-center justify-start gap-2"
            variant={"outline"}
            onClick={createColumn}
          >
            <Plus size={20} />
            Add another list
          </Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
