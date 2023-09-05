function calculateDuration(start, end) {
    const [startHour, startMinute] = start.split(':');
    const [endHour, endMinute] = end.split(':');
    const startTime = new Date(0, 0, 0, startHour, startMinute);
    const endTime = new Date(0, 0, 0, endHour, endMinute);
    const durationInMs = endTime - startTime;
    const durationInHours = (durationInMs / (1000 * 60 * 60));
    return durationInHours.toFixed(1)-1.5;
  }
  console.log(calculateDuration('09:45','20:20'))
/**09:56,19:52 --8.4
 09:57,19:20 --7.9
09:51,19:51 --8.5
09:51,19:46 --8.4
09:52,19:47 --8.4
09:52,20:04 --8.7
09:52,19:01 --7.7
09:57,19:40 --8.2
09:58,19:10;--7.7
外出(下午)
 09:52,19:46 --8.4
09:56,20:22 --8.9
 09:58,20:39 --9.2
09:56,19:32 --8.1
调休假(全天)
 09:56,19:33 --8.1
09:56,18:59 --7.6
09:56,19:08 
09:56,20:43 --9.3
09:30,19:48 
09:57,19:47 
09:58,19:10 
09:53,19:05 
09:55,19:10 */
//--8.4
  //
//   console.log(calculateDuration('09:57','19:20'))
  //--7.9
//   console.log(calculateDuration('09:56','19:52'))--8.4
//   console.log(calculateDuration('09:56','19:52'))--8.4

9.45-20:20 ---9.1
  