// Componente específico para MyTheresa (SITE_ID=mytheresa)
import React from 'react';
import './ExampleComponent.scss';

export const ExampleComponent: React.FC = () => {
  return (
    <div className="example-component example-component--mytheresa">
      <h2>MyTheresa Component</h2>
      <p>Este componente se renderiza cuando SITE_ID=mytheresa</p>
      <div className="mytheresa-specific-feature">
        <span>Característica específica de MyTheresa</span>
      </div>
    </div>
  );
};
