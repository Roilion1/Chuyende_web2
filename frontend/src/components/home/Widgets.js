import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Api } from './../../api/Api';

class FavoriteWidgetColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
    }

    componentDidMount() {
        this.loadFavorites();
        window.addEventListener("storage", this.loadFavorites);
    }

    componentWillUnmount() {
        window.removeEventListener("storage", this.loadFavorites);
    }

    loadFavorites = () => {
        const data = JSON.parse(localStorage.getItem("favorites")) || [];
        this.setState({ favorites: data });
    }

    removeFavorite = (id) => {
        const updated = this.state.favorites.filter(item => item.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        this.setState({ favorites: updated });
    }

    render() {
        const { favorites } = this.state;
        return (
            <div>
                <div className="section-title">
                    <h4 className="title">Sản phẩm yêu thích ({favorites.length})</h4>
                </div>
                <div className="row">
                    {favorites.length === 0 ? (
                        <p className="col-12 text-center text-muted">Bạn chưa yêu thích sản phẩm nào.</p>
                    ) : (
                        favorites.map((product) => (
                            <div className="col-md-3 col-sm-6 col-xs-12 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm border rounded">
                                    <img
                                        src={`${Api}/images/${product.image}`}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '160px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div className="card-body text-center">
                                        <p className="text-muted mb-1">{product.category?.name }</p>
                                        <h5 className="card-title mb-2" style={{ fontSize: '1.1rem' }}>
                                            <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                                                {product.name}
                                            </Link>
                                        </h5>
                                        <div className="mb-2">
                                            {new Date(product.sale_expires).getTime() > new Date().getTime() ? (
                                                <h6 className="text-danger">
                                                    ${product.price - (product.price * product.sale)}
                                                    <del className="text-muted ml-2">${product.price}</del>
                                                </h6>
                                            ) : (
                                                <h6 className="text-dark">${product.price}</h6>
                                            )}
                                        </div>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => this.removeFavorite(product.id)}
                                        >
                                            Bỏ yêu thích
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

class Widgets extends Component {
    render() {
        return (
            <div className="section py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <FavoriteWidgetColumn />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Widgets;
