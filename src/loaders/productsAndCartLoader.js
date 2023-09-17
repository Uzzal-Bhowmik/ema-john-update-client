import { getShoppingCart } from "../utilities/fakedb";

const productAndCartLoader = async () => {
    let products = await fetch("/products.json");
    products = await products.json();

    // loading product from local-storage data
    const savedCart = getShoppingCart();
    let storedCart = [];

    for (const productId in savedCart) {
        const addedProduct = products.find(product => product.id === productId)

        if (addedProduct) {
            // adding quantity
            const quantity = savedCart[productId];
            addedProduct.quantity = quantity;

            storedCart.push(addedProduct)
        }
    }

    return { products, storedCart };
}

export { productAndCartLoader };