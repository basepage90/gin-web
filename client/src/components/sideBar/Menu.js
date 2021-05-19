import React from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {updateSubject} from "store/store";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import HeadsetIcon from '@material-ui/icons/Headset';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const Div = styled.div`
  display: flex;
  width: inherit;
  flex-grow: 1;
  transition: all ${({theme}) => theme.transition.duration.standard};

  & ul { 
    width: inherit;
    height: 100%;
  }

  & a {
    text-decoration: none;
    color: #495057;
  }

  & [class*='nested'] {
    padding-left: 32px;
  }
`;

function Menu({updateSubject}){

    const updateSj = (layout,path) => {
      updateSubject(layout,path);
    };

    // list select
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event,index) => {
      setSelectedIndex(index);
    };

    // List expand
    const [openDev, setOpenDev] = React.useState(false);
    const [openMusic, setOpenMusic] = React.useState(false);

    const handleClick = (text) => {
      switch (text){
        case 'dev': setOpenDev(!openDev);
          break;
        case 'music': setOpenMusic(!openMusic);
          break;
        default :
          break;
      }
    };
    return (
    <Div >
      <List>

        <ListItem button component={Link} to="/about" selected={selectedIndex === 0} onClick={(event) => {handleListItemClick(event, 0); updateSj('About',"")} }>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>

        <ListItem button component={Link} to="/dev" selected={selectedIndex === 1}  onClick={(event) => {handleListItemClick(event , 1); handleClick("dev"); updateSj('Development',"")}} >
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="Development" />
          {openDev ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
          <Collapse in={openDev} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="nested" component={Link} to="/dev/java" onClick={ (e) => {updateSj('Development','Java')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Java" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/golang" onClick={ (e) => {updateSj('Development','Go Lang')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Go Lang" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/front-end" onClick={ (e) => {updateSj('Development','Front-End')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Front-End" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/dbms" onClick={ (e) => {updateSj('Development','DBMS')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="DBMS" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/os" onClick={ (e) => {updateSj('Development','OS')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="OS" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/architecture" onClick={ (e) => {updateSj('Development','Architecture')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Architecture" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/dev/common" onClick={ (e) => {updateSj('Development','Common')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Common" />
              </ListItem>
            </List>
          </Collapse>

        
          <ListItem button component={Link} to="/music" selected={selectedIndex === 2} onClick={(event) => {handleListItemClick(event , 2); handleClick('music');updateSj('Music',"")}}>
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            <ListItemText primary="Music" />
            {openMusic ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMusic} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="nested" component={Link} to="/music/힙합" onClick={ (e) => {updateSj('Music','힙합')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="힙합" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/hiphop" onClick={(e) => {updateSj('Music','Hiphop')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Hiphop" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/r&b" onClick={(e) => {updateSj('Music','R&B')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="R&B" />
              </ListItem>
              <ListItem button className="nested" component={Link} to="/music/pop" onClick={(e) => {updateSj('Music','Pop')}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Pop" />
              </ListItem>

             </List>
          </Collapse>
        

          <ListItem button component={Link} to="/recipe" selected={selectedIndex === 3} onClick={(event) => {handleListItemClick(event, 3); updateSj('Recipe',"")} }>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Recipe" />
          </ListItem>

      </List>
    </Div>
    )
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSubject: (layout,path) => dispatch(updateSubject({layout:layout,path:path})),
   };
}

export default connect("",mapDispatchToProps)(Menu);