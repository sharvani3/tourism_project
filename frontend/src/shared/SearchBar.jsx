import React,{useRef} from 'react'
import './search.bar.css'
import {Col,Form} from 'reactstrap';

const SearchBar = () => {
  const locationref = useRef('')
  const searchHandler = ()=>{
    const location=locationref.current.value
    if(location===''){
      return alert('Enter Location');
    }
  }
  return <>
  <Col lg='20'>
    <div className="search__bar" align='center'>
        <Form className='d-flex align-items-center gap-4'>
            <span>
            <i class="ri-map-pin-fill"></i>
            </span>
            <div>
                <h5>Location</h5>
                <input type='text' placeholder='explore places' ref={locationref}/>
            </div>
            <span className="search__icon" type='submit' onClick={searchHandler}><i class="ri-search-line"></i></span>
        </Form>
    </div>
  </Col>
  </>
}

export default SearchBar