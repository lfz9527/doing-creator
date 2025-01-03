import { createContext, useContext } from 'react';

interface RowContextType {
  cols: number;
  gutter: number;
  getColWidth: (span: number) => string;
  getColSpan: (span: number) => number,
}

export const RowContext = createContext<RowContextType>({
  cols: 24,
  gutter: 8,
  getColWidth: () => '100%',
  getColSpan: () => 24,
});

export const useRowContext = () => useContext(RowContext); 