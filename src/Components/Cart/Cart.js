import React, { Component } from 'react';
import './Cart.css';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cartItems: cart });
  };

  updateCart = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.setState({ cartItems });
    window.dispatchEvent(new Event('cartUpdated'));
  }

  increaseQty = (id) => {
    const cart = [...this.state.cartItems];
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
      cart[index].qty += 1;
      this.updateCart(cart);
    }
  }

  decreaseQty = (id) => {
    const cart = [...this.state.cartItems];
    const index = cart.findIndex(item => item.id === id);
    if (index > -1 && cart[index].qty > 1) {
      cart[index].qty -= 1;
      this.updateCart(cart);
    } else if (index > -1 && cart[index].qty === 1) {
        this.removeItem(id);
    }
  }

  removeItem = (id) => {
    const cart = this.state.cartItems.filter(item => item.id !== id);
    this.updateCart(cart);
  }

  getTotal = () => {
    return this.state.cartItems.reduce((sum, item) => 
      sum + parseFloat(item.price) * item.qty, 0).toFixed(2);
  }

  handleCheckout = () => {
    const { cartItems } = this.state;
    const storeWhatsAppNumber = "+961xxxxxxxx"; 

    const itemDetails = cartItems.map((item, index) => {
      return (
        `${index + 1}. ID: ${item.id}, Name: ${item.name}, Qty: ${item.qty}`
      );
    }).join('\n'); 

    const message = `Hello, I would like to place an order!

*My Cart Details:*
-------------------------------------
${itemDetails}
-------------------------------------`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  render() {
    const { cartItems } = this.state;

    if (cartItems.length === 0) {
      return (
          <div className="cart-page-wrapper">
            <div className="empty-cart-container">
                <FaShoppingCart className="empty-icon"/>
                <h3>Your cart is currently empty.</h3>
                <p>Looks like you haven't made your choice yet.</p>
            </div>
          </div>
      );
    }

    return (
      <div className="cart-page-wrapper">
        <h2 className="cart-page-title">Your Shopping Bag ({cartItems.length})</h2>
        
        <div className="cart-content-grid">
            {}
            <div className="cart-items-column">
                <div className="cart-header-row">
                    <span className="h-product">Product</span>
                    <span className="h-qty">Quantity</span>
                    <span className="h-total">Total</span>
                </div>

                {cartItems.map(item => (
                    <div className="cart-card" key={item.id}>
                        {}
                        <div className="card-product-section">
                            <div className="img-wrapper">
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/${item.image}`} 
                                    alt={item.name} 
                                    className="item-image"
                                />
                            </div>
                            <div className="item-info">
                                <span className="item-name">{item.name}</span>
                                <span className="item-unit-price">{parseFloat(item.price).toFixed(2)} $ / unit</span>
                            </div>
                        </div>

                        {}
                        <div className="card-qty-section">
                            <div className="qty-selector">
                                <button onClick={() => this.decreaseQty(item.id)}><FaMinus /></button>
                                <span>{item.qty}</span>
                                <button onClick={() => this.increaseQty(item.id)}><FaPlus /></button>
                            </div>
                            <button className="remove-link" onClick={() => this.removeItem(item.id)}>
                                <FaTrash /> Remove
                            </button>
                        </div>

                        {}
                        <div className="card-price-section">
                            <span className="item-row-total">
                                {(parseFloat(item.price) * item.qty).toFixed(2)} $
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {}
            <div className="cart-summary-column">
                <div className="summary-card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{this.getTotal()} $</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span className="gold-text">{this.getTotal()} $</span>
                    </div>
                    
                    <button className="checkout-btn-whatsapp" onClick={this.handleCheckout}> 
                        <FaWhatsapp className="btn-icon" /> Checkout on WhatsApp
                    </button>
                    <p className="secure-text">🔒 Secure Checkout via WhatsApp</p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Cart;