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
  beforeDatasetsDraw: chart => {
    const { ctx, scale, config } = chart
    const { xCenter, yCenter, drawingArea: radius } = scale

    const strokeColor = get(config, 'options.chartArea.strokeColor', false)
    const lineWidth = get(config, 'options.chartArea.lineWidth', 0)
    const centerPointColor = get(config, 'options.scale.gridLines.color', false)

    /** start render dot in the center **/
    ctx.save()
    ctx.arc(xCenter, yCenter, radius / 16, 0, Math.PI * 2)

    if (centerPointColor) ctx.fillStyle = centerPointColor

    ctx.fill()
    /** end to render dot **/

    /** start render external ring **/
    ctx.beginPath()
    ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2)

    if (strokeColor) ctx.strokeStyle = strokeColor
    if (lineWidth) ctx.lineWidth = lineWidth

    ctx.stroke()
    /** end render external ring **/

    ctx.restore()
  }
})
