import React from 'react';
import { FaTasks, FaArrowsAlt, FaSave, FaProjectDiagram, FaClipboardList, FaUsers } from 'react-icons/fa';
import FeatureCard from './FutureCard';

export default function FeaturesSection() {
  return (
    <section className="py-24 pb-32 px-6 sm:px-12  text-center relative" id='features'>
      <h2 className="text-4xl sm:text-5xl font-serif mb-14 text-[#3C2A21] drop-shadow-sm">
        Funcionalidades
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          icon={<FaTasks size={40} />}
          title="Tarefas Ilimitadas"
          description="Crie e gerencie quantas tarefas quiser. Controle total sobre sua produtividade."
        />
        <FeatureCard
          icon={<FaArrowsAlt size={40} />}
          title="Arraste e Solte"
          description="Organize seus post-its com total liberdade pelo quadro."
        />
        <FeatureCard
          icon={<FaSave size={40} />}
          title="Salvamento de dados"
          description="Seus dados são salvos. Nada se perde!"
        />
        <FeatureCard
          icon={<FaProjectDiagram size={40} />}
          title="Projetos Infinitos"
          description="Crie quantos projetos quiser. Cada ideia pode virar um espaço de trabalho próprio."
        />
        <FeatureCard
          icon={<FaClipboardList size={40} />}
          title="Boards por Projeto"
          description="Dentro de cada projeto, organize múltiplos quadros personalizados."
        />
        <FeatureCard
          icon={<FaUsers size={40} />}
          title="Acesso Compartilhado (em breve)"
          description="Em breve será possível convidar pessoas para colaborar nos seus projetos e quadros."
        />
      </div>
    </section>
  );
}