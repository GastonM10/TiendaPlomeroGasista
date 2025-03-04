import React from 'react'

export const ItemCount = ( { cantidad, handleAgregar, handleSumar, handleRestar } ) => {
    return (
        <div className='mb-1 text-center border-top m-2 border-bottom bg-light'>
            <button className='btn btn-sm m-1' onClick={handleRestar}>-</button>
            <span className='m-1'>{cantidad}</span>
            <button className='btn btn-sm m-1' onClick={handleSumar}>+</button>
            <button className='btn btn-sm m-1' onClick={handleAgregar}>Agregar 🛒 </button>
        </div>
    );
}
