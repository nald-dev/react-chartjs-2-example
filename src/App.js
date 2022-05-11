import React, { useRef } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, getElementAtEvent } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const source = {
  labels: ['Very High', 'High', 'Medium', 'Low'],
  colors: ['red', 'gold', 'forestgreen', 'steelblue' ],
  data: [100, 78 , 87, 40]
}

const pieData = [50, 150, 35];
const pieChartLabels= [
  'Item 1',
  'Item 2',
  'Item 3'
]

export const stackedBarData = {
  labels: ['9/5', '', '', '', '', '', '', '16/5', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 78 , 87, 40, 72, 29, 23, 76, 87, 32, 53, 65, 76, 32],
      backgroundColor: 'green',
    },
    {
      label: 'Dataset 2',
      data: [100, 78 , 87, 40, 72, 29, 23, 76, 87, 32, 53, 65, 76, 32],
      backgroundColor: 'lightgreen',
    },
  ],
};

export function App() {
  const { data, colors, labels } = source

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  }

  const barChartRef = useRef()
  const pieChartRef = useRef()
  const stackedBarChartRef = useRef()

  return (
    <>
      <div
        style={{
          width: 500,
          height: 300
        }}
      >
        <Bar
          ref={barChartRef}
          options={options}
          data={chartData}
          onClick={(event) => {
            const element = getElementAtEvent(barChartRef.current, event)

            if (element[0]) {
              const { index } = element[0]
              
              alert(`Item name: ${source.labels[index]}\nValue: ${source.data[index]}\n\nThis is an example alert, you can do another action if you want`)
            }
          }}
        />
      </div>

      <div
        style={{
          width: 300,
          height: 300
        }}
      >
        <Pie
          ref={pieChartRef}
          plugins={[ChartDataLabels]}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: ({formattedValue}) => {
                    return `${formattedValue} (${(formattedValue / pieData.reduce((partialSum, a) => partialSum + a, 0) * 100).toFixed(2)}%)`
                  },
                  title: ([{label}]) => {
                    return label
                  }
                },
              },
              legend: {
                position: 'right'
              },
              datalabels: {
                display: true,
                color: "black",
                font: {
                  size: 10,
                  weight: 'bolder'
                },
                formatter: (value) =>  `${(value / pieData.reduce((partialSum, a) => partialSum + a, 0) * 100).toFixed(2)}%`
              },
            },
          }}
          data={{
            labels: pieChartLabels,
            datasets: [{
              data: pieData,
              backgroundColor: [
              'rgba(255, 0, 0, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(0, 0, 255, 0.5)',
              ],
              hoverBackgroundColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(0, 0, 255, 1)',
              ],
              
            }]
          }}
          onClick={(event) => {
            const element = getElementAtEvent(pieChartRef.current, event)
            
            if (element[0]) {
              const { index } = element[0]

              alert(`Item name: ${pieChartLabels[index]}\nValue: ${pieData[index]}\n\nThis is an example alert, you can do another action if you want`)
            }
          }}  
        />
      </div>

      <div
        style = {{
          width: 500
        }}
      >
        <Bar
          ref={stackedBarChartRef}
        options={{
          plugins: {
            title: {
              display: false
            },
            legend: {
              position: 'bottom'
            }
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }} data={stackedBarData}
          onClick={(event) => {
            const element = getElementAtEvent(stackedBarChartRef.current, event)

            if (element[0]) {
              const { index, datasetIndex } =  element[0]
  
              alert(`Index: ${index}\nDataset Index: ${datasetIndex}\nValue: ${stackedBarData.datasets[datasetIndex].data[index]}\n\nThis is an example alert, you can do another action if you want`)
            }
          }}
        />
      </div>
    </>
  )
}

export default App