import {
  FilterIcon,
  SearchIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline';
import { Table } from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import moment from 'moment-timezone';
import FilterTicket from './FilterTicket';
type Props = {};

const ManagerTicket = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [key, setKey] = useState('');
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ticketsFilter, setTicketsFilter] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isOpenModalExprire, setIsOpenModalExprire] = useState<boolean>(false);
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
      dataIndex: 'numberTicket',
      width: '5%',
    },
    {
      title: 'Tên sự kiện',
      dataIndex: 'eventName',
      width: '20%',
    },
    {
      title: 'Tình trạng sử dụng',
      dataIndex: 'status',
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
      dataIndex: 'dateUsed',
      width: '10%',
      align: 'right' as AlignType,
      render: (dateUsed: any) => {
        return <span>{dateUsed.format('DD/MM/YYYY')}</span>;
      },
    },
    {
      title: 'Ngày xuất vé',
      dataIndex: 'dateExport',
      width: '10%',
      align: 'right' as AlignType,
      render: (dateExport: any) => {
        return <span>{dateExport.format('DD/MM/YYYY')}</span>;
      },
    },
    {
      title: 'Cổng Check-in',
      dataIndex: 'gateCheckin',
      width: '15%',
      render: (numb: any) => {
        return <span>Cổng {numb}</span>;
      },
    },
    {
      title: '',
      dataIndex: 'action',
      width: '5%',
      render: (number: any, record: any) => {
        if (record.status === 'pending') {
          return (
            <DotsVerticalIcon
              className='w-[18px] h-[36px] cursor-pointer'
              onClick={() => {
                handlePopupExpire();
              }}
            />
          );
        } else {
          return '';
        }
      },
    },
  ];

  useEffect(() => {
    //Data demo
    const data = [];
    for (let index = 0; index < 50; index++) {
      const random = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      let temp = {
        key: index,
        stt: index + 1,
        bookingCode: `ALT202105${index < 10 ? '0' + index : index}`,
        numberTicket: '123789312749',
        eventName: 'Hội chợ triển lãm tiêu dùng 2022',
        status: random === 1 ? 'used' : random === 2 ? 'expired' : '',
        dateUsed: moment(),
        dateExport: moment().subtract(1, 'days'),
        gateCheckin: `${random + 1}`,
      };
      data.push(temp);
    }
    setTable({ ...table, data: data as any });
  }, []);

  //Pagination
  const handlePanigationChange = (current: any) => {
    setTable({ ...table, pagination: { ...table.pagination, current } });
  };
  // set status modal
  const handleStatusModal = (status: boolean): void => {
    setIsOpen(status);
  };
  // Handel Open modal
  const handleModal = () => {
    setIsOpen(true);
  };

  // set handle keyword change
  const handleKeyWordChange = (e: any) => {
    let value = e.target.value;
    setKey(value);
    if (searchRef) {
      clearInterval(searchRef.current as any);
    }
    searchRef.current = setTimeout(() => {
      let temp = ticketsFilter.filter((item: any) => {
        return item.numberTicket.includes(value);
      });
      setTable({ ...table, data: temp as any });
      clearInterval(searchRef.current as any);
    }, 700);
  };

  const handlePopupExpire = () => {
    setIsOpenModalExprire(true);
  };
  // set status modal
  const handleStatusExpire = (status: boolean) => {
    setIsOpenModalExprire(status);
  };
  //
  const handleReceiveFilter = (filterResult: any): void => {
    let { time, tinhTrang, congCheckin } = filterResult;
    tinhTrang = tinhTrang === 'all' ? '' : tinhTrang;
    congCheckin = congCheckin.includes('all') ? '' : congCheckin;

    let result = tickets.filter((ticket: any) => {
      let isValidDate =
        ticket.dateUsed.isBefore(time.endDay) &&
        ticket.dateUsed.isAfter(time.startDay);
      return (
        ticket.status.includes(tinhTrang) &&
        isValidDate &&
        ticket.numberTicket.includes(key)
      );
    });

    if (congCheckin.length > 0) {
      if (!congCheckin.includes('all')) {
        result = result.filter((ticket: any) => {
          return (
            congCheckin.includes(ticket.gateCheckin) &&
            ticket.status.includes(tinhTrang)
          );
        });
      }
    }
    setTicketsFilter(result);
    setTable({ ...table, data: result as any });
  };
  return (
    <Fragment>
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
              onChange={handleKeyWordChange}
            />
            <label className='absolute right-5 top-[10px] cursor-pointer h-6 w-6 2xl:top-[5px]'>
              <SearchIcon className='text-xl font-light 3xl:text-sm 2xl:text-xs' />
            </label>
          </div>
          <div className='flex gap-x-[10px] ml-auto'>
            <div className='btn flex items-center cursor-pointer'>
              <FilterIcon className='w-[26px] mr-3' onClick={handleModal} /> Lọc
              vé
            </div>
            <div className='btn cursor-pointer'>Xuất file (.csv)</div>
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
      <FilterTicket
        isOpen={isOpen}
        handleModal={handleStatusModal}
        handleReceiveFilter={handleReceiveFilter}
      />
    </Fragment>
  );
};

export default ManagerTicket;
