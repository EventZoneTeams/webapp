import { colors } from "@/app/system-design/constant";
import { cn } from "@/lib/utils";
import React from "react";

const SystemDesign = () => {
  return (
    <div className="container my-5">
      <section>
        <h1 className="text-2xl font-bold">Color</h1>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">Shadcn Ui</h3>
          <div className="flex flex-wrap gap-6">
            {colors.map((color) => (
              <div
                key={color.name}
                className={cn(
                  "line-clamp-1 flex size-24 items-center justify-center rounded border p-4",
                  color.backgroundColorClassName,
                  color.textColorClassName,
                )}
              >
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemDesign;
