import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardCard({ board }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/${board.id}`);
  };

  return (
    <div 
    className="rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer hover:bg-[#e0c6a8] hover:border-[#A17D5E] hover:border-1"
    onClick={handleClick}
    >
      <h3 className="text-xl font-serif mb-2">{board.title}</h3>
      <p className="text-sm text-gray-600">{board.description}</p>
    </div>
  );
}
