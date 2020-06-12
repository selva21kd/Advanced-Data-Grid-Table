import React, { Component } from 'react';
import  axios  from 'axios';
import './style.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Pagination from '@material-ui/lab/Pagination';

export class StPlanets extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            planetsInfo: [],
            hasError: false,
            tableHeader: [
                {key: 'name', label:'Name'},
                {key: 'diameter', label:'Diameter'},
                {key: 'rotation_period', label:'Rotation Period'},
                {key: 'orbital_period', label:'Orbital Period'},
                {key: 'gravity', label:'Gravity'},
            ],
            nextEndPoint: null,
            prevEndPoint: null,
            pgCount: 1,
            currentPage: 1,
        }
        //To fetch First and last planets data
        this.handleClick = this.handleClick.bind(this);

        //To fetch data based on pagination
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
        axios.get('https://swapi.dev/api/planets/')
        .then(response => {
            this.setState({planetsInfo: response.data, nextEndPoint:response.data.next, prevEndPoint:response.data.previous, pgCount: parseInt(response.data.count/ response.data.results.length)});
        })
        .catch(err => {
            this.setState({hasError: true});
        });    
    }

    handleClick(input){
        const { planetsInfo } = this.state;
        let endPoint = input ==='first' ? 'https://swapi.dev/api/planets/' : 'https://swapi.dev/api/planets/?page='+ (parseInt(planetsInfo.count/ planetsInfo.results.length));
        let currentPage = input === 'first' ? 1 :  (parseInt(planetsInfo.count/ planetsInfo.results.length));
        axios.get(endPoint)
            .then(response => {
                this.setState({planetsInfo: response.data, nextEndPoint:response.data.next, prevEndPoint:response.data.previous, currentPage });
            })
            .catch(err => {
                this.setState({hasError: true});
            });  
    }

    handleChange = (event, page) => {
        axios.get('https://swapi.dev/api/planets/?page='+ page)
            .then(response => {
                this.setState({planetsInfo: response.data, nextEndPoint:response.data.next, prevEndPoint:response.data.previous, currentPage: page });
            })
            .catch(err => {
                this.setState({hasError: true});
            }); 
      };

    render() {
        const { planetsInfo, hasError, tableHeader, nextEndPoint, prevEndPoint, pgCount, currentPage} = this.state;
        
        if(hasError){
            return (<center>Internal Server Error</center>)
        }
        
        return (
            <div>
                <div className="root-tableTop">
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                    tableHeader.map((header) => (
                                        <TableCell component="th" scope="row" key={ header.key }>
                                            { header.label }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            {planetsInfo.length !== 0 ? 
                                <TableBody>
                                    {
                                    planetsInfo.results.map((row) => (
                                        <TableRow key={row.name}>
                                            {
                                                tableHeader.map((headerKey)=>(
                                                    <TableCell component="th" scope="row" key = {headerKey.key}>
                                                        { row[headerKey.key]}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody> 
                            : 
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan = { tableHeader.length } className="no-data">
                                            No Data Found
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </div>
                <div className = 'pagination'>
                    <span style ={{marginLeft: '150px'}}>
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            size="small"
                            disabled = { prevEndPoint === null ? true: false }
                            onClick= { ()=>this.handleClick('first') }
                        >
                            First
                        </Button>
                    </span>

                    <Pagination page = { currentPage } count={ pgCount } variant="outlined" shape="rounded" onChange = { this.handleChange }/>                     
                    
                    <span>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowForwardIcon />}
                            size="small"
                            disabled = { nextEndPoint === null ? true: false }
                            onClick= { ()=>this.handleClick('last') }
                        >
                            Last
                        </Button>
                    </span>
                </div>
            </div>
        )
    }
}

export default StPlanets
