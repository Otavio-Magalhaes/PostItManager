import React, { useState } from "react";

const PALETA_CORES = ["#F5E6C8", "#EBD9B4", "#BFD8AF", "#A7C7E7", "#E8A0BF"];

export default function PostItModal({ postIt = {}, onSave, onClose }) {
  const [titulo, setTitulo] = useState(postIt.titulo || "");
  const [descricao, setDescricao] = useState(postIt.descricao || "");
  const [color, setColor] = useState(postIt.color || PALETA_CORES[0]);
  const [status, setStatus] = useState(postIt.status || "pendente");

  // Estados para erros
  const [errors, setErrors] = useState({ titulo: "", descricao: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos
    let newErrors = { titulo: "", descricao: "" };

    if (titulo.length < 5 || titulo.length > 32) {
      newErrors.titulo = "O título deve ter entre 5 e 32 caracteres.";
    }

    if (descricao.length < 5 || descricao.length > 300) {
      newErrors.descricao = "A descrição deve ter entre 5 e 300 caracteres.";
    }

    // Se houver erro, não submeter
    if (newErrors.titulo || newErrors.descricao) {
      setErrors(newErrors);
      return;
    }

    // Salvar e fechar modal
    onSave({ ...postIt, titulo, descricao, color, status});
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
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              setErrors({ ...errors, titulo: "" }); // Limpa erro ao digitar
            }}
            className={`w-full border p-2 mb-1 rounded ${
              errors.titulo ? "border-red-500" : ""
            }`}
            required
          />
          {errors.titulo && <p className="text-red-500 text-sm mb-2">{errors.titulo}</p>}

          {/* Textarea Descrição */}
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
              setErrors({ ...errors, descricao: "" }); // Limpa erro ao digitar
            }}
            className={`w-full border p-2 mb-1 rounded ${
              errors.descricao ? "border-red-500" : ""
            }`}
            required
          />
          {errors.descricao && <p className="text-red-500 text-sm mb-2">{errors.descricao}</p>}

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
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="p-2 bg-gray-500 text-white rounded">
              Cancelar
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
