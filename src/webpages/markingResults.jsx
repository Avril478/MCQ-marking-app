import Histogram from '../assets/histogram.png';
import { Card, Button } from '@douyinfe/semi-ui';
import ResultsPreview from '../assets/resultsPreview.png';


export function MarkingResults({ onOpenHistogramModal, onOpenConfirmationModal }) {
  const { Meta } = Card;

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
        <img
          alt="Results"
          src={ResultsPreview}
        />
      }
    >
      <Button
        theme="solid"
        type="primary"
        style={{ margin: '-30px 200px' }}
        onClick={onOpenConfirmationModal}
      >
        Download
      </Button>
    </Card>
  )
}