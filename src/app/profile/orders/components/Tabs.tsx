import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", count: 4 },
    { name: "Pending", count: 1 },
    { name: "Paid", count: 0 },
  ];

  return (
    <main className="">
      <div className="mx-auto">
        <div className="flex space-x-4 mb-6 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab.name ? "bg-secondary-background shadow" : "bg-transparent"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className="font-medium">{tab.name}</span>
              {/* <span className="ml-2 text-sm text-gray-500">{tab.count}</span> */}
            </button>
          ))}
        </div>
        {/* Your existing code for displaying orders */}
      </div>
    </main>
  );
}
