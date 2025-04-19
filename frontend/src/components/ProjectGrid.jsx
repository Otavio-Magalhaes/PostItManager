import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="text-center text-[#3a3a3a] font-serif mt-10">
        Você ainda não criou nenhum projeto.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
