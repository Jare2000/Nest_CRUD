import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";import { findIndex } from "rxjs";
{}

@Injectable()
export class ProductService {

    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        // const prodId = new Date().toString();
        const prodId = Math.random().toString() ;
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct);

        return prodId;
    }

    getAllProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){

        // const product = this.products.find(prod =>prod.id === productId);
         //if (!product){
         //throw new NotFoundException('Could not find product with id: ' +productId);
        // }

        const product = this.findProduct(productId);
        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }
    
        this.products[index] = updatedProduct;

    }

    deleteProduct(prodId: string){

        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);

    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex(prod =>prod.id === id);
        const product = this.products[productIndex];

        if (!product){
            throw new NotFoundException('Could not find product with id: ' +id);
        }
        return [product, productIndex];
    }

}  