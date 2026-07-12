import React from 'react';
import { renderToString } from 'react-dom/server';
import { Routes, Route, Navigate, MemoryRouter } from 'react-router-dom';

const App = () => (
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      {true ? (
        <Route path="/" element={<div>True</div>} />
      ) : (
        <Route path="/" element={<div>False</div>} />
      )}
    </Routes>
  </MemoryRouter>
);

try {
  const html = renderToString(<App />);
  console.log("SUCCESS:", html);
} catch (e) {
  console.error("REACT RUNTIME ERROR:", e);
}
