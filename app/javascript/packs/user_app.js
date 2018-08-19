/* eslint no-console:0 */

import React from 'react';
import { render } from 'react-dom';
import Root from '../user_app/Root';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('user-app-root');
  render(<Root />, container);
});
