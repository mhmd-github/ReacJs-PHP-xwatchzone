import React, { Component } from 'react';
import styles from './Items.module.css';
import { FaShoppingCart, FaTimes, FaCheckCircle, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ITEMS_PER_LOAD = 6; 

const parseImages = (primaryPath, imagesJson) => {
    let allPaths = [`${process.env.REACT_APP_API_URL}/${primaryPath}`];
    try {
        const secondaryImages = JSON.parse(imagesJson);
        if (Array.isArray(secondaryImages)) {
            secondaryImages.forEach(path => {
                const fullUrl = `${process.env.REACT_APP_API_URL}/${path}`;
                if (allPaths.indexOf(fullUrl) === -1) {
                    allPaths.push(fullUrl);
                }
            });
        }
    } catch (e) {
        console.warn("Could not parse image JSON:", e);
    }
    return allPaths;
}

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            watches: [],
            searchTerm: '', 
            maximizedImage: null, 
            showToast: false,
            toastMessage: '',
            visibleItemCount: ITEMS_PER_LOAD,
            currentImageIndexes: {}, 
        };
        this.toastTimeout = null;
    }

    componentDidMount() {
        this.fetchWatches();
    }
    
    componentWillUnmount() {
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
    }

    fetchWatches = () => {
        fetch(`${process.env.REACT_APP_API_URL}/get_watches.php`)
            .then(res => res.json())
            .then(data => {
                const watches = data.watches || [];
                const initialIndexes = watches.reduce((acc, watch) => {
                    acc[watch.id] = 0; 
                    return acc;
                }, {});
                
                this.setState({ 
                    watches: watches,
                    currentImageIndexes: initialIndexes
                });
            })
            .catch(err => console.log(err));
    };

    handlePrevImage = (watchId, allImages, e) => {
        if (e) e.stopPropagation();
        this.setState(prevState => {
            const currentIndex = prevState.currentImageIndexes[watchId] || 0;
            const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            return {
                currentImageIndexes: { ...prevState.currentImageIndexes, [watchId]: newIndex }
            };
        });
    }

    handleNextImage = (watchId, allImages, e) => {
        if (e) e.stopPropagation();
        this.setState(prevState => {
            const currentIndex = prevState.currentImageIndexes[watchId] || 0;
            const newIndex = (currentIndex + 1) % allImages.length;
            return {
                currentImageIndexes: { ...prevState.currentImageIndexes, [watchId]: newIndex }
            };
        });
    }

    addToCart = (watch) => {
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existing = cart.find(item => item.id === watch.id);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...watch, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated')); 

        this.showConfirmationToast(`Added ${watch.name} to cart`);
    };
    
    showConfirmationToast = (message) => {
        this.setState({ showToast: true, toastMessage: message }, () => {
            this.toastTimeout = setTimeout(() => {
                this.setState({ showToast: false, toastMessage: '' });
            }, 3000);
        });
    }

    openModal = (imagePath) => {
        this.setState({ maximizedImage: imagePath });
    };

    closeModal = () => {
        this.setState({ maximizedImage: null });
    };
    
    handleSearchChange = (event) => {
        this.setState({ 
            searchTerm: event.target.value,
            visibleItemCount: ITEMS_PER_LOAD
        });
    }

    handleLoadMore = () => {
        this.setState(prevState => ({
            visibleItemCount: prevState.visibleItemCount + ITEMS_PER_LOAD
        }));
    }

    render() {
        const { watches, maximizedImage, showToast, toastMessage, searchTerm, visibleItemCount, currentImageIndexes } = this.state;
        
        const allFilteredWatches = watches.filter(watch => 
            watch.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const displayedWatches = allFilteredWatches.slice(0, visibleItemCount);
        const hasMoreWatches = allFilteredWatches.length > displayedWatches.length;

        return (
            <div className={styles.mainWrapper}>
                
                {}
                <div className={`${styles.toastNotification} ${showToast ? styles.showToast : ''}`}>
                    <FaCheckCircle className={styles.toastIcon} />
                    <span className={styles.toastText}>{toastMessage}</span>
                </div>

                {}
                <div className={styles.stickyHeader}>
                    <div className={styles.filterContainer}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search collection..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                </div>

                <div className={styles.itemsContainer}>
                    {}
                    <div className={styles.grid}>
                        {displayedWatches.map(watch => {
                            const allImageUrls = parseImages(watch.image, watch.images);
                            const currentIndex = currentImageIndexes[watch.id] || 0;
                            const currentImageUrl = allImageUrls[currentIndex];
                            const canSwipe = allImageUrls.length > 1;

                            return (
                                <div className={styles.watchCard} key={watch.id}>
                                    
                                    {}
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={currentImageUrl}
                                            alt={watch.name}
                                            className={styles.watchImg}
                                            onClick={() => this.openModal(currentImageUrl)}
                                        />
                                        
                                        {}
                                        {canSwipe && (
                                            <>
                                                <button 
                                                    className={`${styles.btnSwipe} ${styles.prevBtn}`} 
                                                    onClick={(e) => this.handlePrevImage(watch.id, allImageUrls, e)}
                                                >
                                                    <FaChevronLeft />
                                                </button>
                                                <button 
                                                    className={`${styles.btnSwipe} ${styles.nextBtn}`} 
                                                    onClick={(e) => this.handleNextImage(watch.id, allImageUrls, e)}
                                                >
                                                    <FaChevronRight />
                                                </button>
                                                <div className={styles.imageCounter}>
                                                    {currentIndex + 1} / {allImageUrls.length}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {}
                                    <div className={styles.cardInfo}>
                                        <h3 className={styles.watchName}>{watch.name}</h3>
                                        <p className={styles.watchPrice}>${Number(watch.price).toLocaleString()}</p>
                                        
                                        <button 
                                            className={styles.cartBtn} 
                                            onClick={() => this.addToCart(watch)}
                                        >
                                            <span className={styles.btnText}>Add to Cart</span>
                                            <span className={styles.btnIcon}><FaShoppingCart /></span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {allFilteredWatches.length === 0 && (
                            <div className={styles.noResults}>
                                <h3>No timepieces found</h3>
                                <p>Try adjusting your search terms.</p>
                            </div>
                        )}
                    </div>
                    
                    {}
                    {hasMoreWatches && (
                        <div className={styles.loadMoreContainer}>
                            <button 
                                className={styles.loadMoreBtn} 
                                onClick={this.handleLoadMore}
                            >
                                View More Timepieces
                            </button>
                        </div>
                    )}
                </div>

                {}
                {maximizedImage && (
                    <div className={styles.modalOverlay} onClick={this.closeModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={this.closeModal}>
                                <FaTimes />
                            </button>
                            <img 
                                src={maximizedImage} 
                                alt="Detail View" 
                                className={styles.maximizedImg} 
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Items;