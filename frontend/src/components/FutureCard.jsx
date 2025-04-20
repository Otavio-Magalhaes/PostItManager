import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#b39b81] border-2 border-[#83723a] rounded-lg p-8 shadow-lg transition-transform hover:scale-105">
      <div className="text-[#61450f] mb-4">{icon}</div>
      <h3 className="text-xl text-[#3C2A21] font-serif mb-2">{title}</h3>
      <p className="font-sans text-[#3C2A21]">{description}</p>
    </div>
  );
}