import { prettyDOM } from '@testing-library/react';

export function getHtml(container: HTMLElement) {
  return prettyDOM(container, undefined, {
    highlight: false,
  });
}
