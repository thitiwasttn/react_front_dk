import React, {useEffect, useState} from "react";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getSearch} from "./service/SearchService";
import SearchResult from "./SearchResult/SearchResult";

const Header = (props) => {

    useEffect(() => {
    }, [])

    let initState = {
        posts: [],
        users: []
    }
    const [searchResultState, setSerchResultState] = useState(initState);

    function searchChange(event) {
        let message = event.target.value;
        if (message !== '') {
            getSearch(message).then(value => {
                setSerchResultState(value.data);
            })
        } else {
            setSerchResultState(initState);
        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">DK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll>
                            <NavLink to={"feed"} className={"nav-link"}>
                                Feed
                            </NavLink>
                            {/*<NavLink to={"profile"} className={"nav-link"}>
                                Profile
                            </NavLink>*/}
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search" onChange={searchChange}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav
                            className=""
                            style={{maxHeight: '100px'}}
                            navbarScroll>
                            {!props.isLogin ? <NavLink to={"login"} className={"nav-link"}>
                                {props.name}
                            </NavLink> : <NavLink to={"profile/" + props.user.id} className={"nav-link"}>
                                {props.name}
                            </NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*<div className={"float-end"}>
                <SearchResult data={searchResultState}/>
            </div>*/}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}
export default connect(mapStateToProps, null)(Header);