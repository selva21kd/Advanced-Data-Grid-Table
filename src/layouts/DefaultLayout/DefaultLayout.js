import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        { 
                            props.children.props.match.path === '/' ? 'Persons' :
                            props.children.props.match.path === '/planet' ? 'Planets' :
                            props.children.props.match.path === '/vehicle' ? 'Vehicle' : 'Dashboard'
                        }
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />

                <List>
                    <Link to="/" >
                        <ListItem button>
                            <ListItemIcon> <PersonIcon /> </ListItemIcon>
                            <ListItemText primary="Persons" />
                        </ListItem>
                    </Link>
                </List>

                <List>
                    <Link to="/planet">
                        <ListItem button>
                            <ListItemIcon> <PublicIcon /> </ListItemIcon>
                            <ListItemText primary="Planets" />
                        </ListItem>
                    </Link>
                </List>

                <List>
                    <Link to="/vehicle">
                        <ListItem button>
                            <ListItemIcon> <LocalShippingIcon /> </ListItemIcon>
                            <ListItemText primary="Global" />
                        </ListItem>
                    </Link>
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
