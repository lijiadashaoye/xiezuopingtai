import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MD_DIALOG_DATA,
  MdDialogRef
} from '@angular/material';
import {
  User
} from '../../domain/user.model'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef < InviteComponent >
  ) {}

  ngOnInit() {
    this.members = [...this.dialogdata.members];
  }
  save(which, ev) {
    ev.preventDefault();
    if (this.members.length > 0) {
      which == 'save' ? this.dialogref.close({
        reData: this.members
      }) : this.dialogref.close()
    }
  }
}
