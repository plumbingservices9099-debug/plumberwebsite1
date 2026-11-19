import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export function render(pathname: string): string {
  return renderToString(<App initialPath={pathname} />);
}
