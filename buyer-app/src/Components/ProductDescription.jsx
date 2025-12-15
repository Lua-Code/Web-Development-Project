

const ProductDescription = ({descr,specs}) =>{
    return(
    <div className="product-description">
        <h3>Description </h3>
        <p>{descr}</p>

        {specs && (
        <>
        <h4>Specifications</h4>
        <ul>
            {Object.entries(specs).map(([Key,value]) => (
              <li key={Key}>
                <strong>{Key}:</strong> {value}
              </li>
            ))}

        </ul>
        </>
        )}

    </div>
    )
}

export default ProductDescription;