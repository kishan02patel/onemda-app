import React from 'react';
import { Link } from 'react-router-dom';


export function NavLink({to, label }) {

    return (<Link style = {{
        display: "inline-block", 
        margin: "1em", 
        padding: "1em", 
    }} to ={to} >{label}</Link>
        );

}

