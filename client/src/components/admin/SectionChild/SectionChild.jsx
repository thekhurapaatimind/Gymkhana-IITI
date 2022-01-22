import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { MenuItem, MenuList, ListItemIcon, ListItemText, makeStyles, Menu, Card, CardMedia, CardContent, CardActions, Collapse, Typography, IconButton, List, ListItem } from "@material-ui/core";
import { Delete, Edit, MoreVert } from '@mui/icons-material';

import { styles } from "../../../variable-css";

import SectionChildModal from "../Modal/SectionChildModal";

import { deleteSectionChild } from "../../../redux/actions/contentVersions"

import { sectionsChildSchema } from "../../../schema";

const useStyles = makeStyles(styles)

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    console.log(expand)
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}))

const flexContainer = {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
};


function SectionChild({ userName, sectionID, sectionChild, sectionName }) {
    const classes = useStyles()

    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const dispatch = useDispatch()
    const handleDelete = (sectionChildID) => {
        dispatch(deleteSectionChild(userName, sectionID, sectionChildID))
    }

    return (
        <div>
            <Card className={classes.sectionChildCard}>
                <span className={classes.subheading2} style={{ marginBlock: '10px' }}>{sectionChild.sectionChildName}</span>
                <CardMedia
                    component="img"
                    height="100"
                    image={sectionChild.sectionChildImage}
                    alt="event-photo"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <b>{sectionsChildSchema[sectionName].sectionChildShortDesc.label}: </b>
                        {sectionChild.sectionChildShortDesc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <>
                        <IconButton onClick={(event) => {
                            setAnchorEl(event.currentTarget)
                            setMenuOpen(true)
                        }}>
                            <MoreVert fontSize="small" />
                        </IconButton>
                        <Menu open={menuOpen} onClose={() => { setMenuOpen(false) }} anchorEl={anchorEl}>
                            <MenuList>
                                <SectionChildModal userName={userName}
                                    sectionID={sectionID}
                                    sectionName={sectionName}
                                    sectionChildID={sectionChild.sectionChildID}
                                    sectionChild={sectionChild} type={"editSectionChild"}
                                    triggerElement={
                                        <MenuItem>
                                            <ListItemIcon>
                                                <Edit fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Edit</ListItemText>
                                        </MenuItem>
                                    } />
                                <MenuItem>
                                    <ListItemIcon onClick={() => {
                                        handleDelete(sectionChild.sectionChildID)
                                    }}>
                                        <Delete fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph variant="body2" color="text.secondary">
                            <h5>{sectionsChildSchema[sectionName].sectionChildDesc.label}: </h5>
                            {sectionChild.sectionChildDesc}
                        </Typography>

                        <Typography paragraph variant="body2" color="text.secondary">
                            <h5>Links:</h5>
                            <List style={flexContainer}>
                                {sectionChild.sectionChildLinks.map((link) =>{
                                    let href = link.match(/\((..*?)\)/)? link.match(/\((..*?)\)/)[1] : null;
                                    let text = link.match(/\[(..*?)\]/)? link.match(/\[(..*?)\]/)[1] : href;
                                    return href &&
                                    (<ListItem key={link}>
                                        <a href={href} key={href} style={{ textDecoration: 'none' }} rel="noreferrer" target="_blank" > {text}</a>
                                    </ListItem>)
                                })}
                            </List>
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default SectionChild;
