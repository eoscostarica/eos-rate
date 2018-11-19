import { Chart } from 'react-chartjs-2'
import get from 'lodash.get'

Chart.pluginService.register({
  beforeDraw: chart => {
    const { ctx, scale, config } = chart
    const { xCenter, yCenter, drawingArea: radius } = scale
    const backgroundColor = get(
      config,
      'options.chartArea.backgroundColor',
      false
    )

    if (backgroundColor) {
      ctx.save()
      ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2)
      ctx.fillStyle = config.options.chartArea.backgroundColor
      ctx.fill()
      ctx.restore()
    }
  },
  afterDraw: chart => {
    const { ctx, scale, config } = chart
    const { xCenter, yCenter, drawingArea: radius } = scale
    const strokeColor = get(config, 'options.chartArea.strokeColor', false)
    const lineWidth = get(config, 'options.chartArea.lineWidth', 0)

    if (strokeColor && lineWidth) {
      ctx.beginPath()
      ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = lineWidth
      ctx.stroke()
      ctx.restore()
    }
  }
})
