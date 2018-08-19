/* eslint no-console:0 */

import React from 'react';
import { render } from 'react-dom';
import Root from '../app/Root';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app-root');
  render(<Root />, container);
});
