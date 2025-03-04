import React from 'react'

const NotFound = () => {

    const divStyle = {
        backgroundImage: "url('/img/404.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };

    return (
        <div style={divStyle} className='container d-flex justify-content-center vh-100'>
        </div>
    )
}

export default NotFound