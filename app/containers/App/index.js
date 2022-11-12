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
import ProductLinePage from 'containers/ProductLinePage/Loadable';
import ProductsPage from 'containers/ProductsPage/Loadable';
import ErrorPage from 'shared/components/ErrorPage';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import Header from '../../shared/components/Header';
import Sidebar from '../../shared/components/Sidebar';
import LoginPage from '../LoginPage';

import GlobalStyle from '../../global-styles';
import { normalTheme } from '../../themes/normalTheme';
import { selectAccessToken } from '../LoginPage/selectors';

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
  const accessToken = useSelector(selectAccessToken());
  const webCookie = window.document.cookie.split('=')[1];

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
            component={() =>
              accessToken || webCookie ? (
                <ProductsPage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <ComponentRouter
            exact
            path="/danh-sach-hang-san-pham"
            component={() =>
              accessToken || webCookie ? (
                <ProductLinePage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route path="/login" render={() => <LoginPage />} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
