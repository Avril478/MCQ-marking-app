import Histogram from '../assets/histogram.png';
import { Card, Button } from '@douyinfe/semi-ui';



export function MarkingResults({ onOpenHistogramModal, onOpenConfirmationModal, markingResult }) {
  console.log('markingResult:', markingResult);

  const { Meta } = Card;

  const tableRows = markingResult.map((row, index) => (
    <tr key={index} style={index === 0 ? { fontWeight: 'bold' } : {}}>
      {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
    </tr>
  ));

  const csvData = markingResult.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(blob);


  return (
    <Card
      style={{
        maxWidth: '900px',
        minWidth: '500px',
        marginTop: '60px',
        border: '5px solid #800080',
        boxShadow: '0px 0px 6px 0px #800080',
      }}
      title={
        <div style={{
          fontSize: '20px', fontWeight: 'bold',
          margin: '25px'
        }}> {/* Explicit styling */}
          Preview of the Marks (.csv)
        </div>
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
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

      }}>
        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
          <table style={{ width: '100%', textAlign: 'left' }}> {/* Adjust table style */}
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '10px',
        }}>
          {/*button in the <a></a> tag. so click button, trigger csvUrl */}
          <a
            href={csvUrl}
            download="results.csv"
            style={{ textDecoration: 'none' }}
          >
            <Button
              theme="solid"
              type="primary"
              style={{
                fontSize: '16px',
                padding: '20px 20px',
                margin: '0px'
              }}
              onClick={onOpenConfirmationModal}
            >
              Download
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
}