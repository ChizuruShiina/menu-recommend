import * as React from 'react';
import {useState,useContext} from "react";

import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

import labelToAccurate from '../data/labelToAccurate.json';


import { 
  MachineContext,
  NutritionAndTimeContext, 
  StapleContext, 
  GenreContext, 
  PeopleNumContext, 
  MenuNumContext, 
  UseFoodNameDictContext, 
  LikeAndDislikeFoodNameDictContext, 
  TokenContext,
  MenuSupecifiedContext
} from './context.js';


// postする時に必要なデータ



const ButtonOfCreateMenus=()=>{
  const [machine, setMachine] = useContext(MachineContext);
  const [ideal, setIdeal] = useContext(NutritionAndTimeContext);
  const [want_food, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
  const [my_food, setMyFood] = useContext(LikeAndDislikeFoodNameDictContext);
  const [staple, setStaple] = useContext(StapleContext);
  const [genre, setGenre] = useContext(GenreContext);
  const [people, setPeople] = useContext(PeopleNumContext);
  const [count, setCount] = useContext(MenuNumContext);
  const [token, setToken] = useContext(TokenContext);
  const [isSupecified, setIsSupecified] = useContext(MenuSupecifiedContext);

  const [loading, setLoading] = useState(false);
  const [error_message, setErrorMessage] = useState("");

  
  const createRequest=()=>{
    let newGenre = [];
    for(let g of genre){
      if(g!="all"){
        newGenre.push(g);
      }
    }

    let newIdeal = {}
    for(let id in ideal){
      newIdeal[id]=ideal[id]
    }
    for(let category of Object.keys(newIdeal)){
      newIdeal[category]["value"]=Number(newIdeal[category]["value"])
      newIdeal[category]["param"]=parseFloat(newIdeal[category]["param"])
    }

    let tmpWantFood = {}
    for(let food in want_food){
      tmpWantFood[food] = want_food[food]
    }
    for(let food of Object.keys(tmpWantFood)){
      tmpWantFood[food]["gram"] = Number(tmpWantFood[food]["gram"])
    }

    // 食材名を食材の正しい名前に直してwantfoodを作り直す
    let allCategory = Object.values(labelToAccurate)
    let allFood = {}
    for(let category of allCategory){
      Object.assign(allFood, category);
    }
    let newWantFood = {}
    for(let food in want_food){
      let accurateFoodNames = allFood[food]
      for(let accurateFoodName of accurateFoodNames){
        newWantFood[accurateFoodName]=tmpWantFood[food]
      }
    }

    console.log(newWantFood)

    let requestBody = {
      "machine" : machine,
      "ideal" : newIdeal,
      "my_food" : my_food,
      "want_food":newWantFood,
      "staple" : staple,
      "genre" : newGenre,
      "people" : Number(people),
      "count" : (isSupecified == "指定なし"?0:Number(count)),
      "token" : token
    };
    createMenus(navigate,requestBody)
    setLoading(true);
  }

  const makeButtonOrNot = ()=>{
    if(!loading){
    return (  
      <div style={{"text-align": "center"}}>
        <Button color="success" variant="contained" endIcon={<SendIcon />} onClick={() => {createRequest()}}>
          献立を作成
        </Button>
        <Typography color="red">
            <br/>{error_message}
        </Typography>
      </div>  
      );
    }else{
      return <CircularProgress color="success" />
    }
  }

  const createMenus = (navigate, requestBody) =>{
    setErrorMessage("");
    console.log(requestBody);

    // fetch('http://localhost:8000/menu', {
    fetch('http://wrong/url/zzz', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({ 'Content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' })
    })
    .then(res => {
      if (!res.ok) {
        console.log("エラー")
      }
      console.log(res.ok)
      console.log(res.status); 
      console.log(res.statusText);
      return res.json()
    })
    .then(data => {
      console.log(data)

      // 成功した時だけ
      if(data["status"] == "Done"){
        navigate('/result', {state: {'body':data}});
      }else{
        setLoading(false); //ローディングやめる
        if(data["detail"]["title"] == "Unauthorized"){
          setErrorMessage("マシンのトークンを確認してください")
          console.log(data["detail"]["message"])
        }
        else if(data["detail"]["title"] == "Internal Server Error"){
          setErrorMessage("エラーが起きました。時間を置いてもう一度お試しください。")
          console.log(data["detail"]["message"])
          console.log(data["detail"]["error"])
        }
        else{
          setErrorMessage("エラーが起きました。時間を置いてもう一度お試しください。")
          console.log("わからないエラー")
        }
      }
    })
    .catch(error => {
      setLoading(false); //ローディングやめる
      setErrorMessage("エラーが起きました。時間を置いてもう一度お試しください。")
      console.log(error)
      console.error('通信に失敗しました', error);
    })

  }

  //画面遷移
  const navigate = useNavigate();
  return (<>{makeButtonOrNot()}</>);
  

}


var pageTransition = false;

  export default ButtonOfCreateMenus
