// Componente base - se usa cuando no hay SITE_ID o no existe archivo específico
import React from 'react';
import './ExampleComponent.scss';

export const ExampleComponent: React.FC = () => {
  return (
    <div className="example-component">
      <h2>Base Component</h2>
      <p>Este es el componente base que se renderiza por defecto</p>
    </div>
  );
};
