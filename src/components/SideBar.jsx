import React from 'react';
import Sugestoes from './Sugestoes';
import Usuario from './Usuario';

function SideBar(props) {
  const { userName, setUserName } = props;

  return (
    <div>
      <div className="sidebar">
        <Usuario userName={userName} setUserName={setUserName} />
        <Sugestoes />
        <div className="links">
          Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade • Termos
          • Localizações • Contas mais relevantes •
          Hashtags • Idioma
        </div>

        <div className="copyright">
          © 2021 INSTAGRAM DO FACEBOOK
        </div>
      </div>
    </div>
  );
}

export default SideBar;
