import dayjs from "dayjs";

export const dateFormat = {
    default: "YYYY-MM-DD",
    defaultWithTime: "DD/MM/YYYY HH:mm",
};

export const formatDateTime = (date: Date | string, format: string) => dayjs(date).format(format);
