import React from 'react';
import { useSelector } from 'react-redux';
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  Upload,
  Form,
  Input,
  Modal,
  Button,
  Tooltip,
  Grid,
  Popconfirm,
  Descriptions,
} from 'antd';
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
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const rawData = useSelector(selectors.selectData());
  // eslint-disable-next-line no-unused-vars
  const [tableData, setTableData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isOpenViewDetail, setIsOpenViewDetail] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const debounced = useDebounce(searchValue, 500);

  const PcColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 80,
      align: 'center',
    },
    {
      title: 'Ảnh',
      dataIndex: 'imagePath',
      render: imagePath => (
        <img style={{ width: 100, height: 100 }} src={imagePath} alt="" />
      ),
      width: 150,
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
      width: 250,
    },
    {
      title: 'Thao tác',
      render: id => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Popconfirm
            title="Xác nhận xoá"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => handleDelProductLine(id)}
          >
            <Tooltip title="Xoá">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
              onClick={() => handleOpenModal('Sửa')}
            />
          </Tooltip>
        </div>
      ),
      dataIndex: 'id',
      width: 150,
    },
  ];

  const mbColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      width: 100,
    },
    {
      title: 'Thông tin chung',
      render: (text, record) => (
        <div>
          <img src={record.imagePath} alt="" width={100} height={100} />
          <p>{record.name}</p>
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Thao tác',
      render: (id, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Popconfirm
            title="Xác nhận xoá"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => handleDelProductLine(id)}
          >
            <Tooltip title="Xoá">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
              onClick={() => handleOpenModal('Sửa')}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              shape="circle"
              onClick={handleOpenViewDetail}
            />
          </Tooltip>
          <Modal
            title="Chi tiết thông tin"
            open={isOpenViewDetail}
            centered
            onCancel={handleCloseViewDetail}
            onOk={handleCloseViewDetail}
          >
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Hình ảnh">
                <img width={100} height={100} src={record.imagePath} alt="" />
              </Descriptions.Item>
              <Descriptions.Item label="Tên dòng sản phẩm">
                {record.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {record.description}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {record.createAt}
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        </div>
      ),
      width: screen.xs ? 128 : 200,
      dataIndex: 'id',
    },
  ];

  // upload modal

  const handleOpenModal = title => {
    setTitleModal(title);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

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

  const handleOpenViewDetail = () => {
    setIsOpenViewDetail(true);
  };

  const handleCloseViewDetail = () => {
    setIsOpenViewDetail(false);
  };

  const handleSubmitForm = () => {
    // const createAt = new Date().valueOf();
    if (titleModal === 'Sửa') {
      alert('submit edit');
    } else {
      alert('submit add');
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleResetForm();
    }, [3000]);
  };

  const handleDelProductLine = id => {
    alert(id);
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
        onClick={() => handleOpenModal('Thêm mới')}
      >
        <StyledSpanButton>
          Thêm mới <PlusCircleOutlined />
        </StyledSpanButton>
      </StyledButton>
      <StyledTable
        columns={screen.xs || (screen.sm && !screen.lg) ? mbColumns : PcColumns}
        dataSource={[
          {
            key: 1,
            stt: 1,
            name: 'name',
            description: 'description',
            imagePath: 'https://picsum.photos/200/300',
            createAt: new Date(new Date().valueOf()).toUTCString(),
            id: 0,
          },
        ]}
        size="large"
      />

      <Modal
        title={titleModal}
        centered
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
      {/* detail info */}
    </Container>
  );
};
export default HomePage;
