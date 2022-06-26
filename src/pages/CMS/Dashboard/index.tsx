import React, { useEffect, useState } from 'react';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Checkbox, DatePicker, Radio } from 'antd';
import moment from 'moment-timezone';
import TicketServies from '../../../db/services/ticketManager';
import ITicket from '../../../db/types/ticketManager.type';

import './style.scss';
ChartJS.register(
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      yAlign: 'bottom',
      padding: {
        left: 30,
        right: 30,
        top: 5,
        bottom: 5,
      },
      backgroundColor: '#5185F7',
      displayColors: false,
      callbacks: {
        title: function (tooltipItem: any) {
          return;
        },
        label: function (tooltipItem: any) {
          return tooltipItem.dataset.data[tooltipItem['dataIndex']];
        },
      },
    },
  },
  legend: {
    display: false,
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scale: {
    yAxes: [
      {
        type: 'linear',
        position: 'bottom',
        ticks: {
          max: 100,
          min: 0,
          stepSize: 1,
        },
      },
    ],
  },
};
type Props = {};

const Dashboard = (props: Props) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [filter, setFilter] = useState('day');
  const [tickets, setTickets] = useState<ITicket[]>();
  useEffect(() => {
    (async () => {
      let data = await TicketServies.getTicketManager();
      setTickets(data);
    })();
  }, []);

  const renderData = () => {
    var canvas = document.createElement('canvas');
    var chart = canvas.getContext('2d');
    let gradient = chart?.createLinearGradient(0, 0, 0, 450);

    gradient?.addColorStop(0, 'rgba(206, 221, 255,1)');
    gradient?.addColorStop(0.5, 'rgba(206, 221, 255,0.7)');
    gradient?.addColorStop(1, 'rgba(206, 221, 255,0.3)');
    // Variable
    let date = dateSelected;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const days = new Date(year, month, 0).getDate();
    let listDays = Array.from({ length: days }, (_, i) => i + 1);
    let labels: any[] = [];
    let data = [33, 53, 85, 41, 44, 65];
    switch (filter) {
      case 'day':
        break;
      default:
        break;
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Số đã cấp (lượt)',
          data: data,
          fill: true,
          backgroundColor: gradient,
          borderColor: '#5185F7',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#5185F7',
        },
      ],
    };
  };
  const handeChangeFilter = (values: any) => {
    console.log(values.target.value);
  };
  return (
    <div className='dashboard_content'>
      <h1 className='text-4xl font-bold mb-8'>Thống kê</h1>
      <div className='flex items-center w-full mb-6'>
        <span className='text-lg font-semibold'>Doanh thu</span>
        <DatePicker
          className='ml-auto rounded-lg w-[150px] h-11 text-primary-gray-400'
          dropdownClassName='custom-date'
          format={'DD/MM/YYYY'}
          value={moment()}
          locale={locale}
          renderExtraFooter={() => {
            return (
              <div className='py-5'>
                <Radio.Group
                  defaultValue={'day'}
                  className='flex justify-between'
                  onChange={handeChangeFilter}
                >
                  <div className=''>
                    <Radio value={'day'} />
                    <span className='text-sm ml-2'>Theo ngày</span>
                  </div>
                  <div className=''>
                    <Radio value={'week'} />
                    <span className='text-sm ml-2'>Theo tuần</span>
                  </div>
                </Radio.Group>
              </div>
            );
          }}
        />
      </div>
      <Line data={renderData() as any} options={options as any} />
    </div>
  );
};

export default Dashboard;
