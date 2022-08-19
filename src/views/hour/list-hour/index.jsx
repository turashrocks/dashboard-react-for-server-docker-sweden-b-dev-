import { useContext } from 'react';
import {
  DatePicker,
  Popconfirm,
  Button,
  Modal,
  TimePicker
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import { GlobalContext } from '@/context';

export default function ListHourCompontent() {
  return (
    <div className="app-main-container">
      <DatePicker.RangePicker style={{ marginBottom: 20, marginRight: 40, width: 300 }} />
      <TimePicker.RangePicker style={{ marginBottom: 20, marginRight: 40, width: 300 }} />
      <Popconfirm title="Click to confirm!">
        <Button style={{ marginBottom: 20, marginRight: 20 }} type="primary">
          Popconfirm
        </Button>
      </Popconfirm>
      <Button onClick={() => Modal.confirm({ title: 'Title', content: 'Content' })}>
        Modal confirm
      </Button>
    </div>
  );
}
