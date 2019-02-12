import moment from 'moment'

export default {
  async getTramways(stop) {
    var date = new Date()
    var dateStr = moment(date).format('YYYY-MM-DD_HH-mm')
    var api = `http://openservice.cityway.fr/api/timetables/v1/StopPassingTimes/json?key=ODNCA&stopId=${ stop }&refTime=${ dateStr }`
    const hours = await fetch(api)
    .then(r => r.json())
    .then(o => o.StopTimetableObj.HourGroup
        .filter(hours => hours.VehicleJourneyAtStop)
        .map(hour => hour.VehicleJourneyAtStop)
        .flat()
        .slice(0, 5)
        .map(t => t.passingTime.formatedHour)
        .map(t => moment(t, 'HH:mm').diff(date, 'minutes'))
    )
    return hours
  }
}