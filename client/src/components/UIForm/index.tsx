import { ITag } from "../../constants/tag";
import { IBaseModel } from "../../constants/general";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.css';


interface IProps<T> {
  value: T,
  tags?: ITag[],
  onUpdate: (value: T) => void
}




function UIForm<T extends IBaseModel>(props: IProps<T>) {
  const {tags, value, onUpdate} = props;


  const prices = [5, 10, 15, 20];

  return (
    <Form className="form">
      <Form.Group className="">
        <Form.Control 
          placeholder="Tags" 
          onInput={(e) => onUpdate({...value, tags: (e.target as HTMLTextAreaElement).value.split(',')})}
          value={value.tags?.toString()} 
        />
      </Form.Group>
        <div className="form__chips my-2">
           {tags ? tags.map(({name}) => {
               return <Button
                 key={name}
                 variant="primary" 
                 className="m-1"
                 onClick={() => onUpdate({...value, tags: [ value.tags?.toString(), name]})}
                >{name}
               </Button>;
           }): ''}

           {prices.map((price) => {
               return <Button 
                 key={price}
                 variant="primary" 
                 className="m-1"
                 onClick={() => onUpdate({...value, price})}
               >{price}</Button>;
           })}
        </div>
      <Form.Group className="mb-3">
        <Form.Control 
            placeholder="Currency"
            value={value.currency?.toString()}
            onInput={(e) => onUpdate({...value, currency: (e.target as HTMLTextAreaElement).value})}
         />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control 
          placeholder="price"
          value={value.price?.toString()}
          onInput={(e) => onUpdate({...value, price: (e.target as HTMLTextAreaElement).value})}
         />
         <div className="form__chips my-2">
           {prices.map((price) => {
               return <Button 
                 key={price}
                 variant="primary" 
                 className="m-1"
                 onClick={() => onUpdate({...value, price})}
               >{price}</Button>;
           })}
         </div>
      </Form.Group>
    </Form>
  );
}

export default UIForm;