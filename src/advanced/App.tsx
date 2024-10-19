import RootProvider from '@advanced/provider/RootProvider';
import Cart from '@templates/Cart';
import React from 'react';

const App: React.FC = () => {
  return (
    <RootProvider>
      <div className="bg-gray-100 p-8" data-testid="app">
        <Cart />
      </div>
    </RootProvider>
  );
};

export default App;
