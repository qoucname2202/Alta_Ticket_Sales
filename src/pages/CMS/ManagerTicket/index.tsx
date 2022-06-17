import { FilterIcon, SearchIcon } from '@heroicons/react/outline';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';

type Props = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '3%',
    align: 'center' as AlignType,
  },
  {
    title: 'Booking code',
    dataIndex: 'bookingCode',
    width: '5%',
  },
  {
    title: 'Số vé',
    dataIndex: 'soVe',
    width: '5%',
  },
  {
    title: 'Tên sự kiện',
    dataIndex: 'tenSuKien',
    width: '20%',
  },
  {
    title: 'Tình trạng sử dụng',
    dataIndex: 'trangThai',
    width: '15%',
    render: (trangThai: any) =>
      trangThai === 'used' ? (
        <span className='flex items-center gap-x-3 bg-grey-background w-[132px] p-3 rounded border border-solid border-grey-500'>
          <span className='block h-2 w-2 bg-grey-500 rounded-full'></span>
          <span className='text-grey-500 font-medium text-xs leading-[15px]'>
            Đã sử dụng
          </span>
        </span>
      ) : trangThai === 'expired' ? (
        <span className='flex items-center gap-x-3 bg-grey-background w-[132px] p-3 rounded border border-solid border-primary-600'>
          <span className='block h-2 w-2 bg-primary-600 rounded-full'></span>
          <span className='text-primary-600 font-medium text-xs leading-[15px]'>
            Hết hạn
          </span>
        </span>
      ) : (
        <span className='flex items-center gap-x-3 bg-grey-background w-[132px] p-3 rounded border border-solid border-grey-500'>
          <span className='block h-2 w-2 bg-green rounded-full'></span>
          <span className='text-green font-medium text-xs leading-[15px]'>
            Chưa sử dụng
          </span>
        </span>
      ),
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'ngaySuDung',
    width: '10%',
    align: 'right' as AlignType,
  },
  {
    title: 'Ngày xuất vé',
    dataIndex: 'ngayXuatVe',
    width: '10%',
    align: 'right' as AlignType,
  },
  {
    title: 'Cổng Check-in',
    dataIndex: 'stageCheckin',
  },
];

const ManagerTicket = (props: Props) => {
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
      const random = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      let temp = {
        key: index,
        stt: index + 1,
        bookingCode: `ALT202105${index < 10 ? '0' + index : index}`,
        soVe: '123789312749',
        tenSuKien: 'Hội chợ triển lãm tiêu dùng 2022',
        trangThai: random === 1 ? 'used' : random === 2 ? 'expired' : '',
        ngaySuDung: '17/06/2022',
        ngayXuatVe: '26/06/2022',
        stageCheckin: 'Cổng 1',
      };
      data.push(temp);
    }
    setTable({ ...table, data: data as any });
  }, []);
  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  return (
    <div className='manager-ticket'>
      <h1 className='text-4xl font-bold mb-8'>Danh sách vé</h1>
      <div></div>
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
        <div className='flex gap-x-[10px] ml-auto'>
          <div className='btn flex items-center'>
            <FilterIcon className='w-[26px] mr-3' /> Lọc vé
          </div>
          <div className='btn'>Xuất file (.csv)</div>
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
              return <i className='fa fa-caret-left text-grey-400 text-lg'></i>;
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
  );
};

export default ManagerTicket;
