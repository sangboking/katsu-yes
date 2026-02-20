import type { DaySchedule, OpeningHours } from "./hook/useKatsuPlaceDetail";

export const formatTime = (time: string | undefined) => {
  if (!time) return "정보 없음";
  return time.slice(0, 5);
};

export const getToday = () => {
  return new Date().toLocaleString("en-US", { weekday: "short" }).toLowerCase();
};

export const getSortedOpeningHours = (
  openingHours: OpeningHours | undefined,
) => {
  const weekOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  if (!openingHours) return [];

  return Object.entries(openingHours).sort(
    ([a], [b]) => weekOrder.indexOf(a) - weekOrder.indexOf(b),
  );
};

export const getDayKorean = (day: string) => {
  const dayKoreanMap: { [key: string]: string } = {
    mon: "월",
    tue: "화",
    wed: "수",
    thu: "목",
    fri: "금",
    sat: "토",
    sun: "일",
  };
  return dayKoreanMap[day] || "";
};

export const renderDaySchedule = ([day, schedule]: [string, DaySchedule]) => {
  const dayKorean = getDayKorean(day);

  if (schedule.is_closed) {
    return {
      key: day,
      day: dayKorean,
      scheduleText: "정기 휴무",
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

export const getCurrentStatus = (
  todayOpeningHours: [string, DaySchedule] | undefined,
) => {
  if (!todayOpeningHours) {
    return { status: "정보 없음", subText: "" };
  }

  const [, schedule] = todayOpeningHours;
  if (schedule.is_closed) {
    return { status: "정기 휴무", subText: "" };
  }

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;

  const openTime = schedule.open ? schedule.open.slice(0, 5) : "00:00";
  const closeTime = schedule.close ? schedule.close.slice(0, 5) : "24:00";

  if (currentTime < openTime) {
    return { status: "영업 전", subText: `${openTime}에 영업 시작` };
  }

  if (currentTime > closeTime) {
    return { status: "영업 종료", subText: "" };
  }

  if (schedule.break) {
    const [breakStart, breakEnd] = schedule.break
      .split("-")
      .map((t) => t.trim());
    if (currentTime >= breakStart && currentTime < breakEnd) {
      return { status: "브레이크타임", subText: `${breakEnd}에 오픈 예정` };
    }
  }

  return { status: "영업 중", subText: `${closeTime}에 영업 종료` };
};
