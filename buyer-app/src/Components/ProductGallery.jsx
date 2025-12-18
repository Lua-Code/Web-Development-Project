

const ProductGallery = ({images = [] }) => {
    return (
        <div className="product-gallery">
            {images.map((pic,id) => (
                <img key={id}
                src={pic}
                alt={`Product image`}
                    />
                ) )}
        </div>
    )
}

export default ProductGallery;