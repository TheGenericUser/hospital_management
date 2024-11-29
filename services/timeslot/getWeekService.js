const getNextWeekday = (startDate, weekday) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let targetDayIndex = weekdays.indexOf(weekday);
    let dayDiff = targetDayIndex - startDate.day();
    
    if (dayDiff <= 0) {
        dayDiff += 7; // move to the next week
    }

    return startDate.clone().add(dayDiff, 'days');
}

module.exports = { getNextWeekday };