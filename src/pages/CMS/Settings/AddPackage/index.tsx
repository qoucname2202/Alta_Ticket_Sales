import { ChevronDownIcon } from '@heroicons/react/outline';
import {
  Checkbox,
  DatePicker,
  Form,
  Button,
  Space,
  Modal,
  Input,
  TimePicker,
  Select,
} from 'antd';
import moment from 'moment-timezone';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import './style.scss';
import TicketPackageServices from '../../../../db/services/ticketPackage';
import Swal from 'sweetalert2';
// import ITicket from '../../../../db/types/ticketPackage.type';
type Props = {
  handlePopup: Function;
  isOpen: boolean;
  reload: Function;
};
const { Option } = Select;
const AddPackage = ({ handlePopup, isOpen, reload }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [time, setTime] = useState({
    startDay: moment(),
    endDay: moment().add(7, 'days'),
  });
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      tinhTrang: 'applying',
    });
  }, []);

  const handleStartDateChange = (date: any, dateString: String) => {
    let temp = date.clone();
    if (date > time.endDay) {
      setTime({ startDay: temp, endDay: date.add(7, 'days') });
    } else {
      setTime({ ...time, startDay: temp });
    }
  };
  const handleEndDateChange = (date: any, dateString: String) => {
    setTime({ ...time, endDay: date });
  };
  function disabledDate(current: any) {
    return current < time.startDay;
  }

  // Disable timepicker
  const disableTime = () => {
    if (time.startDay.isSame(time.endDay, 'day')) {
      let hour = time.startDay.get('hours');
      let minutes = time.startDay.get('minutes');
      let seconds = time.startDay.get('seconds');
      return {
        disabledHours: () => Array.from(Array(hour).keys()),
        disabledMinutes: (selectedHour: number) => {
          if (selectedHour === hour) {
            return Array.from(Array(minutes).keys());
          } else {
            return [];
          }
        },
        disabledSeconds: (selectedHour: number, selectedMinute: number) => {
          if (selectedHour === hour && selectedMinute === minutes) {
            return Array.from(Array(seconds).keys());
          } else {
            return [];
          }
        },
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: (selectedHour: number) => [],
      disabledSeconds: (selectedHour: number, selectedMinute: number) => [],
    };
  };
  const random = () => {
    const numb = Math.floor(1000 + Math.random() * 9000);
    return numb;
  };

  const onFinish = async (values: any) => {
    handlePopup(false);
    if (values.isComboTicket) {
      await TicketPackageServices.addTicketPackage({
        dateRelease: time.startDay.toDate(),
        dateExpired: time.endDay.toDate(),
        packageCode: `ALT2021${random()}`,
        packageName: values.namePackage,
        fare: parseInt(values.singleTicket),
        fareCombo: {
          price: Number.parseInt(values.comboTicket.price),
          amount: Number.parseInt(values.comboTicket.amount),
        },
        status: values.tinhTrang === 'applying' ? true : false,
      });
    } else {
      await TicketPackageServices.addTicketPackage({
        dateRelease: time.startDay.toDate(),
        dateExpired: time.endDay.toDate(),
        packageCode: `ALT2021${random()}`,
        packageName: values.namePackage,
        fare: Number.parseInt(values.singleTicket),
        fareCombo: null as any,
        status: values.tinhTrang === 'applying' ? true : false,
      });
    }
    Swal.fire({
      title: 'Success!',
      text: 'Th??m v?? m???i th??nh c??ng',
      icon: 'success',
      showConfirmButton: false,
      timer: 1200,
    });
    reload();
    form.resetFields();
  };

  const handleChangeChecbox = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };
  return (
    <Modal
      centered
      visible={isOpen}
      className='bg-white add-ticket min-w-[758px] rounded-xl'
      closable={false}
      footer={null}
      onCancel={() => {
        handlePopup(false);
      }}
    >
      <h2 className='text-center font-bold text-2xl mb-[27px]'>Th??m g??i v??</h2>
      <Form name='nest-messages' onFinish={onFinish} form={form}>
        <h2 className='flex items-center font-semibold text-base mb-[9px]'>
          T??n g??i v?? <span className='ml-1 text-primary-red'>*</span>
        </h2>
        <Form.Item
          name='namePackage'
          className='mb-[20px]'
          rules={[
            {
              required: true,
              message: 'Kh??ng ???????c b??? tr???ng t??n g??i v??',
            },
          ]}
        >
          <Input
            className='max-w-[367px] w-full py-[10px] pr-4 text-base rounded-lg focus:border-yellow/1 focus:outline-none'
            placeholder='Nh???p t??n g??i v??'
            autoComplete='off'
          />
        </Form.Item>
        {/* Date picker, Time picker */}
        <div className='w-full flex items-center mb-6'>
          <div className='flex flex-col  gap-y-[5px] w-1/2 text-base font-semibold'>
            <h2 className='font-semibold text-base'>Ng??y ??p d???ng</h2>
            <div className='flex items-center gap-x-[9px]'>
              <DatePicker
                name='day'
                onChange={handleStartDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                value={time.startDay}
              />
              <TimePicker
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                value={time.startDay}
              />
            </div>
          </div>
          <div className='flex flex-col  gap-y-[5px] w-1/2 text-base font-semibold'>
            <h2 className='font-semibold text-base'>Ng??y h???t h???n</h2>
            <div className='flex items-center gap-x-[9px]'>
              <DatePicker
                name='day'
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
                value={time.endDay}
              />
              <TimePicker
                disabledTime={disableTime}
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                value={time.endDay}
              />
            </div>
          </div>
        </div>
        <h2 className='font-semibold text-base mb-[13px]'>Gi?? v?? ??p d???ng</h2>
        <div className='flex items-center without-margin-input gap-x-2 mb-[20px]'>
          <Form.Item
            name='isSingleTicket'
            valuePropName='checked'
            rules={[
              {
                transform: (value: any) => value || undefined,
                type: 'boolean',
                message: 'Kh??ng ???????c b??? tr???ng ?? gi?? v??',
                required: true,
              },
            ]}
          >
            <Checkbox className='rounded-[5px]' />
          </Form.Item>
          <span className='text-base'>V?? l??? (vn??/v??) v???i gi??</span>
          <Form.Item
            name='singleTicket'
            rules={[
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: 'Vui l??ng nh???p s???',
                required: true,
              },
            ]}
          >
            <Input
              placeholder='Gi?? v??'
              className='rounded-lg bg-grey/2 outline-0 py-[10px] pl-3 max-w-[150px]'
              autoComplete='off'
            />
          </Form.Item>
          <span className='text-base'>/ v??</span>
        </div>
        <div className='flex items-center without-margin-input gap-x-2 mb-[24px]'>
          <Form.Item name='isComboTicket' valuePropName='checked'>
            <Checkbox
              className='rounded-[5px]'
              onChange={handleChangeChecbox}
            />
          </Form.Item>
          <span className='text-base'>Combo v?? v???i gi??</span>
          <Form.Item
            name={['comboTicket', 'price']}
            rules={
              isChecked
                ? [
                    {
                      required: true,
                      pattern: new RegExp(/^[0-9]*$/),
                      message: 'Vui l??ng nh???p gi?? v??',
                    },
                  ]
                : [
                    {
                      required: false,
                    },
                  ]
            }
          >
            <Input
              placeholder='Gi?? v??'
              className='rounded-lg bg-grey/2 outline-0 py-[10px] pl-3 max-w-[150px]'
              autoComplete='off'
            />
          </Form.Item>
          <span className='text-base'>/</span>
          <Form.Item
            name={['comboTicket', 'amount']}
            rules={
              isChecked
                ? [
                    {
                      required: true,
                      pattern: new RegExp(/^[0-9]*$/),
                      message: 'Vui l??ng nh???p s??? l?????ng',
                    },
                  ]
                : [
                    {
                      required: false,
                    },
                  ]
            }
          >
            <Input
              placeholder='S??? v??'
              className='rounded-lg bg-grey/2 outline-0 py-[10px] pl-3 max-w-[72px]'
              autoComplete='off'
            />
          </Form.Item>
          <span className='text-base'>v??</span>
        </div>
        <h2 className='font-semibold text-base mb-[5px]'>T??nh tr???ng</h2>
        <Form.Item name={['tinhTrang']}>
          <Select
            suffixIcon={<ChevronDownIcon className='h-5 w-5 text-yellow/1' />}
            className='rounded-lg max-w-[176px] h-11'
          >
            <Option value='applying'>??ang ??p d???ng</Option>
            <Option value='off'>Off</Option>
          </Select>
        </Form.Item>
        <span className='flex items-center text-base'>
          <span className='ml-1 text-primary-red'>*</span>
          <span className='ml-1 text-[11px] italic opacity-40'>
            l?? th??ng tin b???t bu???c
          </span>
        </span>
        <Space className='w-full items-center justify-center'>
          <Button
            className=' mt-[20px] btn w-[160px] h-[50px] hover:border-yellow/1 hover:text-yellow/1 font-bold text-lg'
            onClick={() => {
              handlePopup(false);
            }}
          >
            H???y
          </Button>
          <Button
            className='fill mt-[20px] btn w-[160px] h-[50px] hover:border-yellow/1 hover:text-white font-bold text-lg ml-6'
            htmlType='submit'
          >
            L??u
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default AddPackage;
