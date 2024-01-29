import Histogram from '../assets/histogram.png';
import { Card, Button } from '@douyinfe/semi-ui';
//import { processFiles } from "../dataProcessing/file-processor.js";
import { CSVLink } from 'react-csv';


export function MarkingResults({ onOpenHistogramModal, onOpenConfirmationModal, markingResult }) {
  console.log('markingResult:', markingResult);

  const { Meta } = Card;

  const tableRows = markingResult.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
    </tr>
  ));

  const csvData = markingResult.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(blob);

  return (
    <Card
      style={{ maxWidth: 340 }}
      title={
        <Meta
          title="Preview of the Marks (.csv)"
        />
      }
      headerExtraContent={
        <img
          src={Histogram}
          alt="Histogram"
          style={{
            width: '70px',
            height: '70px',
            marginRight: '10px',
            verticalAlign: 'middle',
            cursor: 'pointer',
          }}
          onClick={onOpenHistogramModal}
        />
      }
      cover={
        <div style={{ overflow: 'auto', maxHeight: '200px' }}>
          <table>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      }
    >
      {/*button in the <a></a> tag. so click button, trigger csvUrl */}
      <a
        href={csvUrl}
        download="results.csv"
        style={{ textDecoration: 'none' }}
      >
        <Button
          theme="solid"
          type="primary"
          style={{ margin: '-30px 200px' }}
          onClick={onOpenConfirmationModal}
        >
          Download
        </Button>
      </a>
    </Card>
  )
}