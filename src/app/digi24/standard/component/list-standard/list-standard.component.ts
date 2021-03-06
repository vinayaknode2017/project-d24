import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { HttpResponseModel } from '../../model/http-response-model';
import { StandardModel } from '../../model/standard-model';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../shared/services/global.service';
import { RootComponent } from '../../../../shared/roots/root.component';
import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-standard',
  templateUrl: './list-standard.component.html',
  styleUrls: ['./list-standard.component.scss'],
  providers: [StandardService]
})
export class ListStandardComponent extends RootComponent implements OnInit {

  standardList: StandardModel[] = [];

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor(private _standardService: StandardService,
              private router: Router,
              private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService,
              public globalService: GlobalService) { 
                super(globalService);
              }

  ngOnInit() {
    this.loadData();
  }

  viewStandard(id: string) {
    this.router.navigate(['../view'], { queryParams: { id: id }, relativeTo: this.route });
  }

  createStandard() {
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  updateStandard(standardId: string) {
    this.router.navigate(['../update'], { queryParams: { Id: standardId }, 
                                          relativeTo: this.route });
  }

  loadData() {
    this.spinnerService.show();
    this._standardService.getAllStandards().subscribe(
      (data: StandardModel[]) => {
          this.spinnerService.hide();
          
          this.standardList = data;
      },
      (error) => {
        this.spinnerService.hide();

        swal({
          title: 'erroc occured in server',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  deleteStandard() {
    swal({
      title: 'Are you sure?',
      text: 'you won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value) {
        var msg = 'Delete not implemented';
        swal('Not Deleted', msg, 'error');
      }
    })
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}
