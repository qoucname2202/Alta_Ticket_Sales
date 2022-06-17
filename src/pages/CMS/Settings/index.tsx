import { SearchIcon } from '@heroicons/react/outline';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import { Link } from 'react-router-dom';
import { PencilAltIcon } from '@heroicons/react/outline';
type Props = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '5%',
    align: 'center' as AlignType,
  },
  {
    title: 'Mã gói',
    dataIndex: 'maGoi',
    width: '5%',
  },

  {
    title: 'Tên gói vé',
    dataIndex: 'tenGoiVe',
    width: '10%',
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'ngayApDung',
    width: '10%',
    align: 'right' as AlignType,
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'ngayHetHan',
    width: '10%',
    align: 'right' as AlignType,
  },

  {
    title: 'Giá vé (VNĐ/Vé)',
    dataIndex: 'giaVe',
    width: '12%',
    align: 'right' as AlignType,
  },
  {
    title: 'Giá Combo (VNĐ/Combo)',
    dataIndex: 'giaCombo',
    width: '15%',
    align: 'left' as AlignType,
  },
  {
    title: 'Tình trạng',
    dataIndex: 'tinhTrang',
    width: '15%',
    render: (tinhTrang: any) =>
      tinhTrang ? (
        <span className='flex items-center gap-x-3 bg-grey-background w-[140px] p-3 rounded border border-solid border-green'>
          <span className='block h-2 w-2 bg-green rounded-full'></span>
          <span className='text-green font-medium text-xs leading-[15px]'>
            Đang áp dụng
          </span>
        </span>
      ) : (
        <span className='flex items-center gap-x-3 bg-grey-background w-[70px] p-3 rounded border border-solid border-primary-600'>
          <span className='block h-2 w-2 bg-primary-600 rounded-full'></span>
          <span className='text-primary-600 font-medium text-xs leading-[15px]'>
            Tắt
          </span>
        </span>
      ),
  },
  {
    title: '',
    dataIndex: 'action1',
    render: (item: any, record: any) => (
      <Link
        className='flex items-center gap-x-[15px] text-lg 3xl:text-sm 2xl:text-xs'
        to={`/settings/update/${record.id}`}
      >
        <PencilAltIcon className='w-[20px] text-primary-200' />
        <span className='text-primary-200'>Cập nhật</span>
      </Link>
    ),
  },
];

const Settings = (props: Props) => {
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
        maGoi: `ALT202105${index < 10 ? '0' + index : index}`,
        tenGoiVe: 'Gói gia đình',
        ngayApDung: '17/06/2022 23:00:00',
        ngayHetHan: '26/06/2022 23:00:00',
        giaVe: '90.000 VNĐ',
        giaCombo: '50.000 VNĐ/4 Vé',
        tinhTrang: index % 2 === 0 ? true : false,
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
      <h1 className='text-4xl font-bold mb-8'>Danh sách gói vé</h1>
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
          <div className='btn'>Xuất file (.csv)</div>
          <div className='btn flex items-center bg-primary '>
            <span className='text-white text-lg font-bold leading-[26px]'>
              Thêm gói vé
            </span>
          </div>
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

export default Settings;
