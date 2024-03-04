import genericImage from '../../assets/generic-photo.jpg';
import { SpaceEntry } from '../model/model';
import './SpaceComponent.css';

interface SpaceComponentProps extends SpaceEntry {
  reserveSpace: (spaceId: string, spaceName: string) => void;
}

const SpaceComponent = (props: SpaceComponentProps) => (
  <div className='spaceComponent'>
    {props.photoUrl ? <img src={props.photoUrl} /> : <img src={genericImage} />}
    <label className='name'>{props.name}</label>
    <br />
    <label className='location'>{props.location}</label>
    <br />
    <button onClick={() => props.reserveSpace(props.id, props.name)}>Reserve</button>
  </div>
);

export default SpaceComponent;
