import React from 'react'
import '../styles/home.css'
import SearchBar from '../shared/SearchBar';
import { Container, Row,Col } from 'reactstrap';
import ServiceList from '../services/ServiceList';

const Home = () => {
  return (
    <>
      <section>
      <Container>
        <Row>
          <SearchBar></SearchBar>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col lg='3'>
          <h3 className='services__title'>Our Services</h3>
          </Col>
          <ServiceList></ServiceList>
        </Row>
      </Container>
    </section>

    {/* featured tours start */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
          <h2 className='featured__tour-title'>Our Featured Tours</h2>
          </Col>
        </Row>
      </Container>
    </section>
    {/* featured tours end */}
    </>
    
    
  )
}

export default Home;