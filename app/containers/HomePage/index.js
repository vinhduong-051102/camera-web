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
  StyledSubmitFormButton,
} from './styles';
import * as selectors from '../../shared/components/Sidebar/selectors';
import { useDebounce } from '../../hooks';
import { axiosPost } from '../../utils/request';

const HomePage = () => {
  const [form] = Form.useForm();
  const rawData = useSelector(selectors.selectData());
  const [tableData, setTableData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const debounced = useDebounce(searchValue, 500);
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

  const handleInputSearch = e => {
    const { value } = e.target;
    setSearchValue(value);
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
    if (rawData.data && Array.isArray(rawData.data)) {
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

  React.useEffect(() => {
    setIsSearching(true);
    axiosPost('', debounced.trim())
      .then(res => {
        let searchData = [];
        if (res.data && Array.isArray(res.data)) {
          searchData = res.data.map((item, index) => {
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
        setTableData(searchData);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [debounced]);

  return (
    <Container>
      <StyledInput
        placeholder="Nhập tên hoặc id muốn tìm "
        onChange={handleInputSearch}
        value={searchValue}
        loading={searchValue !== '' && isSearching}
        size="large"
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
        // centered
        open={isOpenModal}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: 'auto', width: '100%' }}
          onFinish={handleSubmitForm}
          form={form}
        >
          <Form.Item
            label="Tên dòng sản phẩm"
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
          <StyledSubmitFormButton wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Xác nhận
            </Button>
          </StyledSubmitFormButton>
        </Form>
      </Modal>
    </Container>
  );
};
export default HomePage;
