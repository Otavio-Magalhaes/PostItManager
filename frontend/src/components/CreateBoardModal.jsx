import React, { useEffect, useState } from "react";

export default function CreateBoardModal({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) throw new Error("Erro ao buscar Projetos");

        const data = await response.json();
        const mappedProjects = data.map(project => ({
          id: project._id,
          title: project.title,
          description: project.description
        }));

        setProjects(mappedProjects);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/boards",{
      headers:{
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        project: formData.projectId
      })

    });

    if(!response.ok) throw new Error("Erro ao criar Board")

    const savedBoard = await response.json()

    console.log(savedBoard)

    console.log("Dados do novo board:", formData);
    onClose()
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#F6E7D8] rounded-xl shadow-lg p-6 w-[90%] max-w-md border border-[#A17D5E] relative">
        <h2 className="text-2xl font-bold mb-4 text-[#3a3a3a] font-serif">Criar Novo Quadro</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#3a3a3a] font-medium">Nome do Quadro</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#3a3a3a] font-medium">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-[#3a3a3a] font-medium">Projeto Vinculado</label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>Selecione um projeto</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7f833a] text-white rounded hover:bg-[#656834]"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
