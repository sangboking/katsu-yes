import type { DaySchedule, OpeningHours } from './hook/useKatsuPlaceDetail';

export const formatTime = (time: string | undefined) => {
  if (!time) return '정보 없음';
  return time.slice(0, 5);
};

export const getToday = () => {
  return new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
};

export const getSortedOpeningHours = (openingHours: OpeningHours | undefined) => {
  const weekOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  if (!openingHours) return [];

  return Object.entries(openingHours).sort(([a], [b]) => weekOrder.indexOf(a) - weekOrder.indexOf(b));
};

export const getDayKorean = (day: string) => {
  const dayKoreanMap: { [key: string]: string } = {
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
    sun: '일',
  };
  return dayKoreanMap[day] || '';
};

export const renderDaySchedule = ([day, schedule]: [string, DaySchedule]) => {
  const dayKorean = getDayKorean(day);

  if (schedule.is_closed) {
    return {
      key: day,
      day: dayKorean,
      scheduleText: '정기 휴무',
      isClosed: true,
    };
  }

  const openTime = formatTime(schedule.open);
  const closeTime = formatTime(schedule.close);
  let scheduleText = `${openTime} - ${closeTime}`;
  if (schedule.break) {
    scheduleText += ` (브레이크: ${schedule.break})`;
  }

  return {
    key: day,
    day: dayKorean,
    scheduleText,
    isClosed: false,
  };
};
