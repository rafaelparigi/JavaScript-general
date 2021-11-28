import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';

const CardList = (props) => {
  return(
    <div>
      {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
  );
};

const Card = (props) => {
  return (
    <div>
      <img src={props.avatar_url} alt='avatar'/>
      <div>
        <div>{props.name}</div>
        <div>{props.location}</div>
      </div>
    </div>
  );
};

const Form = (props) => {
  const [nameField, setNameField] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp  = await axios.get(`https://api.github.com/users/${nameField}`);
    props.onSubmit(resp.data);
    setNameField('');
  };

  return(
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={nameField}
        onChange={event => setNameField(event.target.value)}
        placeholder="GitHub username" 
        required
      />
      <Button className="my-button" type="submit" color="secondary" startIcon={<SaveIcon/>}>Add cart</Button>
    </form>
  );
};

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const addNewProfile = (profileData) => {
    setProfiles(prevProfiles => [...prevProfiles, profileData]);
  };

  return (
    <div>
      <TextField type="date"/>
      <p>Hey there!</p>
      <Form onSubmit={addNewProfile}/>
      <CardList profiles={profiles}/>
    </div>
    );
};

export default App;
