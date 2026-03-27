import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold font-heading">Component Example</h2>
      <p className="text-4xl font-bold text-primary">{count}</p>
      <div className="flex gap-2">
        <button
          className={cn("px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors")}
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <button
          className={cn("px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-colors")}
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
