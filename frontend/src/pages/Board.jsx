import React, { useState, useEffect } from "react";
import PostIt from "../components/PostIt";
import PostItModal from "../components/PostItModal";
import texture from "../assets/texture.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function Board() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postIts, setPostIts] = useState([]);
  const [selectedPostIt, setSelectedPostIt] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Carrega as tasks do backend com token
  useEffect(() => {
    const fetchTasks = async () => {
      try {
  
        const response = await fetch("http://localhost:3000/api/tasks", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // <- ESSENCIAL pra mandar o cookie da sessão
        });

        if (!response.ok) throw new Error("Erro ao buscar tarefas");

        const data = await response.json();
  
        setPostIts(
          data.map((task) => ({
            id: task._id,
            titulo: task.titulo,
            descricao: task.descricao,
            color: task.color || "#FFD700",
            status: task.status ? "concluído" : "pendente",
            x: task.x || 100,
            y: task.y || 100,
          }))
        );
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleAddPostIt = () => {
    setSelectedPostIt({
      id: Date.now(),
      titulo: "",
      descricao: "",
      color: "#FFD700",
      status: "pendente",
      x: 100,
      y: 100,
    });
  };

  const handleSavePostIt = async (postIt) => {
    try {
      const isEditing = !!postIt.id && typeof postIt.id === "string" && !postIt.id.toString().includes("Date");

      console.log(postIt)
const response = await fetch(
  isEditing
    ? `http://localhost:3000/api/tasks/update/${postIt.id}`
    : "http://localhost:3000/api/tasks/create",
  {
    method: isEditing ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      titulo: postIt.titulo,
      descricao: postIt.descricao,
      color: postIt.color,
      status: postIt.status,
      x: postIt.x,
      y: postIt.y,
    }),
  }
);
  
      if (!response.ok) throw new Error("Erro ao salvar post-it");
  
      const savedTask = await response.json();
  
      if (isEditing) {
        // atualiza no estado
        setPostIts((prev) =>
          prev.map((p) =>
            p.id === postIt.id
              ? { ...p, ...postIt } // atualiza o post-it com as novas infos
              : p
          )
        );
      } else {
        const newPostIt = {
          ...postIt,
          id: savedTask._id,
        };
        setPostIts((prev) => [...prev, newPostIt]);
      }
  
      setSelectedPostIt(null);
    } catch (error) {
      console.error("Erro ao salvar post-it:", error);
    }
  };
  

  const handleDragStart = (event, id) => {
    setIsDragging(id);

    const handleMouseMove = (e) => {
      setPostIts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, x: p.x + e.movementX, y: p.y + e.movementY }
            : p
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (!user) {
    return <div className="text-center p-4 text-xl">Carregando...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="relative w-full h-screen bg-[#D4B99D] overflow-hidden flex-1">
        {/* Textura de fundo */}
        <div
          className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>

        {/* Botão de criar post-it */}
        <button
          onClick={handleAddPostIt}
          className="relative w-20 h-20 mt-3 ml-6 flex items-center justify-center cursor-pointer"
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-20 bg-yellow-400 rounded shadow-md"
              style={{
                transform: `rotate(${i * 3 - 5}deg) translate(${i}px, ${i}px)`,
                zIndex: i,
              }}
            />
          ))}
          <div className="absolute w-20 h-20 bg-yellow-400 rounded shadow-md flex items-center justify-center z-10">
            <span className="text-4xl font-bold text-gray-800">+</span>
          </div>
        </button>

        {/* Post-its */}
        {postIts.map((postIt) => (
          <PostIt
            key={postIt.id}
            data={postIt}
            onClick={() => setSelectedPostIt(postIt)}
            onDragStart={handleDragStart}
          />
        ))}

        {/* Modal */}
        {selectedPostIt !== null && (
          <PostItModal
            postIt={selectedPostIt}
            onSave={handleSavePostIt}
            onClose={() => setSelectedPostIt(null)}
          />
        )}
      </div>
    </div>
  );
}
