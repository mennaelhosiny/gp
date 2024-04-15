// Import necessary libraries and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './managebuilding.css'; // Import the CSS file

const BuildingPage = () => {
  // State variables
  const [maleBuildings, setMaleBuildings] = useState([]);
  const [femaleBuildings, setFemaleBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [roomsInBuilding, setRoomsInBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isRoomSelected, setIsRoomSelected] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    // Retrieve male buildings
    axios.get('http://localhost:5000/api/supervising_system/building/male')
      .then(response => setMaleBuildings(response.data.buildings))
      .catch(error => console.error('Error retrieving male buildings:', error));

    // Retrieve female buildings
    axios.get('http://localhost:5000/api/supervising_system/building/female')
      .then(response => setFemaleBuildings(response.data.buildings))
      .catch(error => console.error('Error retrieving female buildings:', error));
  }, []);

  // Handle building selection
  const handleBuildingSelect = (buildingId, gender) => {
    // Retrieve rooms in the selected building
    axios.get(`http://localhost:5000/api/supervising_system/room/?building_id=${buildingId}`)
      .then(response => {
        setSelectedBuilding({ id: buildingId, gender, name: response.data.buildingName });
        setRoomsInBuilding(response.data.rooms);
        setSelectedRoom(null);
        setIsRoomSelected(false);
      })
      .catch(error => console.error('Error retrieving rooms:', error));
  };

  // Handle room details
  const handleRoomDetails = (roomId) => {
    // Retrieve room details based on room ID
    axios.get(`http://localhost:5000/api/supervising_system/rooms/?room_id=${roomId}`)
      .then(response => {
        setSelectedRoom(response.data.room);
        setIsRoomSelected(true);
      })
      .catch(error => console.error('Error retrieving room details:', error));
  };

  // Add building function
  const addBuilding = async (name, gender) => {
    try {
      const response = await axios.post('http://localhost:5000/api/supervising_system/building', {
        name,
        gender,
      });

      console.log(response.data.message);

      // Update the building list after adding a new building
      if (gender === 'male') {
        setMaleBuildings(prevBuildings => [...prevBuildings, { id: response.data.id, name }]);
      } else if (gender === 'female') {
        setFemaleBuildings(prevBuildings => [...prevBuildings, { id: response.data.id, name }]);
      }
    } catch (error) {
      console.error('Error adding building:', error);
    }
  };

  // Render JSX
  return (
 <div className="building-page-container">

              <nav id="sidebar" className="col-md-2 col-lg-2 d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                                  
                  <div className='buildings' >
                    <button className='adduni'>مباني الذكور</button>
                    <ul>
                      {maleBuildings.map(building => (
                        <li key={building.id} onClick={() => handleBuildingSelect(building.id, 'male')}>
                          {building.name}
                        </li>
                      ))}
                    </ul>

                    <button className='adduni'>مباني الإناث</button>
                    <ul>
                      {femaleBuildings.map(building => (
                        <li key={building.id} onClick={() => handleBuildingSelect(building.id, 'female')}>
                          {building.name}
                        </li>
                      ))}
                    </ul>

                    {/* Add Building Form */}
                    <div>
                      <button className='adduni'>إضافة مبنى</button>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const buildingName = e.target.buildingName.value;
                          const buildingGender = e.target.buildingGender.value;
                          addBuilding(buildingName, buildingGender);
                          e.target.reset();
                        }}
                      >
                        <label htmlFor="buildingName">اسم المبنى:</label>
                        <input className='form-control' type="text" id="buildingName" name="buildingName" required  />

                        <label htmlFor="buildingGender">نوع المبنى:</label>
                        <select className='form-control' id="buildingGender" name="buildingGender" required>
                        <option value="">اختر .</option>
                          <option value="ذكر">ذكور</option>
                          <option value="انثي">اناث</option>
                        </select>

                        <button type="submit" className='btn btn gold-bg-color text-white'>إضافة</button>
                      </form>
                    </div>
                  </div>
                    </div>
                </nav>


      {/* Main Content for Rooms */}
      <div className="building-main-content ">
        {selectedBuilding && (
          <div>
            <h3>{selectedBuilding.gender === 'male' ? 'مبنى ذكر' : 'مبنى أنثى'}: {selectedBuilding.name}</h3>

            {/* Add a button to navigate to the AddRoomPage with buildingId */}
            <Link to={`/addroom/${selectedBuilding.id}`} className="btn btn main-bg-color text-white">
              إضافة غرفة جديدة
            </Link>

            {roomsInBuilding.length > 0 ? (
              <table >
                <thead>
                  <tr>
                    <th>رقم الغرفة</th>
                    <th>النوع</th>
                    <th>تفاصيل</th>
                    <th>تعديل</th>
                  </tr>
                </thead>
                <tbody>
                  {roomsInBuilding.map(room => (
                    <tr key={room.id}>
                      <td>{room.room_number}</td>
                      <td>{room.type}</td>
                      <td>
                        <button className='btn btn main-bg-color text-white' onClick={() => handleRoomDetails(room.id)}>تفاصيل</button>
                      </td>
                      <td>
                        <Link
                          to={`/updateroom/${room.id}`}
                          className="btn btn gold-bg-color text-white mx-2"
                        >
                          تعديل
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No rooms available in this building.</p>
            )}

            {/* Display room details if a room is selected */}
            {isRoomSelected && (
              <div>
                <h4>تفاصيل الغرفة: {selectedRoom.room_number}</h4>
                <p>النوع: {selectedRoom.type}</p>
                <p>السعة: {selectedRoom.cap}</p>
                <p>الحالة: {selectedRoom.status}</p>
                {/* Include your room details JSX here */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingPage;
