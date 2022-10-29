import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, StyledFormItem, StyledButton, StyledForm } from './styles';
import { login } from './actions';
import { REDUX_KEY } from '../../utils/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.selectAccessToken());
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const key = REDUX_KEY.loginPage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const handleInputUserName = e => {
    setUserName(e.target.value);
  };

  const handleInputPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = values => {
    // console.log(values);
    dispatch(login(values));
  };
  React.useEffect(() => {
    if (accessToken !== '') {
      history.push('/');
      document.cookie = `access_token="${accessToken}"`;
    }
  }, [accessToken]);
  return (
    <Container>
      <StyledForm
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ margin: 'auto', width: 640 }}
        onFinish={handleSubmit}
      >
        <Form.Item>
          <img
            src="http://10.2.22.166:1234/9bdf5721f911a8e92a765052930fbf77.svg"
            alt=""
          />
        </Form.Item>
        <StyledFormItem
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng !' }]}
        >
          <Input value={username} onChange={handleInputUserName} />
        </StyledFormItem>

        <StyledFormItem
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật !' }]}
        >
          <Input.Password value={password} onChange={handleInputPassword} />
        </StyledFormItem>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 24 }}
        >
          <Checkbox>Duy trì đăng nhập</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <StyledButton type="primary" htmlType="submit">
            Đăng nhập
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
