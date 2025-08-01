// Componente específico para YOOX (SITE_ID=yoox)
import React from 'react';
import './ExampleComponent';

export const ExampleComponent: React.FC = () => {
  return (
    <div className="example-component example-component--yoox">
      <h2>YOOX Component</h2>
      <p>Este componente se renderiza cuando SITE_ID=yoox</p>
      <div className="yoox-specific-feature">
        <span>Característica específica de YOOX</span>
      </div>
    </div>
  );
};
