import Cancel from '../assets/cancel.png';
import { Modal } from 'react-bootstrap';
import ReactECharts from 'echarts-for-react';
import { histogramData as getHistogramData } from '../dataProcessing/file-processor.js';

//how to find which objects in the props?
//go to App.jsx find <HistogramModal tag content. found 'onHide', so props including 1 object
//which is onHide. if have many obj, you can write as function HistogramModal({ onHide, onYes}) {...
export function HistogramModal({ onHide, data }) {

  const histogramChartData = getHistogramData(data.result, data.container);

  const option = {
    xAxis: {
      type: 'category',
      data: histogramChartData.titles,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: histogramChartData.finalValues,
        type: 'bar'
      }
    ]
  }

  //({onHide}) or (props)

  return (
    <Modal
      {...onHide}
      // {...props}
      size="lg"
      aria-labelledby="contained-histogram-title"
      centered
      show={true}

      style={{ display: 'block' }}
    >
      <Modal.Header>
        <Modal.Title id="contained-histogram-title" style={{ width: '100%', textAlign: 'center' }}>
          The number of students who answered each question correctly
        </Modal.Title>
        {/*{props.onHide}*/}
        <img src={Cancel} alt="Close" style={{ cursor: 'pointer', marginRight: '10px', width: '2em' }} onClick={onHide} />

      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <ReactECharts option={option} />

      </Modal.Body>
      {/* No Modal.Footer as per requirements */}
    </Modal>
  );
}
