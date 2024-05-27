"use client";

import { useTheme } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
  success: "bg-green-800",
  error: "bg-red-800",
  info: "bg-blue-800",
  warning: "bg-orange-800",
  default: "bg-indigo-800",
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme ?? "dark"}
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 rounded-sm justify-between overflow-hidden cursor-pointer my-2"
        }
        bodyClassName={() =>
          "text-sm font-white font-med block p-3 flex item-center "
        }
      />
    </div>
  );
}
