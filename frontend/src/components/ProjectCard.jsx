import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-[#F6E7D8] p-4 rounded-lg shadow-md border border-[#A17D5E] hover:shadow-lg transition cursor-pointer">
      <h3 className="text-xl font-bold text-[#3a3a3a] font-serif">{project.title}</h3>
      <p className="text-[#3a3a3a] mt-2">{project.description}</p>
    </div>
  );
}
