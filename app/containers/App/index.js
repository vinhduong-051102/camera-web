/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import ErrorPage from 'shared/components/ErrorPage';

import GlobalStyle from '../../global-styles';
import { normalTheme } from '../../themes/normalTheme';
import { darkTheme } from '../../themes/darkTheme';

export default function App() {
  return (
    <ThemeProvider theme={normalTheme}>
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
