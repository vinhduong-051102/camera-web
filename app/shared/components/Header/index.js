import React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { REDUX_KEY } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { StyledPageHeader, StyledButtonLogin } from './styled';
import * as actions from './actions';
import reducer from './reducer';

const Header = () => {
  const history = useHistory();
  const key = REDUX_KEY.sidebar;
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [_isOpenSidebar, setIsOpenSidebar] = React.useState(true);
  const handleSidebar = () => {
    setIsOpenSidebar(prev => {
      const result = !prev;
      if (result) {
        dispatch(actions.closeSidebar());
      } else {
        dispatch(actions.openSidebar());
      }
      return result;
    });
  };
  const handleLogin = () => {
    history.push('/login');
  };
  return (
    <StyledPageHeader
      title="Camera"
      onBack={handleSidebar}
      extra={
        <StyledButtonLogin onClick={handleLogin}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="login-icon"
            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12.1197 12.78C12.0497 12.77 11.9597 12.77 11.8797 12.78C10.1197 12.72 8.71973 11.28 8.71973 9.51C8.71973 7.7 10.1797 6.23 11.9997 6.23C13.8097 6.23 15.2797 7.7 15.2797 9.51C15.2697 11.28 13.8797 12.72 12.1197 12.78Z' stroke='%23DD281F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M18.7398 19.38C16.9598 21.01 14.5998 22 11.9998 22C9.39977 22 7.03977 21.01 5.25977 19.38C5.35977 18.44 5.95977 17.52 7.02977 16.8C9.76977 14.98 14.2498 14.98 16.9698 16.8C18.0398 17.52 18.6398 18.44 18.7398 19.38Z' stroke='%23DD281F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3Cpath d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke='%23DD281F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3C/svg%3E"
          />
        </StyledButtonLogin>
      }
      backIcon={<MenuOutlined />}
    />
  );
};

export default Header;
