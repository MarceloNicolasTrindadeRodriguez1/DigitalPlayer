import './App.css';
import Dashboard from './Main/Dashboard';
import React , { useEffect, useState } from 'react';
import LiveChannel from './Main/Live/LiveChannel';
import axios from 'axios';
import 'video.js/dist/video-js.css';
import Header from './Main/Header';
import Movies from './Main/Movie/Movies'
import Series from './Main/Series/Series';
import Login from './Main/Login/Login';
import AdSense from 'react-adsense'

const App = () => {
  const [page,setPage] = useState()
  const [credentials,setCredentials] = useState(JSON.parse(localStorage.getItem('cred_player')));
  const [expiration,setExpiration] = useState(new Date())
  const [language, setLanguage] = useState('Spanish'); 

  useEffect(() => {
    const getAuth = async() => {
      if(credentials && Object.entries(credentials).length !== 0){
        await axios.get(`${credentials.domain}/player_api.php?username=${credentials.username}&password=${credentials.password}`)
        .then(response =>{
          if(response.data.user_info.auth === 1){
            console.log(response.data);
            setExpiration(new Date(Number(response.data.user_info.exp_date) * 1000))
            setPage('dashboard')
          }else{
            setPage('home')
          }
        })
      }  else{
        setPage('home')
      }
    }

    getAuth()
  },[credentials])
  
  return (
    <>
    <Header language={language} setLanguage={setLanguage} setPage={setPage} setCredentials={setCredentials} credentials={credentials} />
    {
    page === 'home' ?
      <Login language={language} setPage={setPage} setCredentials={setCredentials} />
      :
    page === 'dashboard' ?
      <Dashboard language={language} expiration={expiration} setPage={setPage} />
      :
    page === 'Live' ?
      <LiveChannel language={language} credentials={credentials} />
      :
    page === 'Movie' ?
    <Movies language={language} credentials={credentials} />
    :
    page === 'Serie' ?
    <Series language={language} credentials={credentials}  />
    :
      <>
      </>
    }
    <div>
      <AdSense.Google
        client="ca-pub-6167157639317587"
        slot="6960546089"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
    </div>
    </>
  );
};

export default App;
