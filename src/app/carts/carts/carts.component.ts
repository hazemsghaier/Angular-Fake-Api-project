import { Component } from '@angular/core';

@Component({
  selector: 'app-carts',
  imports: [],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
   // Example cart items (replace with your actual data)
   cartItems = [
    {
      name: 'Mens Casual Premium Slim Fit T-Shirts',
      image: 'assets/images/tshirt.png', // update with your actual path
      price: 23.5,
      quantity: 5
    },
    {
      name: 'Mens Cotton Jacket',
      image: 'assets/images/jacket.png', // update with your actual path
      price: 55.99,
      quantity: 7
    },
    {
      name: 'Acer A3 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
      image: 'assets/images/laptop.png', // update with your actual path
      price: 599,
      quantity: 9
    }
  ];

  // Clear all items from the cart
  clearCart() {
    this.cartItems = [];
  }

  // Remove a single item from the cart
  deleteItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  // Increase the quantity by 1
  incrementQuantity(item: any) {
    item.quantity++;
  }

  // Decrease the quantity by 1 (minimum 1)
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Calculate the total cost of all items in the cart
  getCartTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Placeholder for order action
  orderNow() {
    alert('Order has been placed!');
    // ... your ordering logic
  }

}
