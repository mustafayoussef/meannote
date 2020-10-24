import { NotesService } from './../../services/notes.service';
import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  allNotes = '';
  isLoad = false;
  noteID = '';

  constructor(private notesService: NotesService, private router: Router) {
    this.getNotes();
  }

  addNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });
  editNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });

  getNotes() {
    return this.notesService.getUserNote().subscribe((data) => {
      // console.log(data);
      if (this.notesService.userToken === localStorage.getItem('token')) {
        if (data.success) {
          this.isLoad = true;
          this.allNotes = data.notes;
        }
      } else if (
        this.notesService.userToken !== localStorage.getItem('token')
      ) {
        console.log('error');
      }
    });
  }

  addData() {
    let data = {
      title: this.addNote.value.title,
      desc: this.addNote.value.desc,
    };
    this.notesService.addNote(data).subscribe((res) => {
      if (res.success) {
        this.addNote.reset();
        $('#addNote').modal('hide');
        this.isLoad = true;
        this.getNotes();
      }
    });
  }

  getID(id) {
    this.noteID = id;
  }
  deleteNote() {
    this.notesService.deleteNote(this.noteID).subscribe((res) => {
      if (res.success) {
        $('#deleteNote').modal('hide');
        this.getNotes();
      }
    });
  }

  setValue() {
    this.notesService.getNoteByID(this.noteID).subscribe((res) => {
      this.editNote.controls.title.setValue(res.title);
      this.editNote.controls.desc.setValue(res.desc);
    });
  }
  updateNote() {
    let data = {
      title: this.editNote.value.title,
      desc: this.editNote.value.desc,
    };
    this.notesService.editNote(this.noteID, data).subscribe((res) => {
      if (res.success) {
        $('#editNote').modal('hide');
        this.isLoad = true;
        this.getNotes();
      }
    });
  }

  ngOnInit(): void {}
}
