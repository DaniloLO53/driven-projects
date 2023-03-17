import React from 'react';
import Sugestao from './Sugestao';

function Sugestoes() {
  const suggestionInfo = [
    {
      name: 'bad.vibes.memes',
      status: 'Segue você',
    },
    {
      name: 'chibirdart',
      status: 'Segue você',
    },
    {
      name: 'razoesparaacreditar',
      status: 'Novo no Instagram',
    },
    {
      name: 'adorable_animals',
      status: '',
    },
    {
      name: 'smallcutecats',
      status: 'Segue você',
    },
  ];

  const suggestions = suggestionInfo.map(({ name, status }, index) => (
    <Sugestao
      name={name}
      status={status}
      index={index}
      key={name}
    />
  ));

  return (
    <div>
      <div className="sugestoes">
        <div className="titulo">
          Sugestões para você
          <div>Ver tudo</div>
        </div>
        {suggestions}
      </div>
    </div>
  );
}

export default Sugestoes;
