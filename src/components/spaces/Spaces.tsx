import { useState, useEffect } from 'react';
import SpaceComponent from './SpaceComponent';
import { DataService } from '../../services/DataService';
import { NavLink } from 'react-router-dom';
import { SpaceEntry } from '../model/model';

interface SpacesProps {
  dataService: DataService;
}

const Spaces = (props: SpacesProps) => {
  const [spaces, setSpaces] = useState<SpaceEntry[]>();
  const [reservationText, setReservationText] = useState<string>();

  useEffect(() => {
    const getSpaces = async () => {
      const spaces = await props.dataService.getSpaces();
      setSpaces(spaces);
    };
    getSpaces();
  }, []);

  async function reserveSpace(spaceId: string, spaceName: string) {
    const reservationResult = await props.dataService.reserveSpace(spaceId);
    setReservationText(`You reserved ${spaceName}, reservation id: ${reservationResult}`);
  }

  return (
    <div>
      <h2>Welcome to the Spaces page!</h2>
      {reservationText ? <h2>{reservationText}</h2> : undefined}
      {!props.dataService.isAuthorized() ? (
        <NavLink to={'/login'}>Please login</NavLink>
      ) : (
        spaces?.map(spaceEntry => (
          <SpaceComponent
            key={spaceEntry.id.S}
            id={spaceEntry.id.S}
            location={spaceEntry.location.S}
            name={spaceEntry.name.S}
            photoUrl={spaceEntry.photoUrl.S}
            reserveSpace={reserveSpace}
          />
        ))
      )}
    </div>
  );
};

export default Spaces;
