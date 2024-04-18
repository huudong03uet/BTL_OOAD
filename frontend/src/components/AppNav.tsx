'use client'
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import style from '@/styles/home/appNav.module.css'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function AlignmentExample() {
    return (
        <>
            <Nav className={ `justify-content-center ${style.Nav} mt-0 mb-4` } activeKey="/home" >
                <Nav.Item>
                    <Nav.Link href="/home" style={{ color: 'red', textTransform: 'uppercase' }}>Auctions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" style={{ color: 'red', textTransform: 'uppercase' }}>Auction Houses</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link eventKey="link-2" style={{ color: 'red', textTransform: 'uppercase' }}>Artists</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        |
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className={style.toggle}  style={{ color: 'black', textTransform: 'uppercase' }}>Art</Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                            <Dropdown.Item >Drawings</Dropdown.Item>
                            <Dropdown.Item >Mixed Media Art</Dropdown.Item>
                            <Dropdown.Item >Paintings</Dropdown.Item>
                            <Dropdown.Item >Posters</Dropdown.Item>
                            <Dropdown.Item >Prints</Dropdown.Item>
                        </Dropdown.Menu> */}
                    </Dropdown>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown as={NavItem} >
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>Home & Decor </Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                            <Dropdown.Item>American Indian Art</Dropdown.Item>
                            <Dropdown.Item>Ceramics & Pottery</Dropdown.Item>
                            <Dropdown.Item>Glass</Dropdown.Item>
                            <Dropdown.Item>Porcelain & China</Dropdown.Item>
                            <Dropdown.Item>Silver & Vertu</Dropdown.Item>
                        </Dropdown.Menu> */}
                    </Dropdown>
                </Nav.Item>
                {/* <Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>Antiques</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Bracelets</Dropdown.Item>
                            <Dropdown.Item>Costume Jewelry</Dropdown.Item>
                            <Dropdown.Item>Earrings</Dropdown.Item>
                            <Dropdown.Item>Men's Jewelry</Dropdown.Item>
                            <Dropdown.Item>Men's Watches</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item> */}
                <Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>Furniture</Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                            <Dropdown.Item>Animation Art</Dropdown.Item>
                            <Dropdown.Item>Antiques</Dropdown.Item>
                            <Dropdown.Item>Autographs</Dropdown.Item>
                            <Dropdown.Item>Couture, Fashion & Accessories</Dropdown.Item>
                            <Dropdown.Item>Electronics Collectibles</Dropdown.Item>
                        </Dropdown.Menu> */}
                    </Dropdown>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>Collectibles</Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                            <Dropdown.Item>Animation Art</Dropdown.Item>
                            <Dropdown.Item>Antiques</Dropdown.Item>
                            <Dropdown.Item>Autographs</Dropdown.Item>
                            <Dropdown.Item>Couture, Fashion & Accessories</Dropdown.Item>
                            <Dropdown.Item>Electronics Collectibles</Dropdown.Item>
                        </Dropdown.Menu> */}
                    </Dropdown>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>Coins</Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                            <Dropdown.Item>Animation Art</Dropdown.Item>
                            <Dropdown.Item>Antiques</Dropdown.Item>
                            <Dropdown.Item>Autographs</Dropdown.Item>
                            <Dropdown.Item>Couture, Fashion & Accessories</Dropdown.Item>
                            <Dropdown.Item>Electronics Collectibles</Dropdown.Item>
                        </Dropdown.Menu> */}
                    </Dropdown>
                </Nav.Item>
                <Nav.Item>
                    <Dropdown as={NavItem} 
                    
                    
                    >
                        <Dropdown.Toggle as={NavLink} className={style.toggle} style={{ color: 'black', textTransform: 'uppercase' }}>More
                        <ArrowDropDownIcon style={{ fontSize: '1.5rem' }} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align='end'>
                            <Dropdown.Item >Jewelry </Dropdown.Item>
                            <Dropdown.Item>Asian Antiques </Dropdown.Item>
                          
                            <Dropdown.Item>Fashion </Dropdown.Item>
                            <Dropdown.Item>Drawings</Dropdown.Item>
                            <Dropdown.Item>Mixed Media & Collage</Dropdown.Item>
                            <Dropdown.Item>Paintings</Dropdown.Item>
                            <Dropdown.Item>Prints & Multiples</Dropdown.Item>
                            <Dropdown.Item>Scrolls & Screens</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
            </Nav>

        </>
        
    );
}

export default AlignmentExample;