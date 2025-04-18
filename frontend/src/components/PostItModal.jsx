import React, { useState } from "react";

const PALETA_CORES = ["#F5E6C8", "#EBD9B4", "#BFD8AF", "#A7C7E7", "#E8A0BF"];

export default function PostItModal({ postIt = {}, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(postIt.title || "");
  const [description, setDescription] = useState(postIt.description || "");
  const [color, setColor] = useState(postIt.color || PALETA_CORES[0]);
  const [status, setStatus] = useState(postIt.status || "pendente");

  // Estados para erros
  const [errors, setErrors] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos
    let newErrors = { title: "", description: "" };

    if (title.length < 5 || title.length > 32) {
      newErrors.title = "O título deve ter entre 5 e 32 caracteres.";
    }

    if (description.length < 5 || description.length > 300) {
      newErrors.description = "A descrição deve ter entre 5 e 300 caracteres.";
    }

    // Se houver erro, não submeter
    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    // Salvar e fechar modal
    onSave({ ...postIt, title, description, color, status});
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Criar/Editar Post-It</h2>
        <form onSubmit={handleSubmit}>
          {/* Input Título */}
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "" }); // Limpa erro ao digitar
            }}
            className={`w-full border p-2 mb-1 rounded ${
              errors.title ? "border-red-500" : ""
            }`}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: "" }); // Limpa erro ao digitar
            }}
            className={`w-full border p-2 mb-1 rounded ${
              errors.description ? "border-red-500" : ""
            }`}
            required
          />
          {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

          {/* Seletor de cores */}
          <div className="mb-2">
            <p className="text-sm mb-1">Escolha uma cor:</p>
            <div className="flex gap-2">
              {PALETA_CORES.map((cor) => (
                <button
                  key={cor}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === cor ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: cor }}
                  onClick={() => setColor(cor)}
                />
              ))}
            </div>
          </div>

          {/* Seletor de status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          >
            <option value="pendente">Pendente</option>
            <option value="concluido">Concluído</option>
          </select>

          {/* Botões */}
          <div className="flex justify-around">
            <button ype="button" onClick={onDelete} className="p-2 bg-red-500 text-white rounded">
              Deletar
            </button>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="p-2 bg-gray-500 text-white rounded">
                Cancelar
              </button>
              <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
