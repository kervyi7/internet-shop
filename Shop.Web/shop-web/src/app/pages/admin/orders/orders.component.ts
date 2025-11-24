import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageMapper } from 'src/app/common/image-mapper';
import { OrderStatusesLabels } from 'src/app/models/constants/order-statuses';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { Order } from 'src/app/models/interfaces/order';
import { AdminOrderDataService } from 'src/app/services/data/admin/admin-order-data.service';

@Component({
  selector: 'shop-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  public orders: Order[];
  public statuses = OrderStatusesLabels;
  public selectedStatus: number;
  public pagination: IGetModelsRequest = { skip: 0, count: 10 };
  public formVisible = false;
  public currentEditId?: number;
  public orderForm!: FormGroup;

  constructor(
    private adminOrderService: AdminOrderDataService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.adminOrderService.getAll(this.pagination).subscribe({
      next: (orders) => {
        orders.forEach((order) => {
          order.items.forEach(
            (item) => (item.product = ImageMapper.mapProduct(item.product))
          );
        });

        this.orders = orders;
        this.cd.detectChanges();
      },
    });
  }

  public handleEdit(order: Order): void {
    this.formVisible = true;
    this.currentEditId = order.id;
    this.statuses;
    this.initForm(order.status);
  }

  //TODO: fix selected status
  private initForm(status: number): void {
    this.orderForm = this.fb.group({
      status: [{ value: status }, [Validators.required]],
    });
    this.selectedStatus = status;
  }

  public save(): void {
    if (!this.orderForm.valid || this.currentEditId == null) return;

    //TODO: fix any
    const updatedStatus = this.orderForm.value.status;

    this.adminOrderService
      .updateStatus(this.currentEditId, updatedStatus.value)
      .subscribe({
        next: () => {
          const order = this.orders.find((o) => o.id === this.currentEditId);
          if (order) {
            order.status = updatedStatus.value;
          }
          this.formVisible = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Failed to update status', err);
        },
      });
  }
}
