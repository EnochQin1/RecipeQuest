import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/navBar.jsx';
import KellenPic from '../../images/Kellen.jpg';
import LiamPic from '../../images/liam.jpg';
import defaultProf from '../../images/UserProfileIcon.png';
import EnochPic from '../../images/xdphoto.jpg'
import DanielPic from '../../images/Daniel.jpg'

function aboutPage() {
    return (
        <div style={{ paddingBottom: 80 }}>
            <NavBar />
            <Row style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginTop: 120, dispay: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ fontFamily: 'Roboto', fontSize: 32, textAlign: 'center' }}>About Us</h1>
                        <p style={{ fontFamily: 'Roboto', textAlign: 'center', overflowWrap: 'break-work', inlineSize: 600 }}>At RecipeQuest, we are committed to creating a vibrant and inclusive
                            community of chefs and food enthusiasts. Our mission is to provide
                            a welcoming online space where culinary novices and experts alike can come
                            together to not only grow and become better chefs, but also to share, explore,
                            and celebrate the art of cooking </p>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginLeft: 50 }}>
                <Col>
                    <h1 style={{ fontFamily: 'Roboto', fontSize: 28, textAlign: 'center' }}>Kellen Neff</h1>
                    <img src={KellenPic} style={{ with: 200, height: 300 }} />
                    <p style={{ fontFamily: 'Roboto', inlineSize: 250, marginTop: 10 }}>Kellen is a Junior at Purdue University
                        studying Computer Science with a specialization in Software Engineering.</p>
                </Col>

                <Col>
                    <h1 style={{ fontFamily: 'Roboto', fontSize: 28, textAlign: 'center' }}>Liam Kelly</h1>
                    <img src={LiamPic} style={{ with: 200, height: 300 }} />
                    <p style={{ fontFamily: 'Roboto', inlineSize: 250, marginTop: 10 }}>Liam is a Junior at Purdue University
                        studying Computer Science with a specialization in Software Engineering.  He enjoys gaming and running.</p>
                </Col>

                <Col>
                    <h1 style={{ fontFamily: 'Roboto', fontSize: 28, textAlign: 'center' }}>Enoch Qin</h1>
                    <img src={EnochPic} style={{ with: 200, height: 300 }} />
                    <p style={{ fontFamily: 'Roboto', inlineSize: 250, marginTop: 10 }}>Enoch is a Junior at Purdue University
                        studying Computer Science with a specialization in Software Engineering and Security.</p>
                </Col>

                <Col>
                    <h1 style={{ fontFamily: 'Roboto', fontSize: 28, textAlign: 'center' }}>Daniel Geva</h1>
                    <img src={DanielPic} style={{ with: 200, height: 300 }} />
                    <p style={{ fontFamily: 'Roboto', inlineSize: 250, marginTop: 10 }}>Daniel is a Junior at Purdue University
                        studying Computer Science with a specialization in Software Engineering.</p>
                </Col>

            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <a style={{ cursor: 'pointer' }} href='rip-jerry'>
                        <h1 style={{ fontFamily: 'Roboto', fontSize: 28 }}>In Memory of Jerry</h1>
                    </a>
                </Col>
            </Row>
        </div>
    )
}

export default aboutPage;