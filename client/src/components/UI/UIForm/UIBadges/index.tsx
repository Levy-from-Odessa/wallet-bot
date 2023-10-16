import { Button } from "react-bootstrap";

interface UIBadgesProps {
  items: string[]| number[] | undefined,
  onBadgeClick: (item: string | number) => void
}

function UIBadges({items, onBadgeClick}: UIBadgesProps) {
  if (!items) {
    return null
  }

  return ( 
    <div className="form__chips my-2">
        {items ? items.map((item) => {
            return <Button
              key={item}
              variant="primary" 
              className="m-1"
              onClick={() => onBadgeClick(item)}
            >
              {item}
            </Button>;
        }): ''}
    </div>
   );
}

export default UIBadges;