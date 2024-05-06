import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { TableProps, GetProp } from 'antd';
import { Table, Upload } from 'antd';
import './page.scss';
import axios from 'axios';

const { Dragger } = Upload;
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  eventName: string;
  endDate: Date;
  eventStatus: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps<DataType>, 'onChange'>>[1];
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'To-Do',
      dataIndex: 'eventName',
      width: '40%',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
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
      title: 'Due',
      dataIndex: 'endDate',
      width: '30%',
    }
  ];

  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  // get all data from database
  function getUpcomingData() {
    axios.get('http://localhost:8080/event/getbytime')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(() => {
    getUpcomingData();
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  return (
    <div>
      <div>
        <h1>Welcome, {localStorage.getItem("userName")}! Here is upcoming task.</h1>
        <Table
          className="table-pagination-center"
          columns={columns}
          rowKey={"eventId"}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default HomePage;