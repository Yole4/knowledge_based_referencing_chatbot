import React from 'react'

// images
import archive3 from '../../assets/images/archive-3.png';
import archive1 from '../../assets/images/archive-1.png';

function Projects() {
    return (
        <>
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0'}}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-2">
                            <div className="col-12">
                                <div className="card card-outline card-primary shadow rounded-0">
                                    <div className="card-body rounded-0">
                                        <h2>Archive List</h2>
                                        <hr className="bg-navy" />
                                        <div className="list-group">
                                            <a href="./?page=view_archive&id=3" className="text-decoration-none text-dark list-group-item list-group-item-action">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                                        <img src={archive3} className="banner-img img-fluid bg-gradient-dark" alt="Banner Image" />
                                                    </div>
                                                    <div className="col-lg-8 col-md-7 col-sm-12">
                                                        <h3 className="text-navy"><b>Online Point of Sale System for XYZ
                                                            Corp.</b></h3>
                                                        <small className="text-muted">By <b className="text-info">cblake@sample.com</b></small>
                                                        <p className="truncate-5">Curabitur a lorem vitae arcu tincidunt
                                                            suscipit. Vivamus posuere sodales diam, iaculis tempus sem
                                                            rhoncus ac. Aenean elementum dolor sed augue gravida, vel
                                                            ultrices mi sollicitudin. Sed semper sapien non tellus gravida
                                                            imperdiet. Ut condimentum libero elementum ligula congue,
                                                            rhoncus euismod orci ultricies. Suspendisse potenti. Vivamus
                                                            rhoncus iaculis justo, non ultricies odio iaculis malesuada.
                                                            Vivamus vitae odio nec est consectetur elementum. Nam et tellus
                                                            pellentesque, efficitur nibh nec, sodales nulla. Phasellus vel
                                                            nunc orci. Vestibulum vitae libero felis.Fusce tellus odio,
                                                            pellentesque id justo at, euismod eleifend nulla. Sed at dui non
                                                            dolor porta tempus vel at justo. Curabitur condimentum, ipsum eu
                                                            vehicula eleifend, lectus libero rhoncus risus, mollis porta
                                                            nulla tortor vitae felis. Cras molestie lectus diam, fermentum
                                                            posuere tellus facilisis ac. Nulla eu ante venenatis orci
                                                            egestas tempor. Sed sed ante nisl. Nulla vitae risus quam. Donec
                                                            eu neque eget urna pellentesque maximus. Mauris et lacus elit.
                                                            Vivamus ligula leo, rutrum vitae semper id, gravida in dui.
                                                            Maecenas augue arcu, egestas non dolor ut, fermentum rutrum sem.
                                                            Duis a augue et mauris efficitur finibus nec nec neque. Nulla
                                                            pulvinar, lorem sed efficitur pulvinar, nunc ex pellentesque
                                                            eros, ac volutpat mauris felis sed nunc. Phasellus porta quam a
                                                            nulla bibendum, a volutpat nisi tincidunt. Fusce sed semper
                                                            ante, ullamcorper varius eros. In feugiat est sit amet mi
                                                            accumsan, vel tempus eros pulvinar.Aenean rhoncus massa vel
                                                            convallis suscipit. Etiam pharetra, tortor vitae ornare
                                                            tincidunt, ipsum purus blandit elit, a interdum libero felis id
                                                            lectus. Curabitur eleifend pulvinar eros non mollis. Phasellus
                                                            porttitor sollicitudin metus quis congue. Maecenas sollicitudin
                                                            fermentum ullamcorper. Aenean blandit vehicula diam, a porta
                                                            nisl auctor sed. Phasellus dignissim tristique mi et faucibus.
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="./?page=view_archive&id=2" className="text-decoration-none text-dark list-group-item list-group-item-action">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                                        <img src={archive3} className="banner-img img-fluid bg-gradient-dark" alt="Banner Image" />
                                                    </div>
                                                    <div className="col-lg-8 col-md-7 col-sm-12">
                                                        <h3 className="text-navy"><b>Sample 102</b></h3>
                                                        <small className="text-muted">By <b className="text-info">jsmith@sample.com</b></small>
                                                        <p className="truncate-5">In hac habitasse platea dictumst. Curabitur
                                                            commodo nunc ac diam laoreet tempor. Donec sollicitudin lorem
                                                            ullamcorper pretium ultrices. In varius risus in erat bibendum
                                                            commodo. Ut volutpat est a mi volutpat molestie. In blandit, leo
                                                            ut gravida vulputate, metus enim rutrum nunc, id mollis felis
                                                            libero eu enim. Aenean placerat quis sapien sit amet blandit.
                                                            Sed nec lorem efficitur, congue lorem vitae, egestas justo. Cras
                                                            pulvinar, sapien vitae maximus porta, nibh libero porta risus,
                                                            lobortis porta ante sapien eu massa.Aliquam laoreet condimentum
                                                            felis eu tristique. Sed a massa nulla. Donec aliquet id ante vel
                                                            porta. Vestibulum maximus dictum aliquam. Sed molestie lobortis
                                                            ultrices. Nunc commodo dui nunc, a tincidunt lacus molestie
                                                            eget. Nullam metus enim, accumsan ac iaculis et, sollicitudin
                                                            vitae erat. Praesent molestie imperdiet libero, vel congue velit
                                                            fringilla quis. Suspendisse sollicitudin aliquet enim nec
                                                            elementum. Morbi nec aliquet mauris. Donec eleifend metus ex.In
                                                            sollicitudin elementum ante, ut elementum tortor porttitor sit
                                                            amet. Vestibulum vehicula scelerisque porta. Maecenas vestibulum
                                                            purus orci, in imperdiet velit congue fermentum. Nulla aliquam
                                                            ante ut erat sagittis, et porta arcu condimentum. Praesent
                                                            scelerisque nunc vel felis malesuada venenatis. Donec blandit
                                                            mauris eros, eget placerat nunc convallis a. Etiam ac elementum
                                                            arcu. In varius fringilla massa, at volutpat nisi blandit vel.
                                                            In hac habitasse platea dictumst. Nunc blandit venenatis felis,
                                                            a mattis nunc. Vestibulum a tempus mi. In interdum semper
                                                            laoreet. Ut vitae urna arcu. Suspendisse ac arcu quam.</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="./?page=view_archive&id=1" className="text-decoration-none text-dark list-group-item list-group-item-action">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                                        <img src={archive1} className="banner-img img-fluid bg-gradient-dark" alt="Banner Image" />
                                                    </div>
                                                    <div className="col-lg-8 col-md-7 col-sm-12">
                                                        <h3 className="text-navy"><b>Sample Project 101</b></h3>
                                                        <small className="text-muted">By <b className="text-info">jsmith@sample.com</b></small>
                                                        <p className="truncate-5">Lorem ipsum dolor sit amet, consectetur
                                                            adipiscing elit. Maecenas blandit at ipsum vitae malesuada.
                                                            Fusce vitae bibendum diam. Praesent non eros purus. Lorem ipsum
                                                            dolor sit amet, consectetur adipiscing elit. Integer et semper
                                                            velit, pharetra efficitur eros. Aenean vel dignissim eros, sit
                                                            amet pellentesque dolor. Quisque tincidunt ultricies velit sit
                                                            amet fringilla. Nunc id lobortis diam, nec finibus neque.
                                                            Curabitur faucibus feugiat placerat. Nunc at auctor nisi. Nunc
                                                            maximus cursus mi a lacinia. Fusce eget maximus metus. Duis a
                                                            tincidunt turpis. Integer dictum suscipit fringilla. Nam a eros
                                                            arcu.</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-footer clearfix rounded-0">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6"><span className="text-muted">Display Items: 3</span></div>
                                                <div className="col-md-6">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=0" disabled>«</a></li>
                                                        <li className="page-item"><a className="page-link active" href="./?page=projects&p=1">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=2" disabled>»</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Projects
