import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from "@material-ui/core/Grid";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import {MachineContext, StapleContext, GenreContext, PeopleNumContext, MenuNumContext, TokenContext, MenuSupecifiedContext} from './context.js';


//　デフォルトデータ
import data from '../data/data.json';
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let mainFoods = data.mainFoods;
let genreNames = data.genreNames;
let cardSize = data.cardSize;
let defaultMainFood = data.defaultMainFood;
let defaultMenuNum = data.defaultMenuNum;

const MachineInputCard = () => {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         value : []
    //     }
    // }

    const [machine, setMachine] = useContext(MachineContext);
    const [staple, setStaple] = useContext(StapleContext);
    const [genre, setGenre] = useContext(GenreContext);
    const [peopleNum, setPeopleNum] = useContext(PeopleNumContext);
    const [menuNum, setMenuNum] = useContext(MenuNumContext);
    const [token, setToken] = useContext(TokenContext);
    const [isSupecified, setIsSupecified] = useContext(MenuSupecifiedContext);

    
    defaultMachine = machine;


        return (
            <Card sx={{ height:cardSize, overflow: 'auto'}}  elevation={3}>
                <CardContent>
                <Typography variant="h5" component="div">
                    マシン
                </Typography>
                <Typography variant="body2">
                    <br/>使用するマシンを選択してください
                </Typography>
                </CardContent>
                <CardActions>
                    <FormControl>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={machine}
                        name="radio-buttons-group"
                        >            
                          {Object.keys(machineNames).map
                            (
                              (machineName) => {
                                if(machineName=="amplify" && machine == "amplify"){
                                  return (
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                      <FormControlLabel value = {machineName} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={machineNames[machineName]} onChange = {e => setMachine(e.target.value)}/>
                                      </Grid>
                                      <Grid item xs={5}>
                                        <Input
                                          placeholder='トークン'
                                          type = "text"
                                          id={"input_token"}
                                          value = {token}
                                          onChange={(event) => setToken(event.target.value)}
                                        />
                                      </Grid>                                 
                                      <Grid item xs={1}>
                                        <Tooltip 
                                        title={"ここからトークンを取得してください\nhttps://amplify.fixstars.com/ja/register"} 
                                        placement="top" 
                                        arrow   
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 400 }}>
                                          <HelpOutlineIcon />
                                        </Tooltip>
                                      </Grid>
                                    </Grid>
                                  );
                                }else{
                                  return <FormControlLabel value = {machineName} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={machineNames[machineName]} onChange = {e => setMachine(e.target.value)}/>
                                }
                              }
                            )
                          }
                        </RadioGroup>                    
                    </FormControl>
                </CardActions>

                <CardContent>
                <Typography variant="h5" component="div">
                    主食
                </Typography>
                <Typography variant="body2">
                    <br/>主食を選択してください
                </Typography>
                </CardContent>
                <CardActions>
                    <FormControl>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={staple}
                        name="radio-buttons-group"
                        >
                            {Object.keys(mainFoods).map((mainFood) => {return <FormControlLabel value = {mainFood} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={mainFoods[mainFood]} onChange = {e => setStaple(e.target.value)}/>})}
                        </RadioGroup>
                    </FormControl>
                </CardActions>

                <CardContent>
                <Typography variant="h5" component="div">
                    ジャンル
                </Typography>
                <Typography variant="body2">
                    <br/>推薦する献立のジャンルを選択してください
                </Typography>
                </CardContent>
                <CardActions>
                    {/* <ExampleButtonCheckbox/> */}
                    {console.log("ジャンル:"+genre)}
                    <ExampleChoiceChipCheckbox/>
                    {/* <IconlessCheckbox/> */}
                </CardActions>

                <CardContent>
                <Typography variant="h5" component="div">
                    人数
                </Typography>
                <Typography variant="body2">
                    <br/>推薦する献立の人数を入力してください
                </Typography>
                </CardContent>
                <CardActions>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3}}>
                    <Input
                      type = "number"
                      id={"input_people"}
                      endAdornment={<InputAdornment position="end">{"人"}</InputAdornment>}
                      value = {peopleNum}
                      onChange={(event) => setPeopleNum(event.target.value)}
                    />
                  </FormControl>
                </CardActions>

                <CardContent>
                <Typography variant="h5" component="div">
                    メニュー数
                </Typography>
                <Typography variant="body2">
                    <br/>推薦する献立のメニュー数を入力してください
                </Typography>
                </CardContent>
                <CardActions>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3}}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={isSupecified}
                        // defaultValue={(()=>{if(menuNum == 0) {console.log("指定なしです");return "指定なし"}else{return "入力"}})()}
                        name="radio-buttons-group"
                        >
                          {["指定なし","入力"].map
                            (
                              (name) => {
                                if(name == "入力" && isSupecified == "入力"){
                                  return (
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                      <FormControlLabel value = {name} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={name} onChange = {e => setIsSupecified(e.target.value)}/>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Input
                                          type = "number"
                                          id={"input_menu_num"}
                                          endAdornment={<InputAdornment position="end">{"個"}</InputAdornment>}
                                          value = {menuNum}
                                          onChange={(event) => setMenuNum(event.target.value)}
                                        />
                                      </Grid>
                                    </Grid>
                                  );
                                }else{
                                  console.log(name);
                                  return <FormControlLabel value = {name} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={name} onChange = {e => setIsSupecified(e.target.value)}/>
                                }
                              }
                            )
                          }
                      </RadioGroup>
                  </FormControl>
                </CardActions>
                
            </Card>);
}


  
  function ExampleChoiceChipCheckbox() {
      const [value, setValue] = useContext(GenreContext);
      // const [value, setValue] = React.useState(["全て","和風","洋風","中華風","韓国風","エスニック"]);
      console.log("バリュー:"+value);
      return (
        <Sheet
          // variant="outlined"
          // sx={{ width: 360, p: 2, borderRadius: 'sm', bgcolor: 'background.body' }}
        >
          {/* <Typography id="rank" level="body2" fontWeight="lg" sx={{ mb: 1.5 }}>
            Choose amenities
          </Typography> */}
          <Box role="group" aria-labelledby="rank">
            <List
              row
              wrap
              sx={{
                '--List-gap': '8px',
                '--List-item-radius': '20px',
                '--List-item-minHeight': '32px',
              }}
            >
              {Object.keys(genreNames).map(
                (item, index) => (
                  <ListItem key={genreNames[item]}>
                    {value.includes(genreNames[item]) && (
                      <Done
                        fontSize="md"
                        color="primary"
                        sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none', color: '#52af77'}}
                      />
                    )}
                    <Checkbox
                      size="sm"
                      // disabled={index === 0}
                      disableIcon
                      overlay
                      label={item}
                      checked={value.includes(genreNames[item])}
                      variant={value.includes(genreNames[item]) ? 'soft' : 'outlined'}
                      onChange={(event) => {
                        console.log(item)
                        if (event.target.checked) {
                          //"全て"にチェックが入ってたら全てのカテゴリーにチェックをつける
                          if (genreNames[item] == "all"){
                              for(let genreName of Object.keys(genreNames)){
                                  if (!(value.includes(genreNames[genreName]))){
                                      setValue((val) => [...val, genreNames[genreName]]);
                                  }
                              }
                          }else{
                              setValue((val) => [...val, genreNames[item]]);
                          }
                        } else {
                          console.log(genreNames[item])
                          if(genreNames[item] == "all"){
                              setValue([]);
                          }else{
                              if(value.includes("all")){
                                  setValue((val) => val.filter((text) => text !== "all"));
                              }
                              setValue((val) => val.filter((text) => text !== genreNames[item]));
                          }
                        }
                      }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: checked
                            ? {
                                border: '1px solid',
                                borderColor: '#52af77',
                              }
                            : {},
                        }),
                      }}
                    />
                  </ListItem>
                ),
              )}
            </List>
          </Box>
        </Sheet>
      );
    }
  
  
    export default MachineInputCard