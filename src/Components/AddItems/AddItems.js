import React, { Component } from 'react';
import styles from './AddItems.module.css'; 
import { FaTrashAlt, FaCheckCircle, FaCloudUploadAlt, FaEdit, FaTag } from 'react-icons/fa'; 


const parseImages = (imagesJson) => {
    try {
        const images = JSON.parse(imagesJson);
        return Array.isArray(images) ? images : [];
    } catch (e) {

        return [];
    }
}

class AddItems extends Component {
    state = {
        watches: [],
        name: '',
        brand: '',
        description: '',
        color: '',        
        price: '',
        order_index: '',
        imagesToUpload: [],
        existingImages: [],
        primaryImagePath: '',
        editId: null,
    };

    componentDidMount() {
        this.fetchWatches();
    }

    fetchWatches = () => {

        fetch(`${process.env.REACT_APP_API_URL}/get_watches.php`)
            .then(res => res.json())
            .then(data => {
                if (data.success) this.setState({ watches: data.watches });
                else console.error("Failed to fetch watches:", data.message);
            })
            .catch(error => console.error("Error fetching watches:", error));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if(files.length === 0) return;

        const newPreviews = files.map(file => ({ 
            file: file, 
            url: URL.createObjectURL(file),
        }));
        
        this.setState(prevState => {
            const allNewUploads = [...prevState.imagesToUpload, ...newPreviews];
            

            if (!prevState.primaryImagePath && allNewUploads.length > 0 && prevState.existingImages.length === 0) {
                return { 
                    imagesToUpload: allNewUploads,
                    primaryImagePath: allNewUploads[0].url
                };
            }
            return { imagesToUpload: allNewUploads };
        });
        e.target.value = null;
    }


    handleRemoveImage = (pathOrUrl, isExisting) => {
        this.setState(prevState => {
            let newPrimaryPath = prevState.primaryImagePath;
            let updatedImages;
            
            if (isExisting) {

                updatedImages = prevState.existingImages.filter(img => img.path !== pathOrUrl);
                if (pathOrUrl === newPrimaryPath) newPrimaryPath = '';
            } else {

                updatedImages = prevState.imagesToUpload.filter(img => img.url !== pathOrUrl);
                const removedImage = prevState.imagesToUpload.find(img => img.url === pathOrUrl);
                if (removedImage) URL.revokeObjectURL(removedImage.url);
                if (pathOrUrl === newPrimaryPath) newPrimaryPath = '';
            }
            

            const allImages = [
                ...(!isExisting ? prevState.existingImages : updatedImages),
                ...(!isExisting ? updatedImages : prevState.imagesToUpload)
            ];
            

            if (!newPrimaryPath && allImages.length > 0) {
                newPrimaryPath = allImages[0].url || allImages[0].path;
            }
            
            return {
                [isExisting ? 'existingImages' : 'imagesToUpload']: updatedImages,
                primaryImagePath: newPrimaryPath,
            };
        });
    }

    handleSetPrimary = (pathOrUrl) => {
        this.setState({ primaryImagePath: pathOrUrl });
    }

    startEdit = (watch) => {
        const dbImages = parseImages(watch.images);
        

        const existingImagesForState = dbImages.map(path => ({ path: path }));

        this.setState({
            name: watch.name,
            brand: watch.brand,
            description: watch.description, 
            color: watch.color,              
            price: watch.price,
            order_index: watch.order_index,
            editId: watch.id,
            existingImages: existingImagesForState,
            primaryImagePath: watch.image,
            imagesToUpload: [],
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this watch? This action is permanent.')) return;

        fetch(`${process.env.REACT_APP_API_URL}/delete_watch.php?id=${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Watch deleted successfully.");
                    this.fetchWatches();
                }
                else alert(data.message);
            })
            .catch(error => console.error("Error deleting watch:", error));
    }


    resetForm = () => {

        this.state.imagesToUpload.forEach(img => URL.revokeObjectURL(img.url));
        this.setState({
            name: '', brand: '', description: '', color: '', price: '' , order_index: '',
            imagesToUpload: [], 
            existingImages: [], primaryImagePath: '', 
            editId: null
        });
    }

    handleSubmit = () => {
        const { name, brand, description, color, price, order_index, imagesToUpload, existingImages, primaryImagePath, editId } = this.state;

        if (!name.trim() || !brand.trim() || !description.trim() || !color.trim() || !price.trim()) {
            return alert('All fields are required.');
        }
        if (existingImages.length === 0 && imagesToUpload.length === 0) return alert('Select at least one image.');
        if (!primaryImagePath) return alert('Please select a primary display image.');
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('description', description);
        formData.append('color', color);            
        formData.append('price', price);
        formData.append('order_index', order_index || '999');
        

        formData.append('primaryImagePath', primaryImagePath);


        imagesToUpload.forEach(img => {
            formData.append('newImages[]', img.file);
        });


        const pathsToKeep = existingImages.map(img => img.path);
        formData.append('existingImagesJson', JSON.stringify(pathsToKeep));

        if (editId) formData.append('id', editId);
        
        fetch(`${process.env.REACT_APP_API_URL}/add_watch.php`, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(editId ? 'Watch Updated Successfully!' : 'Watch Added Successfully!');
                    this.resetForm();
                    this.fetchWatches();
                } else alert(`Error: ${data.message}`);
            })
            .catch(error => {
                console.error('Submission error:', error);
                alert('An error occurred during submission. Check console for details.');
            });
    }

    render() {
        const { name, brand, description, color, price, order_index, existingImages, imagesToUpload, watches, editId, primaryImagePath } = this.state;
        

        const allImagesForDisplay = [
            ...existingImages.map(img => ({ 
                path: img.path,
                url: `${process.env.REACT_APP_API_URL}/${img.path}`,
                isPrimary: img.path === primaryImagePath, 
                isExisting: true, 
                key: img.path
            })),
            ...imagesToUpload.map(img => ({ 
                path: img.url,
                url: img.url, 
                isPrimary: img.url === primaryImagePath, 
                isExisting: false, 
                key: img.url
            })),
        ];
        
        return (
            <div className={styles.adminWrapper}>
                <div className={styles.adminContainer}>
                    
                    {}
                    <div className={styles.adminHeader}>
                        <h2>{editId ? "Edit Watch Details" : "Add New Watch"}</h2>
                        <p>Manage your luxury timepiece inventory</p>
                    </div>

                    <div className={styles.adminContentGrid}>
                        
                        {}
                        <div className={`${styles.formSection} ${styles.inputsSection}`}>
                            <div className={styles.formGroup}>
                                <label>Watch Model Name</label>
                                <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="e.g. Rolex Submariner" className={styles.formInput} />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Brand</label>
                                    <input type="text" name="brand" value={brand} onChange={this.handleChange} placeholder="e.g. Rolex" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Price ($)</label>
                                    <input type="number" name="price" value={price} onChange={this.handleChange} placeholder="0.00" className={styles.formInput} />
                                </div>
                            </div>
                            
                            {}
                            <div className={styles.formGroup}>
                                <label>Display Order Index</label>
                                <input 
                                    type="number" 
                                    name="order_index" 
                                    value={order_index} 
                                    onChange={this.handleChange} 
                                    placeholder="1 (First), 2 (Second), etc." 
                                    className={styles.formInput} 
                                    min="1"
                                />
                                <p className={styles.inputHint}>Lower numbers appear first on the storefront.</p>
                            </div>
                            {}

                            <div className={styles.formGroup}>
                                <label>Color / Material</label>
                                <input type="text" name="color" value={color} onChange={this.handleChange} placeholder="e.g. Gold, Silver, Leather" className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea name="description" value={description} onChange={this.handleChange} rows="5" placeholder="Detailed product description..." className={styles.formInput} />
                            </div>
                        </div>

                        {}
                        <div className={`${styles.formSection} ${styles.imagesSection}`}>
                            <label className={styles.uploadBox}>
                                <FaCloudUploadAlt className={styles.uploadIcon} />
                                <span className={styles.uploadText}>Click to Upload Images</span>
                                <span className={styles.uploadHint}>Supported: JPG, PNG, WEBP</span>
                                {}
                                <input type="file" name="images" multiple onChange={this.handleFileChange} />
                            </label>

                            <div className={styles.galleryContainer}>
                                {allImagesForDisplay.length > 0 ? (
                                    <div className={styles.galleryGrid}>
                                    {allImagesForDisplay.map((image) => (
                                        <div key={image.key} className={`${styles.galleryItem} ${image.isPrimary ? styles.primaryItem : ''}`}>
                                            <img src={image.url} alt="preview" />
                                            {image.isPrimary && <div className={styles.primaryTag}><FaCheckCircle /> Main</div>}
                                            
                                            <div className={styles.itemOverlay}>
                                                <button className={`${styles.btnIcon} ${styles.primary}`} onClick={() => this.handleSetPrimary(image.path)} title="Set Main">
                                                    <FaCheckCircle />
                                                </button>
                                                <button className={`${styles.btnIcon} ${styles.delete}`} onClick={() => this.handleRemoveImage(image.path, image.isExisting)} title="Delete">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>No images selected yet</div>
                                )}
                            </div>
                        </div>

                    </div>

                    {}
                    <div className={styles.formActions}>
                        {editId && (
                            <button className={styles.btnCancel} onClick={this.resetForm}>Cancel Edit</button>
                        )}
                        <button className={styles.btnSubmit} onClick={this.handleSubmit}>
                            {editId ? "Update Watch" : "Add to Catalog"}
                        </button>
                    </div>
                </div>

                {}
                <div className={styles.inventorySection}>
                    <h3 className={styles.inventoryTitle}>Current Inventory ({watches.length})</h3>
                    <div className={styles.inventoryGrid}>
                        {watches.length > 0 ? (
                            watches.map(watch => (
                                <div key={watch.id} className={styles.inventoryCard}>
                                    <div className={styles.cardImgWrapper}>
                                        {}
                                        <img src={`${process.env.REACT_APP_API_URL}/${watch.image}`} alt={watch.name} />
                                        <span className={styles.cardPrice}>${parseFloat(watch.price).toFixed(2)}</span>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h4>{watch.name}</h4>
                                        <div className={styles.cardMeta}>
                                            <span><FaTag /> {watch.brand}</span>
                                            <span>Order: **{watch.order_index}**</span> {}
                                        </div>
                                        <div className={styles.cardButtons}>
                                            <button className={styles.btnEdit} onClick={() => this.startEdit(watch)}><FaEdit /> Edit</button>
                                            <button className={styles.btnDelete} onClick={() => this.handleDelete(watch.id)}><FaTrashAlt /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyInventory}>
                                No watches found in the catalog.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddItems;