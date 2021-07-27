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

const renderCenterDot = (ctx, config, scale) => {
  const {
    r: { xCenter, yCenter, drawingArea: radius }
  } = scale

  const centerDotColor = get(config, 'options.scales.gridLines.color', false)

  ctx.save()
  ctx.arc(xCenter, yCenter, radius / 16, 0, Math.PI * 2)

  if (centerDotColor) ctx.fillStyle = centerDotColor

  ctx.fill()
  ctx.restore()
}

const renderPerimeter = (ctx, config, scale) => {
  const {
    r: { xCenter, yCenter, drawingArea: radius }
  } = scale

  const strokeColor = get(config, 'options.chartArea.strokeColor', false)
  const lineWidth = get(config, 'options.chartArea.lineWidth', 0)

  ctx.beginPath()
  ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2)

  if (strokeColor) ctx.strokeStyle = strokeColor
  if (lineWidth) ctx.lineWidth = lineWidth

  ctx.stroke()
  ctx.restore()
}

Chart.register({
  id: Chart.name,
  beforeDraw: renderBackgroundColor,
  beforeDatasetsDraw: (chart) => {
    const { ctx, config } = chart

    renderCenterDot(ctx, config, config.options.scales)
    renderPerimeter(ctx, config, config.options.scales)
  }
})
