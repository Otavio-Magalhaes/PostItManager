import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Sidebar from '../components/SideBar';
import ProjectGrid from '../components/ProjectGrid';
import CreateProjectModal from '../components/CreateProjectModal';
import texture from "../assets/texture.jpg";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [showModalCreateProject, setShowModalCreateProject] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects", {
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        if (!response.ok) throw new Error("Erro ao buscar Projetos");

        const data = await response.json();

        const mappedProjects = data.map(project => ({
          id: project._id,
          title: project.title,
          description: project.description,
        }));

        setProjects(mappedProjects);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10 text-xl font-serif">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#D4B99D] p-6">
        <div
          className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Meus Projetos</h1>
          <button
            className="bg-[#9B786F] text-white font-bold py-2 px-6 rounded-full hover:bg-[#b99d8e] transition"
            onClick={() => setShowModalCreateProject(true)}
          >
            + Novo Projeto
          </button>
        </div>

        <ProjectGrid projects={projects} />
      </main>

      {showModalCreateProject && (
        <CreateProjectModal
          onClose={() => setShowModalCreateProject(false)}
          setProjects={setProjects}
        />
      )}
    </div>
  );
}
