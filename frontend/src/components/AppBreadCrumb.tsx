import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        </Container>
    );
}

export default BreadcrumbExample;