import { Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { ProductService } from "./products.service";
import { get } from "http";
import { title } from "process";

@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService){}

    @Post()
    addProducts(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any{
        
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);

        return {id: generatedId }
    }

    @Get()
    getAllProducts(): any{
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodId: string){
        return this.productService.getSingleProduct(prodId);

    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number): any{

            this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
            return "successfully updated";
        }

        @Delete(':id')
        deleteProduct(@Param('id') prodId: string){
            this.productService.deleteProduct(prodId);
            return "Deleted successfully";
        }
}
