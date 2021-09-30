export const options = {
  chart: {
    polar: true,
    width: 350
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  title: {
    text: ''
  },
  pane: {
    startAngle: 0,
    endAngle: 360
  },
  xAxis: {
    gridLineWidth: 3,
    gridLineColor: '#e5e5e5',
    lineColor: '#e5e5e5',
    categories: [
      'community',
      'development',
      'infrastructure',
      'transparency',
      'trustiness'
    ],
    lineWidth: 3,
    startOnTick: true,
    tickmarkPlacement: 'on',
    labels: {
      align: 'center',
      style: {
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    gridLineWidth: 3,
    gridLineColor: '#e5e5e5',
    min: 0,
    max: 11,
    endOnTick: false,
    tickInterval: 2,
    gridLineInterpolation: 'circle',
    labels: {
      enabled: false
    }
  },

  plotOptions: {
    followPointer: true,
    series: {
      pointStart: 0
    },
    column: {
      pointPadding: 0,
      groupPadding: 0
    }
  }
}
