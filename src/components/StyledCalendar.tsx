import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

export const StyledCalendar = styled(Calendar)`
  width: 100%; // 💡 가로를 부모 영역만큼 꽉 채우기
  max-width: 800px; // 💡 최대 너비 늘리기 (기존 500~600px → 800px)
  margin: 0 auto; // 가운데 정렬
  border: none;
  border-radius: 16px;
  padding: 20px;
  background: #fefefe;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;

  abbr {
    text-decoration: none;
    font-size: 14px;
  }

  .react-calendar__tile {
    padding: 12px 0;
    font-size: 14px;
    border-radius: 12px;
    transition: background-color 0.3s;
  }

  .react-calendar__tile:enabled:hover {
    background: #f0f0ff;
  }

  .react-calendar__tile--now {
    background: #dce6ff;
    color: #000;
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: #4f80ff;
    color: #fff;
  }

  .react-calendar__navigation button {
    font-size: 16px;
    color: #333;
    padding: 10px;
    background: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 13px;
    color: #777;
  }
`;
