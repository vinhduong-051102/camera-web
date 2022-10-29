import styled from 'styled-components';
import { Layout, Menu } from 'antd';

export const StyledSidebar = styled(Layout.Sider)`
  background-color: #fff;
  /* min-width: 300px !important; */
  height: 100%;
  z-index: 1000;
`;

export const StyledMenu = styled(Menu)`
  height: 100%;
  .ant-menu-item {
    padding: 0 auto;
    margin-top: 8px;
    margin-bottom: 12px;
  }
`;
