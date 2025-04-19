import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Sidebar from '../components/SideBar';
import BoardGrid from '../components/BoardGrid';
import texture from "../assets/texture.jpg";
import CreateBoardModal from '../components/CreateBoardModal';


const handleCreateBoard =  () =>{
  setShowModalCreateBoard(true)
}


export default function BoardsPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [showModalCreateBoard, setShowModalCreateBoard] = useState(false)


  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="text-center p-10 text-xl font-serif">Carregando...</div>;
  }



  return (
    <div className="flex min-h-screen">
      <Sidebar />      
      <main className="flex-1 bg-[#D4B99D] p-6 ">
        <div
          className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Meus Quadros</h1>
          <button 
            className="bg-[#9B786F] text-white font-bold py-2 px-6 rounded-full hover:bg-[#b99d8e] transition cursor-pointer" 
            onClick={()=> setShowModalCreateBoard(true)}
          >
            + Novo Board
          </button>
        </div>
        <BoardGrid />
      </main>
      {showModalCreateBoard && (
        <CreateBoardModal onClose={() => setShowModalCreateBoard(false)} />
      )}
    </div>
  );
}
