import Histogram from '../assets/histogram.png';
import { Card, Button } from '@douyinfe/semi-ui';



export function MarkingResults({ onOpenHistogramModal, onOpenConfirmationModal, markingResult }) {

  const tableRows = markingResult.map((row, index) => (
    <tr key={index} style={index === 0 ? { fontWeight: 'bold' } : {}}>
      {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
    </tr>
  ));

  const csvData = markingResult.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(blob);
  function changeBackground(e) {
    e.target.style.background = 'rgba(187, 170, 227, 0.82)';
    e.target.style.borderRadius = '50%';
    e.target.style.boxShadow = '0 0 20px 10px rgba(187, 170, 227)'; // Adds a blurred boundary
  }

  // New function to remove the background style
  function removeBackground(e) {
    e.target.style.background = '';
    e.target.style.boxShadow = '';
  }

  return (
    <Card
      style={{
        maxWidth: '900px',
        minWidth: '500px',
        marginTop: '60px',
        border: '5px solid #673AB7',
        boxShadow: '0px 0px 5px 5px #673AB7',
      }}
      title={
        <div style={{
          fontSize: '20px', fontWeight: 'bold',
          margin: '25px'
        }}>
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
          onMouseOver={changeBackground}
          onMouseLeave={removeBackground}
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