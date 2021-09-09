import { Chart } from 'react-chartjs-2'
import get from 'lodash.get'

const renderBackgroundColor = (chart) => {
  const { ctx, config, scales } = chart
  const {
    r: { xCenter, yCenter, drawingArea: radius }
  } = scales
  const backgroundColor = get(
    config,
    'options.chartArea.backgroundColor',
    false
  )

  ctx.save()
  ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2)

  if (backgroundColor) ctx.fillStyle = backgroundColor

  ctx.fill()
  ctx.restore()
}

Chart.register({
  id: Chart.name,
  beforeDraw: renderBackgroundColor
})
