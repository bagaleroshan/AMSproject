import { endOfToday, startOfToday } from "date-fns";
import { Attendance } from "../Schema/model";

export const getGroupAttendanceStats = async (groupId: string) => {
  const todayStart = startOfToday();
  const todayEnd = endOfToday();
  const presenteesCount = await Attendance.countDocuments({
    groupId: groupId,
    status: "P",
    date: { $gte: todayStart, $lt: todayEnd },
  });

  const absenteesCount = await Attendance.countDocuments({
    groupId: groupId,
    status: "A",
    date: { $gte: todayStart, $lt: todayEnd },
  });

  return {
    presentees: presenteesCount,
    absentees: absenteesCount,
  };
};
