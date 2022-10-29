import React from 'react';
import { useSelector } from 'react-redux';
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Form, Input, Modal, Button, Tooltip } from 'antd';
import {
  Container,
  StyledTable,
  StyledInput,
  StyledButton,
  StyledSpanButton,
} from './styles';
import * as selectors from '../../shared/components/Sidebar/selectors';

const HomePage = () => {
  const [form] = Form.useForm();
  const rawData = useSelector(selectors.selectData());
  const [tableData, setTableData] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Ảnh',
      dataIndex: 'imagePath',
      render: imagePath => (
        <img style={{ width: 100, height: 100 }} src={imagePath} alt="" />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },

    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
    },
  ];

  // upload modal

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  // upload image file

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSearch = e => {
    const { value } = e.target;
    if (rawData.data) {
      const searchData = rawData.data.filter(
        item =>
          item.name.toLowerCase().includes(String(value).toLowerCase()) ||
          item.id === value,
      );
      const data = searchData.map((item, index) => {
        const { name, description, imagePath, createAt } = item;
        return {
          key: index,
          name,
          description,
          imagePath,
          createAt: new Date(createAt).toUTCString(),
          stt: index + 1,
        };
      });
      setTimeout(() => {
        setTableData(data);
      }, 500);
    }
  };

  const handleResetForm = () => {
    form.setFieldsValue({
      name: '',
      description: '',
    });
    setFileList([]);
  };

  const handleSubmitForm = () => {
    // const createAt = new Date().valueOf();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleResetForm();
    }, [3000]);
  };

  React.useEffect(() => {
    let data = [];
    if (rawData.data) {
      data = rawData.data.map((item, index) => {
        const { name, description, imagePath, createAt } = item;
        return {
          key: index,
          name,
          description,
          imagePath,
          createAt: new Date(createAt).toUTCString(),
          stt: index + 1,
        };
      });
    }
    setTableData(data);
  }, []);

  return (
    <Container>
      <StyledInput
        placeholder="Nhập tên hoặc id muốn tìm "
        onChange={handleSearch}
      />
      <StyledButton
        shape="round"
        type="primary"
        size="large"
        onClick={handleOpenModal}
      >
        <StyledSpanButton>
          Thêm mới <PlusCircleOutlined />
        </StyledSpanButton>
      </StyledButton>
      <StyledTable columns={columns} dataSource={tableData} />

      <Modal
        title="Thêm mới"
        centered
        visible={isOpenModal}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: 'auto', width: '100%' }}
          onFinish={handleSubmitForm}
          form={form}
        >
          <Form.Item
            label="Tên dòng sản "
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập phẩm tên dòng sản phẩm !',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả!',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tải file ảnh" name="image">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
            >
              <Tooltip
                title={
                  fileList.length === 1 ? 'Cập nhập lại ảnh ' : 'Đăng tải ảnh'
                }
              >
                <Button
                  type="primary"
                  size="medium"
                  icon={<UploadOutlined />}
                  shape="round"
                />
              </Tooltip>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 24 }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};
export default HomePage;
