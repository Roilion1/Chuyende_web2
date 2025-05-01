import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Api } from './../api/Api';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItemCount: 0,
			wishlistCount: 0,
			searchTerm: '' ,
		};
	}

	handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('cartList'); 
		localStorage.removeItem('wishlist');
		window.location.href = '/';
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.getShoppingCartCount();
			this.getWishlistCount();
		} else if (localStorage.getItem('cartList')) {
			this.props.updateCartCount(JSON.parse(localStorage.getItem('cartList')).length);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.cartCount !== prevProps.cartCount) {
			if (localStorage.getItem('token')) {
				this.getShoppingCartCount();
			} else if (localStorage.getItem('cartList')) {
				this.props.updateCartCount(JSON.parse(localStorage.getItem('cartList')).length);
			}
		}

		if (this.props.wishlistCount !== prevProps.wishlistCount) {
			if (localStorage.getItem('token')) {
				this.getWishlistCount();
			}
		}
	}

	async getShoppingCartCount() {
		try {
			const result = await axios.get(`${Api}/product/cart-list/count`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			const localCartList = JSON.parse(localStorage.getItem('cartList')) || [];
			const stockList = localCartList.map(list => list[0].stock_id);

			const cartList = [...stockList, ...result.data];
			const uniqueCartList = [...new Set(cartList)];

			this.setState({ cartItemCount: uniqueCartList.length });
			this.props.updateCartCount(uniqueCartList.length);
		} catch (error) {
			console.error(error);
		}
	}

	async getWishlistCount() {
		try {
			const result = await axios.get(`${Api}/product/wishlist/count`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			this.setState({ wishlistCount: result.data });
			this.props.updateWishlistCount(result.data);
		} catch (error) {
			console.error(error);
		}
	}
	handleSearchSubmit(event) {
		event.preventDefault();
		if (!this.state.searchTerm.trim()) {
			this.setState({ searchError: "Vui lòng nhập từ khóa tìm kiếm!" });
			return;
		}
		// Xóa lỗi nếu có từ khóa hợp lệ
		this.setState({ searchError: "" });

		// Chuyển hướng đến trang tìm kiếm
		window.location.href = `/search/${this.state.searchTerm}`;
	}

	handleSearchInputChange(event) {
		const searchTerm = event.target.value;

		if (searchTerm.length > 20) { // Nếu vượt quá 20 ký tự, báo lỗi
			this.setState({ searchError: "Không được nhập quá 20 ký tự!" });
			return; // Không cập nhật searchTerm và không chuyển hướng
		}

		// Cập nhật giá trị nhập vào và xóa lỗi nếu hợp lệ
		this.setState({ searchTerm, searchError: "" });

	}

	render() {


		return (
			<header>
				{/* TOP HEADER */}
				<div id="top-header">
					<div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<ul className="header-links" style={{ marginBottom: 0 }}>
						<li>
							<a href="tel:+84-374046081">
							<i className="fa fa-phone"></i> +84-374046081
							</a>
						</li>
						<li>
							<a href="mailto:sonlam@gmail.com">
							<i className="fa fa-envelope-o"></i> sonlam@gmail.com
							</a>
						</li>
						<li>
							<a href="https://www.google.com/maps/..." target="_blank" rel="noopener noreferrer">
							<i className="fa fa-map-marker"></i> 20 Tăng Nhơn Phú
							</a>
						</li>
						</ul>
						{/* Icon Đăng nhập / Đăng ký */}
						<div className="auth-links" style={{ display: 'flex', alignItems: 'center' }}>
							{localStorage.getItem('token') ? (
								// Nếu đã đăng nhập thì hiện Đăng xuất
								<div
								onClick={this.handleLogout.bind(this)}
								style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', cursor: 'pointer' }}
								>
								<i className="fa fa-sign-out" style={{ marginRight: '5px' }}></i> Đăng xuất
								</div>
							) : (
								// Nếu chưa đăng nhập thì hiện Đăng nhập / Đăng ký
								<>
								<div
									onClick={() => window.location.href = '/login'}
									style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', marginRight: '15px', cursor: 'pointer' }}
								>
									<i className="fa fa-sign-in" style={{ marginRight: '5px' }}></i> Đăng nhập
								</div>
								<div
									onClick={() => window.location.href = '/register'}
									style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', cursor: 'pointer' }}
								>
									<i className="fa fa-user-plus" style={{ marginRight: '5px' }}></i> Đăng ký
								</div>
								</>
							)}
						</div>
					</div>
				</div>
				{/* MAIN HEADER */}
				<div id="header">
					<div className="container">
						<div className="row">
							{/* LOGO */}
							<div className="col-md-3">
								<div className='header-logo'>
									<Link to="/">
										<img src={require("../assets/img/logop.png")} style={{ width: '60%' }} alt="Company Logo" />
									</Link>
								</div>
							</div>
							{/* SEARCH BAR */}
							<div className="col-md-6">
								<div className="header-search">
									<form onSubmit={(event) => this.handleSearchSubmit(event)}>
										<input
											className="input"
											placeholder="Tìm kiếm sản phẩm"
											value={this.state.searchTerm}
											onChange={(event) => this.handleSearchInputChange(event)}
										/>
										<button type="submit" className="search-btn">
											Tìm kiếm
										</button>
									</form>
									{/* Hiển thị thông báo lỗi nếu có */}
									{this.state.searchError && <p style={{ color: 'red', marginTop: '5px' }}>{this.state.searchError}</p>}
								</div>

							</div>

							{/* ACCOUNT */}
							<div className="col-md-3">
								<div className="header-ctn">
									{/* Wishlist */}
									<div>
										<Link to="/wishlist">
											<i className="fa fa-heart"></i>
											<span>Yêu thích</span>
											{this.props.wishlistCount > 0 && <div className="qty">{this.props.wishlistCount}</div>}
										</Link>
									</div>
									{/* Cart */}
									<div className="dropdown">
										<Link className="dropdown-toggle" to="/shopping-cart">
											<i className="fa fa-shopping-cart"></i>
											<span>Giỏ hàng</span>
											{this.props.cartCount > 0 && <div className="qty">{this.props.cartCount}</div>}
										</Link>
									</div>
									{/* Menu Toggle */}
									<div className="menu-toggle">
										<a href="st">
											<i className="fa fa-bars"></i>
											<span>Menu</span>
										</a>
									</div>
								</div>
							</div>
							{/* ACCOUNT */}
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
