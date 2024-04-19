import dayjs from 'dayjs'

const getFormatData = (dateObject: any) => {
  return dayjs(dateObject).format('YYYY-MM-DD HH:mm:ss')
}
export { getFormatData }
