export function getCurrentDate() {
    const date = new Date();

    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const getSuffix = (num) => {
        if (num >= 11 && num <= 13) {
            return `${num}TH`;
        }

        const lastDigit = num % 10;
        if (lastDigit === 1) return `${num}ST`;
        if (lastDigit === 2) return `${num}ND`;
        if (lastDigit === 3) return `${num}RD`;
        return `${num}TH`;
    };

    return `${dayName}, ${monthName} ${getSuffix(day)}, ${year}`;
};