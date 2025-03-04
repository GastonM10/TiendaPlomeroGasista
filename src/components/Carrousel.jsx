import React from 'react'

export const Carousel = () => {

    return (
        
        <section id="AutoPlayCarousel" className="carousel slide pt-5 mt-4" data-bs-ride="carousel">
  
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="../img/carousel1.jpg" className="d-block w-100" alt="Casa Contenedor 1" />
                </div>
                <div className="carousel-item">
                    <img src="../img/carousel2.jpg" className="d-block w-100" alt="Casa Contenedor 2" />
                </div>
                <div className="carousel-item">
                    <img src="../img/carousel3.jpg" className="d-block w-100" alt="Casa Contenedor 3" />
                </div>
            </div>  
    
            <button className="carousel-control-prev" type="button" data-bs-target="#AutoPlayCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
    
            <button className="carousel-control-next" type="button" data-bs-target="#AutoPlayCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>

        </section>
    )

}