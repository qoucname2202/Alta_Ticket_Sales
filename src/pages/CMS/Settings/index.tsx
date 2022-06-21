import { SearchIcon } from '@heroicons/react/outline';
import { Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import { Link } from 'react-router-dom';
import { PencilAltIcon } from '@heroicons/react/outline';
import moment from 'moment-timezone';
import AddPackage from './AddPackage';
import UpdatePackage from './UpdatePackage';
import TicketPackageServices from '../../../db/services/ticketPackage';
import ITicket from '../../../db/types/ticketPackage.type';
type Props = {};

const Settings = (props: Props) => {
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [key, setKey] = useState('');

  const [ticketsFilter, setTicketsFilter] = useState([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalUpdated, setIsOpenModalUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await TicketPackageServices.getTicketPackage();

      data = data.map((item: any, index) => {
        return {
          ...item,
          key: item.id,
          stt: index + 1,
        };
      });
      setTickets(data);
      setTable({ ...table, data: data as any });
    })();
  }, [tickets]);

  const removeAccents = (str: string) => {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };

  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 9,
    },
    loading: false,
  });
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '5%',
      align: 'center' as AlignType,
    },
    {
      title: 'Mã gói',
      dataIndex: 'packageCode',
      width: '5%',
    },

    {
      title: 'Tên gói vé',
      dataIndex: 'packageName',
      width: '10%',
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'dateRelease',
      width: '10%',
      align: 'right' as AlignType,
      render: (dateRelease: any) => {
        return <span>{moment(dateRelease.toDate()).format('DD/MM/YYYY')}</span>;
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateExpired',
      width: '10%',
      align: 'right' as AlignType,
      render: (dateExpired: any) => {
        return <span>{moment(dateExpired.toDate()).format('DD/MM/YYYY')}</span>;
      },
    },

    {
      title: 'Giá vé (VNĐ/Vé)',
      dataIndex: 'fare',
      width: '12%',
      align: 'right' as AlignType,
      render: (fare: any) => {
        let price = fare.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
        return <span>{price.substring(0, price.length - 2)} VNĐ</span>;
      },
    },
    {
      title: 'Giá Combo (VNĐ/Combo)',
      dataIndex: 'fareCombo',
      width: '15%',
      align: 'left' as AlignType,
      render: (fareCombo: any) => {
        if (fareCombo) {
          let price = fareCombo.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          });
          return (
            <span>
              {price.substring(0, price.length - 2)} VNĐ/ {fareCombo.amount} vé
            </span>
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      width: '15%',
      render: (status: any) =>
        status ? (
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
        <span
          onClick={() => {
            handleModalUpdate();
          }}
          className='flex text-yellow/1 items-center gap-x-1 cursor-pointer'
        >
          <PencilAltIcon className='w-[18px] h-[36px] cursor-pointer' /> Cập
          nhật
        </span>
      ),
    },
  ];
  // Pagination
  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  // Handel Input Search
  const handleKeyWordChange = (e: any) => {
    let value = e.target.value;
    setKey(value);
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = tickets.filter((item: any) => {
        return item.packageCode.includes(value);
      });
      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };

  const handleStatusUpdated = (status: boolean) => {
    setIsOpenModalUpdated(status);
  };

  const handleModalUpdate = () => {
    setIsOpenModalUpdated(true);
  };

  const handleStatusAdd = (status: boolean) => {
    setIsOpenModalAdd(status);
  };

  const handleModalAddTicket = () => {
    setIsOpenModalAdd(true);
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
            onChange={handleKeyWordChange}
          />
          <label className='absolute right-5 top-[10px] cursor-pointer h-6 w-6 2xl:top-[5px]'>
            <SearchIcon className='text-xl font-light 3xl:text-sm 2xl:text-xs' />
          </label>
        </div>
        <div className='flex gap-x-[10px] ml-auto'>
          <div className='btn'>Xuất file (.csv)</div>
          <div className='btn flex items-center bg-primary '>
            <span
              className='text-white text-lg font-bold leading-[26px] cursor-pointer'
              onClick={handleModalAddTicket}
            >
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
      <AddPackage isOpen={isOpenModalAdd} handlePopup={handleStatusAdd} />
      <UpdatePackage
        isOpen={isOpenModalUpdated}
        handlePopup={handleStatusUpdated}
      />
    </div>
  );
};

export default Settings;
