import { useMemo } from "react";
import { getToday, getSortedOpeningHours, getCurrentStatus } from "@/lib/time";
import type { OpeningHours } from "./useKatsuPlaceDetail";

export const useOpeningHours = (openingHours: OpeningHours | undefined) => {
  const today = useMemo(() => getToday(), []);

  const sortedOpeningHours = useMemo(
    () => getSortedOpeningHours(openingHours),
    [openingHours],
  );

  const todayOpeningHours = useMemo(
    () => sortedOpeningHours.find(([day]) => day === today),
    [sortedOpeningHours, today],
  );

  const currentStatus = useMemo(
    () => getCurrentStatus(todayOpeningHours),
    [todayOpeningHours],
  );

  return { today, sortedOpeningHours, todayOpeningHours, currentStatus };
};
