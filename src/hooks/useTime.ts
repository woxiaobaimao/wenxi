import dayjs from 'dayjs'

const getFormatData = (dateObject: any) => {
  return dayjs(dateObject).format('YYYY-MM-DD')
}
export { getFormatData }
