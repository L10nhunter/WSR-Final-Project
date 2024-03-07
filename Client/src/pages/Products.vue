<script setup lang="ts">
import {ref} from "vue";
import {type Product, getProducts} from "@/model/products";

const products = ref([] as Product[]);

type CartItem = {
    product: Product;
    quantity: number;
}

const cart = ref([] as CartItem[]);

function addToCart(product: Product) {
    const index = cart.value.findIndex((item) => item.product.id === product.id);
    if (Products === -1) {
        cart.value.push({product, quantity: 1});
    } else {
        cart.value[Products].quantity++;
    }
}

products.value = getProducts();

</script>

<template>
    <h1 class="title">Products</h1>
    <div v-for="product in products" class="product-list">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="product.images[0]" alt="product image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{product.title}}</p>
                        <p class="subtitle is-6">{{product.description}}</p>
                    </div>
                </div>

                <div class="content">
                    <a>#{{product.category}}</a>.
                    <div class="price title is-2 has-text-grey">${{product.price}}</div>
                    <br>
                </div>
                <button @click="addToCart(product)" class="button is-primary is-centered">Add to Cart</button>
            </div>
        </div>
    </div>
    <div class="flyout">
        <h1 class="title">Cart</h1>
        <ul>
            <li v-for="item in cart">
                {{item.product.title}} x {{item.quantity}} = ${{item.product.price * item.quantity}}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.product-list {
    flex-flow: row;
    flex-basis: revert;
    justify-content: space-between;
}
.card {
    flex-basis: 15rem;
    flex-grow: 1;
    margin: .5rem;
}
.price {
    float: right;
}

.flyout {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    background-color: white;
    box-shadow: -1px 0 5px 0 rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
}


div.content {
    color: black;
}



</style>