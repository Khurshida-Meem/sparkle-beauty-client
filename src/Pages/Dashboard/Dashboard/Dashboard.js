import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from 'react-router-dom';
import MyOrders from '../MyOrders/MyOrders';
import MyReview from '../MyReview/MyReview';
import Pay from '../Pay/Pay';
import AddProduct from '../AddProduct/AddProduct';
import useAuth from '../../../hooks/useAuth';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AdminRoute from '../../SignIn/AdminRoute/AdminRoute';
import AllOrders from '../AllOrders/AllOrders';
import OrderByCatagory from '../AllOrders/OrderByCatagory';
import AllReviews from '../AllReviews/AllReviews';
import AllProducts from '../AllProducts/AllProducts';

const drawerWidth = 240;

function Dashboard(props) {

    const { firebaseContext } = useAuth();
    const { admin, logOut } = firebaseContext;

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar style={{ backgroundColor: '#f8a5b8' }} />
            <Divider />
            <List>
                <ListItem>
                    <Link style={{ textDecoration: 'none' }} color="inherit" to='/'><ListItemText primary="Home" /></Link>
                </ListItem>
                <Divider />
                <ListItem>
                    <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}`}><ListItemText primary="Dashboard" /></Link>
                </ListItem>
                <Divider />
                {admin || <Box><ListItem>
                    <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/pay`}><ListItemText primary="Pay" /></Link>
                </ListItem>
                    <Divider /></Box>}
                {admin || <Box><ListItem>
                    <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/reviews`}><ListItemText primary="Reviews" /></Link>
                </ListItem>
                    <Divider /></Box>}

                {/* for admin view */}
                {admin && <Box>
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/all_orders`}><ListItemText primary="Manage All Orders" /></Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/orders_category`}><ListItemText primary="Orders By Category" /></Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/make_admin`}><ListItemText primary="Make Admin" /></Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/add_product`}><ListItemText primary="Add Product" /></Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/manage_products`}><ListItemText primary="Manage All Products" /></Link>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link style={{ textDecoration: 'none', color: 'black' }} color="inherit" to={`${url}/all_reviews`}><ListItemText primary="Manage Reviews" /></Link>
                    </ListItem>
                    <Divider />
                </Box>}
                <ListItem>
                    <Button onClick={logOut} color="inherit">Sign Out</Button>
                </ListItem>
                <Divider />
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{ backgroundColor: '#f8a5b8' }} >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ color: 'black', fontWeight: 600 }} variant="h6" noWrap component="div">
                        My Profile
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Container>
                    <Switch>
                        <Route exact path={path}>
                            {admin ? <MakeAdmin></MakeAdmin> : <MyOrders></MyOrders>}

                        </Route>
                        <Route path={`${path}/reviews`} >
                            <MyReview></MyReview>
                        </Route>
                        <Route path={`${path}/pay`} >
                            <Pay></Pay>
                        </Route>
                        {/* for admin */}
                        <AdminRoute path={`${path}/all_orders`} >
                            <AllOrders></AllOrders>
                        </AdminRoute>
                        <AdminRoute path={`${path}/orders_category`} >
                            <OrderByCatagory></OrderByCatagory>
                        </AdminRoute>
                        <AdminRoute path={`${path}/make_admin`} >
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <AdminRoute path={`${path}/add_product`} >
                            <AddProduct></AddProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/all_reviews`} >
                            <AllReviews></AllReviews>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manage_products`} >
                            <AllProducts></AllProducts>
                        </AdminRoute>
                    </Switch>
                </Container>
            </Box>
        </Box >
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
