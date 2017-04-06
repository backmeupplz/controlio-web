import {Component} from "@angular/core";

@Component({
    selector: "account-recovery-modal",
    template: `
    <div class="modal-view-layout" (click)="myModal.close()"></div>
<route-modal [cancelUrl]="['../']" modalClass="modal-view"  [closeOnOutsideClick]="true">
    <modal-content>
        <account-recovery></account-recovery>
    </modal-content>
</route-modal>
`
})
export class AccountRecoveryModal {

}