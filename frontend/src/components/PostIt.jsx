import React from "react";

export default function PostIt({ data, onClick, onDragStart }) {
  // Define um limite de caracteres para exibição no post-it
  const MAX_CONTENT_LENGTH = 75;

  // Se o texto for maior que o limite, ele será cortado e receberá "..."
  const truncatedContent =
    data.length > MAX_CONTENT_LENGTH
      ? data.descricao.slice(0, MAX_CONTENT_LENGTH) + "..."
      : data.descricao;

  return (
    <div
      onMouseDown={(e) => onDragStart(e, data.id)}
      onDoubleClick={onClick}
      className="absolute w-50 h-50 p-4 cursor-pointer select-none overflow-hidden text-center"
      style={{
        left: data.x,
        top: data.y,
        backgroundColor: data.color,
        filter: "brightness(0.95) contrast(1.1)",
        borderRadius: "4px",
        fontFamily: "'Patrick Hand', cursive",
        fontSize: "14px",
        color: "#5a4a42",
        lineHeight: "1.2",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Estilização da borda desenhada */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="absolute inset-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="roughPaper">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
        <rect width="100%" height="100%" fill="none" stroke="#5a4a42" strokeWidth="2" filter="url(#roughPaper)" />
      </svg>

      {/* Conteúdo do Post-it */}
      <span className="text-xs mt-2 block italic text-gray-700">
        {data.status === "pendente" ? "🔴 Pendente" : "✅ Concluído"}
      </span>
      <h3 className="font-bold text-lg truncate">{data.titulo}</h3>
      <p className="text-sm overflow-hidden">{truncatedContent}</p>
    </div>
  );
}
