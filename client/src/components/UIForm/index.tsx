import { Button, Card, CardActions, CardContent, Chip, TextField, Typography, chipClasses, typographyClasses } from "@mui/material";
import { styled } from "styled-components";
import { ITag } from "../../constants/tag";
import { IBaseModel } from "../../constants/general";
import { buttonClasses } from "@mui/base";

interface IProps<T> {
  value: T,
  tags?: ITag[],
  onUpdate: (value: T) => void
  onSend: () => void
}

const ChipsContainer = styled.div(() => ({
  marginTop: '20px', 
  justifyContent: 'space-between',
  width: '90%',
  margin: '5px auto'
}));
const StyledChip = styled(Chip)(() => ({
  [`&.${chipClasses.root}`]: {
    padding: '10px',
    margin: '2px 5px',
    fontSize: '24px',
    textTransform: 'capitalize',
    borderRadius: '5px',
  }
}));

const StyledButton = styled(Button)(() => ({
  [`&.${buttonClasses.root}`]: {
    padding: '10px',
    fontSize: '30px',
    textTransform: 'capitalize',
  }
}));

function UIForm<T extends IBaseModel>(props: IProps<T>) {
  const {tags, value, onUpdate, onSend} = props;


  const prices = [5, 10, 15, 20];

  return (
    <Card>
      <Typography variant="h5" component="div" textTransform={'uppercase'}>
        {value.type?.toString()}
      </Typography>
      <CardContent >
        <TextField 
          label="Tags" 
          variant="outlined" 
          value={value.tags?.toString()} 
          onInput={(e) => onUpdate({...value, tags: (e.target as HTMLTextAreaElement).value.split(',')})}
          fullWidth
        />
        <ChipsContainer>
          {tags ? tags.map(({name}) => {
              return <StyledChip 
                key={name}
                label={name} 
                variant="outlined" 
                clickable
                onClick={() => onUpdate({...value, tags: [ value.tags?.toString(), name]})}
              />;
          }): ''}
        </ChipsContainer>
      </CardContent>
      <CardContent >
        <TextField 
          label="Currency" 
          variant="outlined" 
          fullWidth
          value={value.currency}
          onInput={(e) => onUpdate({...value, currency: (e.target as HTMLTextAreaElement).value})}
        />
      </CardContent>
      <CardContent >
        <TextField 
          label="Price" 
          variant="outlined" 
          fullWidth
          value={value.price}
          onInput={(e) => onUpdate({...value, price: (e.target as HTMLTextAreaElement).value})}
        />
        <ChipsContainer>
          {prices.map((price) => {
              return <StyledChip 
                key={price}
                label={price} 
                variant="outlined" 
                clickable
                onClick={() => onUpdate({...value, price})}
              />;
          })}
        </ChipsContainer>
      </CardContent>
      <CardActions>
        <StyledButton onClick={onSend} color="primary" fullWidth >
          Create
        </StyledButton>
      </CardActions>
    </Card>
  );
}

export default UIForm;