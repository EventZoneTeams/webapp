import React from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "guests", label: "Guests" },
  { id: "blasts", label: "Products" },
  { id: "insights", label: "Tickets" },
  { id: "more", label: "More" },
];

export default function EventTabs() {
  return (
    <nav className="rounded-xl bg-background/50 text-gray-300 p-4">
      <ul className="flex space-x-6 border-b border-gray-700">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <a
              href={`#${tab.id}`}
              className="inline-block px-4 py-2 hover:text-white hover:border-b-2 hover:border-white transition duration-200 ease-in-out"
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
