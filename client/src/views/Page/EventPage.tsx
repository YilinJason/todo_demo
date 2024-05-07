import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Table, Button, Space, Input, Modal, Form, DatePicker } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';



interface DataType {
  key: React.Key;
  eventName: string;
  description: string;
  endDate: Date;
  eventStatus: string;
}

const EventPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
    },
    {
      title: 'Due Date',
      dataIndex: 'endDate',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      filters: [
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Complete',
          value: 'Complete',
        },
      ],
      onFilter: (value, record) => record.eventStatus.indexOf(value as string) === 0,
      render: (status) => {
        let icon;
        switch (status) {
          case 'Complete':
            icon = <CheckCircleOutlined style={{ color: 'green' }} />;
            break;
          case 'Pending':
            icon = <ClockCircleOutlined style={{ color: 'orange' }} />;
            break;
          default:
            icon = null;
        }
        return (
          <span>
            {icon} {status}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: "action",
      width: '20%',
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              // Set the initial form values with the current row data
              form.setFieldsValue({
                eventName: record.eventName,
                description: record.description,
                eventStatus: record.eventStatus,
              });
              setCurrentRecord(record);
              setIsVisibleEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => {
              // Navigate to the details page with the eventId
              axios.put(`http://localhost:8080/event/complete/${record.eventId}`)
                .then(response => {
                  console.log(response.data);
                  // Refresh the table data
                  getAllData();
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            Complete
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              // Call your delete API here with the eventId
              axios.delete(`http://localhost:8080/event/delete/${record.eventId}`)
                .then(response => {
                  console.log(response.data);
                  // Refresh the table data
                  getAllData();
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            Delete
          </Button>
        </Space>
      )
    },
  ];

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // get all data from database
  function getAllData() {
    axios.get('http://localhost:8080/event/getbyuser', {
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // add event to the database
  const addEvent = (values: any) => {
    // Convert the values to the json format
    const eventData = {
      eventName: values.eventName,
      description: values.description,
      endDate: values.endDate,
    };
    axios.post('http://localhost:8080/event/add', eventData)
      .then(response => {
        console.log(response.data);
        // Refresh the table data
        getAllData();
        setIsVisibleAdd(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editEvent = (values: any) => {
    console.log('Received values of form: ', values);
    // Convert the values to the format your API expects
    const eventData = {
      eventName: values.eventName,
      description: values.description,
      eventStatus: values.eventStatus,
    };

    // Call your update API here with the form values
    axios.put(`http://localhost:8080/event/update/${currentRecord.eventId}`, eventData)
      .then(response => {
        console.log(response.data);
        // Refresh the table data
        getAllData();
        setIsVisibleEdit(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function deleteEventByIdList() {
    // Call your delete API here with the selectedRowKeys
    axios.delete('http://localhost:8080/event/deleteList', { data: selectedRowKeys })
      .then(response => {
        console.log(response.data);
        // Refresh the table data
        getAllData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <div className='menuBar' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          <Input.Search
            placeholder="Search event name"
            onSearch={value => console.log(value)}
            style={{ marginLeft: 16, width: 180 }}
          />
          <Button type="primary" style={{ transform: 'translateY(-16px)' }} onClick={() => setIsVisibleAdd(true)}>
            Add
          </Button>
          <Modal
            className='EventAdd'
            title="Event Add"
            centered
            visible={isVisibleAdd}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  addEvent(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => setIsVisibleAdd(false)}
          >
            <Form form={form} layout="vertical" name="form_in_modal">
              <Form.Item
                name="eventName"
                label="Event Name"
                rules={[{ required: true, message: 'Please input the event name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select the end date!' }]}
              >
                <DatePicker 
                  disabledDate={(current) => {
                    let customDate = moment().format("YYYY-MM-DD");
                    return current && current < moment(customDate, "YYYY-MM-DD");
                  }} 
                />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            className='EventEdit'
            title="Event Edit"
            centered
            visible={isVisibleEdit}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  editEvent(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => setIsVisibleEdit(false)}
          >
            <Form form={form} layout="vertical" name="form_in_modal">
              <Form.Item
                name="eventName"
                label="Event Name"
                rules={[{ required: true, message: 'Please input the event name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="eventStatus"
                label="Event Status"
                rules={[{ required: true, message: 'Please input the event status!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Button
            type="primary"
            danger
            style={{ transform: 'translateY(-16px)' }}
            onClick={deleteEventByIdList}
          >
            Delete
          </Button>
        </Space>
      </div>
      <Table
        rowKey='eventId'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default EventPage;