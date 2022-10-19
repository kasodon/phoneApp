import React from 'react';
import './dashboard.scss';
import male from '../../assets/img/male.png';
import female from '../../assets/img/female.png';

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="title">
                <h2>Hey there, welcome!</h2>
            </div>
            <div className="info">
                <div className="item green">
                <div className="num one">2</div>
                    <div className="text">Total</div>
                </div>
                <div className="item orange">
                <div className="num one">2</div>
                    <div className="text">Male</div>
                </div>
                <div className="item pink">
                <div className="num one">2</div>
                    <div className="text">Female</div>
                </div>
            </div>
            <div className="contacts">
                <h3>All Contacts</h3>
                <div className="box">
                <div className="single">
                    <div className="single-one">
                        <img src={male} alt="" />
                        <p>Edewor Onyedika</p>
                    </div>
                    <div className="single-two">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                <div className="single">
                    <div className="single-one">
                        <img src={female} alt="" />
                        <p>Onyinye Chidera</p>
                    </div>
                    <div className="single-two">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard