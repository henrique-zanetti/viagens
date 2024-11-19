import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [historico, setHistorico] = useState(() => {
    const savedHistorico = localStorage.getItem('historico');
    return savedHistorico ? JSON.parse(savedHistorico) : [];
  });

  const handleAddHistorico = () => {
    if (local.trim() === '' || data.trim() === '') return;
    const novoRegistro = {
      id: Date.now(),
      local: local,
      data: data,
    };
    const updatedHistorico = [...historico, novoRegistro];
    setHistorico(updatedHistorico);
    localStorage.setItem('historico', JSON.stringify(updatedHistorico));
    setLocal('');
    setData('');
  };

  const handleRemoveRegistro = (id) => {
    const updatedHistorico = historico.filter(registro => registro.id !== id);
    setHistorico(updatedHistorico);
    localStorage.setItem('historico', JSON.stringify(updatedHistorico));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Histórico de Viagem</h1>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Local da Viagem"
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button onClick={handleAddHistorico} className="add-btn">Adicionar Registro</button>
        </div>
        <div className="historico-container">
          {historico.length === 0 ? (
            <p>Sem registros</p>
          ) : (
            historico.map((registro) => (
              <div key={registro.id} className="registro">
                <p>Local: {registro.local}</p>
                <p>Data: {registro.data}</p>
                <button onClick={() => handleRemoveRegistro(registro.id)} className="remove-btn">Remover</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
