import React from 'react'
import './search.bar.css'
import {Col,Form} from 'reactstrap';

const SearchBar = () => {
  return <Col lg='20'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <span>
            <i class="ri-map-pin-fill"></i>
            </span>
            <div>
                <h5>LOCATION</h5>
                <input type='text' placeholder='explore places'/>
            </div>
        </Form>
    </div>
  </Col>
}

export default SearchBar