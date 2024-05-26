"use client";

import { useCounterStore } from "@/app/store/counterStore";
import React from "react";

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
