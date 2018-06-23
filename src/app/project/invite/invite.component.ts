import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'one'
    },
    {
      id: 2,
      name: 'two'
    },
    {
      id: 3,
      name: 'three'
    },
  ]
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {}
  save(which) {
    which?this.dialogref.close({ reData: 'invite' }):this.dialogref.close()
  }
  displayUser(user: { id: string; name: string }) {
    return user?user.name:''
  }
}
