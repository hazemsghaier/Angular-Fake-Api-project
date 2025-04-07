import { Rating } from "./rating";

export interface ProductDTO{
    id:Number,
    title:string,
    price:Float32Array,
    description:string
    category:string,
    image:string,
    rating:Rating

}