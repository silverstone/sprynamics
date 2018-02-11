import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '#core/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from '#app/checkout/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {

  singleAddress = true;
  mailingList = false;

  @ViewChild('quantity') quantityInput;

  userSub: Subscription;
  user: any;

  shippingForm: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder, public checkout: CheckoutService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      this.checkout.order.take(1).subscribe(order => {
        if (order.shipping) {
          this.buildForm(order.shipping);
        } else {
          this.user = user;
          this.buildForm(user);
        }
      });
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  buildForm(obj: any) {
    this.shippingForm = this.fb.group({
      'firstName': [obj.firstName || '', Validators.required],
      'lastName': [obj.lastName || '', Validators.required],
      'address1': [obj.address1 || '', Validators.required],
      'address2': [obj.address2 || ''],
      'city': [obj.city || '', Validators.required],
      'state': [obj.state || '', Validators.required],
      'zipCode': [obj.zipCode || '', Validators.required]
    });
  }

  chooseSingleAddress() {
    this.singleAddress = true;
    this.mailingList = false;
  }

  chooseMailingList() {
    this.singleAddress = false;
    this.mailingList = true;
  }

  submitForm() {

  }

  updateQuantity(amt) {
    const quantity = parseInt(amt);
    const pricing = this.checkout.calculatePricing(quantity);
    this.checkout.updateOrder('quantity', quantity);
    this.checkout.updateOrder('subtotal', pricing.subtotal);
    this.checkout.updateOrder('shippingCost', pricing.shipping);
    this.checkout.updateOrder('total', pricing.total);
  }

  continue() {
    this.checkout.updateOrder('shipping', this.shippingForm.value);
    this.router.navigate(['/checkout/payment-method']);
  }

}
