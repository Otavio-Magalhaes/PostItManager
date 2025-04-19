import React, { useEffect, useState } from 'react';
import BoardCard from './BoardCard';

export default function BoardGrid() {
  const [boards, setBoards] = useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/boards", {
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        if (!response.ok) throw new Error("Erro ao buscar Boards");

        const data = await response.json();

        const mappedBoards = data.map(board => ({
          id: board._id,
          title: board.title,
          description: board.description,
          project: board.project,
        }));

        setBoards(mappedBoards);

      } catch (err) {
        setError("Ocorreu um erro ao carregar os boards.");
        console.error("Erro ao carregar boards:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (isLoading) {
    return <div className="text-center p-6 text-[#3a3a3a] font-serif">Carregando boards...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-[#3a3a3a] font-serif mt-10">
        {error}
      </div>
    );
  }
if (!isLoading && boards.length === 0) {
  return (
    <div className="text-center text-[#3a3a3a] font-serif mt-10">
      Você ainda não criou nenhum board.
    </div>
  );
 }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
      {boards.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}
