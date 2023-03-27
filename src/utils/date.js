import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b)
}
