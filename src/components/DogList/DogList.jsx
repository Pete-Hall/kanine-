import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


function DogList(props) {

const dispatch = useDispatch();
const history = useHistory();
const dogs = useSelector((store) => store.dogs);

const [gridData, setGridData] = useState([]);

useEffect(() => {
  dispatch({type: 'GET_DOGS'});
}, [])

// useEffect(()=> { // https://www.freecodecamp.org/news/how-to-integrate-material-ui-data-grid-in-react-using-data-from-a-rest-api/ 
//   setGridData(dogs);
// }, [dogs]);

const dogDetails = (e) => {
  console.log(e);
  history.push(`/details/${e}`)
}

const getFullSchedule = (params) => {
  let schedule = [];
  if(params.row.monday) {
    schedule = [...schedule, 'M']
  } 
  if(params.row.tuesday) {
    schedule = [...schedule, 'T']
  }
  if(params.row.wednesday) {
    schedule = [...schedule, 'W']
  }
  if(params.row.thursday) {
    schedule = [...schedule, 'R']
  }
  if(params.row.friday) {
    schedule = [...schedule, 'F']
  }
  return schedule;
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90
  },
  {
    field: 'dog_name',
    headerName: 'Dog Name',
    width: 90
  },
  {
    field: 'name',
    headerName: 'Route',
    width: 110
  },
  {
    field: 'schedule',
    headerName: 'Schedule',
    width: 90,
    valueGetter: getFullSchedule
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Dog Details',
    width: 150,
    getActions: ({id}) => {
      return [
        <Button onClick={() => dogDetails(id)}>Dog Details</Button> // https://mui.com/x/react-data-grid/editing/#full-featured-crud-component
      ]
    }
  },
]

  return (
    <div className='container'>
      <h2>Dog List</h2>
      <div style={{ height: 250, width: '75%' }}>
        {
          dogs.length > 0 ?
          // dogs.map(dog => (
          //   <li key={dog.id}>{dog.dog_name}, {dog.monday.toString()} ,{dog.driving_routeID}</li>
          //   // <p>{JSON.stringify(dog)}</p>
            
          // ))
          <DataGrid
        columns={columns}
        // rows={[{id: 1, name: 'test'}]}
        rows={dogs}
        getRowId={(dog) => dog.id} 
        />
          :
          <p>Loading...</p>
        }
      </div>
      
      
    </div>
  );
}

export default DogList;
