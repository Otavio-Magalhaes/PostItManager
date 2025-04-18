import React, { useState, useEffect } from "react";
import PostIt from "../components/PostIt";
import PostItModal from "../components/PostItModal";
import texture from "../assets/texture.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function Board() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [postIts, setPostIts] = useState([]);
  const [selectedPostIt, setSelectedPostIt] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postItToDelete, setPostItToDelete] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/board/${boardId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar tarefas");

        const data = await response.json();
        setPostIts(
          data.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
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

    if (user && boardId) fetchTasks();
  }, [user, boardId]);

  const handleAddPostIt = () => {
    setSelectedPostIt({
      title: "",
      description: "",
      color: "#FFD700",
      status: "pendente",
      x: 100,
      y: 100,
    });
  };

  const handleSavePostIt = async (postIt) => {
    try {
      const isEditing = !!postIt.id && typeof postIt.id === "string";

      const response = await fetch(
        isEditing
          ? `http://localhost:3000/api/tasks/${postIt.id}`
          : "http://localhost:3000/api/tasks/",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: postIt.title,
            description: postIt.description,
            status: postIt.status,
            color: postIt.color,
            x: postIt.x,
            y: postIt.y,
            board: boardId,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar post-it");

      const savedTask = await response.json();

      if (isEditing) {
        setPostIts((prev) =>
          prev.map((p) => (p.id === postIt.id ? { ...p, ...postIt } : p))
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

  const handleRequestDelete = (postIt) => {
    setPostItToDelete(postIt);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!postItToDelete) return;
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${postItToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao deletar post-it");

      setPostIts((prev) => prev.filter((p) => p.id !== postItToDelete.id));
      setSelectedPostIt(null);
    } catch (error) {
      console.error("Erro ao deletar post-it:", error);
    } finally {
      setPostItToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setPostItToDelete(null);
    setShowDeleteConfirm(false);
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
        <div
          className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>

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

        {postIts.map((postIt) => (
          <PostIt
            key={postIt.id}
            data={postIt}
            onClick={() => setSelectedPostIt(postIt)}
            onDragStart={handleDragStart}
          />
        ))}

        {selectedPostIt !== null && (
          <PostItModal
            postIt={selectedPostIt}
            onSave={handleSavePostIt}
            onClose={() => setSelectedPostIt(null)}
            onDelete={() => handleRequestDelete(selectedPostIt)}
          />

        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4">
              <h2 className="text-xl font-semibold">Deseja realmente deletar este post-it?</h2>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sim, deletar
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
