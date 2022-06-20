import { Col, Row, Table, Radio, Space, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';
import type { RadioChangeEvent, DatePickerProps } from 'antd';
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '10%',
    align: 'center' as AlignType,
  },
  {
    title: 'Số vé',
    dataIndex: 'soVe',
    width: '15%',
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'ngaySuDung',
    width: '15%',
    align: 'right' as AlignType,
  },
  {
    title: 'Tên loại vé',
    dataIndex: 'tenLoaiVe',
    width: '20%',
  },
  {
    title: 'Cổng Check-in',
    dataIndex: 'cong',
    width: '20%',
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='flex items-center gap-x-[15px] text-lg 3xl:text-sm 2xl:text-xs'
        to={`/settings/update/${record.id}`}
      >
        <span className='text-grey-400 text-sm font-medium italic'>
          Đã đổi soát
        </span>
      </Link>
    ),
  },
];
const TicketExchange = () => {
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 9,
    },
    loading: false,
  });

  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      let temp = {
        key: index,
        stt: index + 1,
        soVe: `ALT202105${index < 10 ? '0' + index : index}`,
        tenLoaiVe: 'Vé cổng',
        ngaySuDung: '17/06/2022',
        cong: 'Cổng 1',
      };
      data.push(temp);
    }
    setTable({ ...table, data: data as any });
  }, []);
  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <Row className='gap-x-10'>
        <Col span={16}>
          <div className='manager-ticket bg-white p-10 rounded-3xl'>
            <h1 className='text-4xl font-bold mb-8'>Đổi soát vé</h1>
            {/* Controls */}
            <div className='flex items-center mb-8'>
              <div className='relative w-[360px]'>
                <input
                  type='text'
                  placeholder='Tìm bằng số vé'
                  className='py-[10px] pl-4 pr-[60px] w-[360px] bg-[#EDE6E6] rounded-xl text-base 3xl:text-sm 2xl:text-xs'
                />
                <label className='absolute right-5 top-[10px] cursor-pointer h-6 w-6 2xl:top-[5px]'>
                  <SearchIcon className='text-xl font-light 3xl:text-sm 2xl:text-xs' />
                </label>
              </div>
              <div className='flex gap-x-[10px] ml-auto bg-primary-300 rounded-lg'>
                <div className='btn text-white'>Chốt đổi soát</div>
              </div>
            </div>
            {/* Table */}
            <Table
              className='mt-4'
              columns={columns}
              dataSource={table.data}
              pagination={{
                ...table.pagination,
                onChange: handlePanigationChange,
                position: ['bottomCenter'],
                nextIcon: (status: any) => {
                  if (status.disabled) {
                    return (
                      <i className='fa fa-caret-right text-grey-400 text-lg'></i>
                    );
                  } else {
                    return (
                      <i className='fa fa-caret-right text-primary-200 text-lg'></i>
                    );
                  }
                },
                prevIcon: (status: any) => {
                  if (status.disabled) {
                    return (
                      <i className='fa fa-caret-left text-grey-400 text-lg'></i>
                    );
                  } else {
                    return (
                      <i className='fa fa-caret-left text-primary-200 text-lg'></i>
                    );
                  }
                },
              }}
              loading={table.loading}
            />
          </div>
        </Col>
        <Col span={7} className=''>
          <div className='bg-white h-full rounded-3xl p-5'>
            <h3 className='text-2xl font-bold mb-8'>Lọc vé</h3>
            <Row>
              <Col span={12}>Tình trạng đổi soát</Col>
              <Col span={12}>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction='vertical'>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Đã đổi soát</Radio>
                    <Radio value={3}>Chưa đổi soát</Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
            <Row className='mt-6'>
              <Col span={12}>Đến ngày</Col>
              <Col span={12}>Vé Cổng</Col>
            </Row>
            <Row className='mt-6'>
              <Col span={12}>Từ ngày</Col>
              <Col span={12}>
                <DatePicker onChange={onChangeDate} />
              </Col>
            </Row>
            <Row className='mt-6'>
              <Col span={12}>Đến ngày</Col>
              <Col span={12}>
                <DatePicker onChange={onChangeDate} />
              </Col>
            </Row>
            <div className='flex justify-center items-center'>
              <div className='btn mt-12'>Lọc vé</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TicketExchange;
