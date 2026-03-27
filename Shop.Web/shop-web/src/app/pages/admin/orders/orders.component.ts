import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { map, Observable } from 'rxjs';
import { ImageMapper } from 'src/app/common/image-mapper';
import { WidgetStateWithData } from 'src/app/components/state-switcher/state-switcher.model';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';
import { OrderStatusesLabels } from 'src/app/models/constants/order-statuses';
import {
  LabelValueModel,
  OrderRequest,
  sortByForOrders,
} from 'src/app/models/interfaces/filters';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { Order } from 'src/app/models/interfaces/order';
import { AdminOrderDataService } from 'src/app/services/data/admin/admin-order-data.service';

@Component({
  selector: 'shop-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  public state$: Observable<WidgetStateWithData<Order[]>>;
  public statuses = OrderStatusesLabels;
  public sortingConfig: LabelValueModel[] = sortByForOrders;
  public selectedStatus: number;
  public total: number = 0;
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 5,
  };
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

  public handleEdit(order: Order): void {
    this.formVisible = true;
    this.currentEditId = order.id;
    this.statuses;
    this.initForm(order.status);
  }

  public onPaginationFiltersChange(event: IGetModelsRequest): void {
    this.pagination = event;
    this.loadOrders();
  }

  public onPageChange(event: PaginatorState): void {
    this.pagination = {
      ...this.pagination,
      skip: event.first,
      count: event.rows,
    };
    this.loadOrders();
  }

  private loadOrders(): void {
    const request: OrderRequest = {
      ...this.pagination,
      sortBy: undefined,
      status: Number(this.pagination.sortBy),
    };
    // this.adminOrderService.getAll(request).subscribe((data) => {
    //   data.data.forEach((data) => {
    //     data.items.forEach(
    //       (item) => (item.product = ImageMapper.mapProduct(item.product))
    //     );
    //   });

    //   this.orders = data.data;
    //   this.total = data.count;
    //   this.cd.detectChanges();
    // });
    this.state$ = this.adminOrderService.getAll(request).pipe(
      map((response) => {
        this.total = response.count;
        return response.data;
      }),
      // map через withState() додає loading/error
      withState((data) => {
        data.forEach((o) => {
          o.items.forEach(
            (item) => (item.product = ImageMapper.mapProduct(item.product))
          );
        });
        return data;
      })
    );
  }

  //TODO: fix selected status
  private initForm(status: number): void {
    this.orderForm = this.fb.group({
      status: [{ value: status }, [Validators.required]],
    });
    this.selectedStatus = status;
  }

  public save(): void {
    //   if (!this.orderForm.valid || this.currentEditId == null) return;
    //   //TODO: fix any
    //   const updatedStatus = this.orderForm.value.status;
    //   this.adminOrderService
    //     .updateStatus(this.currentEditId, updatedStatus.value)
    //     .subscribe({
    //       next: () => {
    //         const order = this.orders.find((o) => o.id === this.currentEditId);
    //         if (order) {
    //           order.status = updatedStatus.value;
    //         }
    //         this.formVisible = false;
    //         this.cd.detectChanges();
    //       },
    //       error: (err) => {
    //         console.error('Failed to update status', err);
    //       },
    //     });
  }
}
