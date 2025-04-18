import React, { useEffect, useState } from 'react';
import BoardCard from './BoardCard';

export default function BoardGrid() {
  const [boards, setBoards] = useState([])  
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
        console.error("Erro ao carregar boards:", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
      {boards.map(board => (
        <BoardCard key={board.id} board={board} />
        
      ))}
    </div>
  );
}
