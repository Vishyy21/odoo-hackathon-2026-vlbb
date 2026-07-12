import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { GlobalLayout } from './src/components/layout/global-layout.tsx';

try {
  const html = renderToString(
    <MemoryRouter initialEntries={['/']}>
      <GlobalLayout />
    </MemoryRouter>
  );
  console.log("SUCCESS:", html.substring(0, 100));
} catch (e) {
  console.error("REACT RUNTIME ERROR:", e);
}
