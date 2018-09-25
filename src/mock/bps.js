import getColorFromName from 'utils/getColorFromName'

const bps = [
  {
    name: 'EOS Costa Rica',
    values: [9, 0, 8, 7, 2]
  },
  {
    name: 'EOS New York',
    values: [9, 8, 8, 9, 8]
  },
  {
    name: 'EOS Meso',
    values: [8, 0, 3, 7, 5]
  }
]

export default bps.map(({ name, ...bp }) => ({
  ...bp,
  color: getColorFromName(name)
}))
