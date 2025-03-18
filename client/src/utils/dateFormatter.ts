export const formatMonthYear = (dateInput: string | number | Date) => {
    const date = new Date(dateInput);
    const month = date.toLocaleString("pt-BR", { month: "short" });

    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    const year = date.getFullYear();
    return `${formattedMonth} ${year}`;
};
