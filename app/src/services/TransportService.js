import moment from 'moment'

function flat(l, o = []) {
  for (const c of l) {
    if (Array.isArray(c)) {
      flat(c, o);
    }
    else {
      o.push(c);
    }
  }
  return o;
}

export default {
  async getCityway(stop) {
    var date = new Date()
    var dateStr = moment(date).format('YYYY-MM-DD_HH-mm')
    var api = process.env.VUE_APP_API_CITYWAY_URL.replace('{STOP_ID}', stop).replace('{DATE}', dateStr)
    const hours = await fetch(api)
    .then(r => r.json())
    .then(o => o.StopTimetableObj.HourGroup
      .filter(hours => hours.VehicleJourneyAtStop)
      .map(hour => hour.VehicleJourneyAtStop))
    .then(flat)
    .then(o => o.slice(0, 7)
      .map(t => [t.line.directionName, moment(t.passingTime.formatedHour, 'HH:mm').diff(date, 'minutes'), t.journeyPattern.id])
    )
    return hours
  },
  async getTrains(api_key, stop_id) {
    var api = process.env.VUE_APP_API_SNCF_DEPARTURES_URL.replace('{STOP_ID}', stop_id)
    const trains = await fetch(api, {
      headers: new Headers({
        'Authorization': api_key
      })
    })
    .then(r => r.json()
    .then(o => o.departures
      .map(t => [ t.display_informations.direction.match(/\(([^)]+)\)/)[1], moment(t.stop_date_time.base_arrival_date_time).format('HH:mm'), moment(t.stop_date_time.arrival_date_time).diff(moment(t.stop_date_time.base_arrival_date_time), 'minutes'), moment(t.stop_date_time.arrival_date_time).format('HH:mm') ])
      .slice(0, 7))
    )
    return trains
  }
}