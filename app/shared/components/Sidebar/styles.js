import styled from 'styled-components';
import { Layout, Menu } from 'antd';

export const SidebarContainer = styled.div`
  .sidebar-open {
  }
  .sidebar-close {
    animation-name: close;
    animation-duration: 0.8s;
  }
  @keyframes close {
    0% {
      width: 100% !important;
    }
    25% {
      width: 75% !important;
    }
    50% {
      width: 50% !important;
    }
    75% {
      width: 25% !important;
    }
    100% {
      display: none !important;
    }
  }
`;

export const StyledSidebar = styled(Layout.Sider)`
  background-color: #fff;
  min-width: 300px !important;
  height: 100%;
`;

export const StyledMenu = styled(Menu)`
  height: 100%;
  .ant-menu-item {
    padding: 0 auto;
    margin-top: 8px;
    margin-bottom: 12px;
  }
`;
