/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import ErrorPage from 'shared/components/ErrorPage';
import { Layout } from 'antd';
import Header from '../../shared/components/Header';
import Sidebar from '../../shared/components/Sidebar';
import LoginPage from '../LoginPage';

import GlobalStyle from '../../global-styles';
import { normalTheme } from '../../themes/normalTheme';

// eslint-disable-next-line react/prop-types
const ComponentRouter = ({ component: Component }) => {
  const { Content } = Layout;
  return (
    <Route
      render={() => (
        <Layout
          style={{
            height: '100%',
            backgroundColor: '#FFFFFF',
            width: '100vw',
            overflow: 'hidden',
          }}
        >
          <Header />
          <Layout>
            <Sidebar />
            <Content>
              <Component />
            </Content>
          </Layout>
        </Layout>
      )}
    />
  );
};

export default function App() {
  return (
    <ThemeProvider theme={normalTheme}>
      <>
        <Switch>
          <ComponentRouter
            exact
            path="/"
            component={() => <Redirect to="/danh-sach-san-pham" />}
          />
          <ComponentRouter
            exact
            path="/danh-sach-san-pham"
            component={HomePage}
          />
          <ComponentRouter
            exact
            path="/danh-sach-hang-san-pham"
            component={HomePage}
          />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
