import { useGetBreeds } from '../../hooks/useGetBreeds';
import { SelectBreeds } from '../../components/SelectBreeds/SelectBreeds'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

interface Props {

}

export const Main = (props: Props) => {
  const service = useGetBreeds();
  console.log(service);
  
  return (
    <main>
      <Container>
        <header>
          <h1>Cat Browser</h1>
        </header>
        <Row>
    
        </Row>
      </Container>
    </main>
  );
};
