import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className=" p-4 rounded-lg shadow-md bg-[#b39b81] border-2 border-[#83723a] hover:shadow-lg hover:bg-[#e0c6a8] hover:border-[#A17D5E] hover:border-1 transition cursor-pointer">
      <h3 className="text-xl font-bold text-[#3a3a3a] font-serif">{project.title}</h3>
      <p className="text-[#3a3a3a] mt-2">{project.description}</p>
    </div>
  );
}
