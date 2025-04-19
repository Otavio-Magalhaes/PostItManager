import React, { useState } from 'react';

export default function CreateProjectModal({ onClose, setProjects }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) throw new Error("Erro ao criar projeto");

      const newProject = await response.json();

      setProjects(prev => [
        ...prev,
        {
          id: newProject._id,
          title: newProject.title,
          description: newProject.description,
        }
      ]);

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#F6E7D8] rounded-xl shadow-lg p-6 w-[90%] max-w-md border border-[#A17D5E] relative">
        <h2 className="text-2xl font-bold mb-4 text-[#3a3a3a] font-serif">Criar Novo Projeto</h2>
        
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-[#3a3a3a] font-medium">Nome do Projeto</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#3a3a3a] font-medium">Descrição</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
