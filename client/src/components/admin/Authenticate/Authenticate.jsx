import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginAdmin } from '../../../redux/actions/adminAuth';
import Logo from './gymkhana.png'
import './Authenticate.css'

export default function Authenticate() {

    const dispatch = useDispatch()
    const loginURL = process.env.REACT_APP_DEV === 'true' ? "http://localhost:5000/auth/googlelogin" : "https://gymkhana-iiti.herokuapp.com/auth/googlelogin";
    console.log("LOGIN ROUTE IS ", loginURL)

    const responseSuccessGoogle = (response) => {
        console.log(response)
        axios({
            method: "POST",
            url: loginURL,
            data: { tokenId: response.tokenId }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                console.log("After google login,setting token as ", response.data.token)
                console.log("Logging in as", response.data.user.userName)
                dispatch(loginAdmin())
            }
        })
    }

    const responseErrorGoogle = (response) => {
        console.log(response)
    }

    return (
        <div className="bggg">
            <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
                        <g fill="#fff">
                            <circle cx="36" cy="36" r="36"/>
                        </g>
                        <g fill='#202D3E'>
                            <path  d="M32.5,14A1.492,1.492,0,0,1,34,15.5V38.5A1.494,1.494,0,0,1,32.5,40h-17A1.494,1.494,0,0,1,14,38.5v-23A1.494,1.494,0,0,1,15.5,14h4.873l-3-6h2.25l3,6h2.751l3-6h2.25l-3,6ZM32,16H23.623l1.266,2.546A1.13,1.13,0,0,1,25,19a1.009,1.009,0,0,1-1,1,1,1,0,0,1-.534-.149.974.974,0,0,1-.368-.4L21.375,16H16v22H32ZM20,26a3.92,3.92,0,0,1,.312-1.555,4.023,4.023,0,0,1,2.133-2.133,4.041,4.041,0,0,1,3.109,0,4.014,4.014,0,0,1,2.133,2.133A3.886,3.886,0,0,1,28,26a3.937,3.937,0,0,1-.288,1.485,3.987,3.987,0,0,1-.8,1.266A5.7,5.7,0,0,1,28.2,29.7a5.907,5.907,0,0,1,.968,1.251,6.388,6.388,0,0,1,.616,1.461A5.786,5.786,0,0,1,30,34H28a3.877,3.877,0,0,0-.312-1.554,4,4,0,0,0-2.133-2.133,4.011,4.011,0,0,0-3.109,0,4.023,4.023,0,0,0-2.133,2.133A3.912,3.912,0,0,0,20,33.995H18a5.786,5.786,0,0,1,.218-1.586,6.388,6.388,0,0,1,.616-1.461A5.933,5.933,0,0,1,19.8,29.7a5.694,5.694,0,0,1,1.288-.951,3.991,3.991,0,0,1-.8-1.267A3.945,3.945,0,0,1,20,26Zm6,0a1.92,1.92,0,0,0-.157-.781,2.039,2.039,0,0,0-1.061-1.062,2.024,2.024,0,0,0-1.563,0,2.048,2.048,0,0,0-1.061,1.062,2.021,2.021,0,0,0,0,1.562,2.042,2.042,0,0,0,1.061,1.061,2.024,2.024,0,0,0,1.563,0,2.032,2.032,0,0,0,1.061-1.061A1.927,1.927,0,0,0,26,26Z" transform='scale(1.5,1.5)'/>
                        </g>
                    </svg> */}
                    <img src={Logo} alt="Logo" height={90}/>
                </div>
                <br></br>

                <h4 className="fadeIn second">Hey, good to see you again!</h4>
                <p className="fadeIn third">Login to get going.</p>
                <br></br>
                <GoogleLogin
                    clientId="750894076426-off7cchrpi2kgcfec64h6vr2ddgl4vfn.apps.googleusercontent.com"
                    buttonText="Log in with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
                <br/><br/>
                <p className="fadeIn fourth">Please Use College ID</p>

            </div>
            </div>

        </div>
    )
}
