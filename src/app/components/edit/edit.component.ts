import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClubActivity } from 'src/app/class/club-activity';
import { Departement } from 'src/app/class/departement';
import { ClubActivityService } from 'src/app/services/club-activity.service';
import { DepartementService } from 'src/app/services/departement.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  dep!: Departement[];
  activityForm!: FormGroup;
  activity!: ClubActivity;
  identifiant!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private activityService: ClubActivityService,
    private depService: DepartementService
  ) {}

  ngOnInit() {
    this.identifiant = this.activatedRoute.snapshot.params['id'];
    
    this.activityService.getActivityById(this.identifiant).subscribe(
      data => {
        this.activity = data;
        this.Form();
      }
    );

    this.depService.getAllDepartements().subscribe(
      data => this.dep = data
    );
  }

  Form() {
    this.activityForm = this.fb.group({
      id: [this.activity.id],
      name: [this.activity.name, [Validators.required, Validators.minLength(5)]],
      department: [this.activity.department, Validators.required],
      picture: [this.activity.picture, [Validators.required, Validators.minLength(12)]],
      date: [this.activity.date, Validators.required],
      interne: [this.activity.interne],
      NombreDeParticipants: [this.activity.NombreDeParticipants, [Validators.required, Validators.max(200)]]
    });
  }

  onSubmit() {

    
    if (this.activityForm.valid) {
      
    this.activityService.editActivity(this.identifiant, this.activityForm.value).subscribe();
    alert("modification reussite")
    } else {
      alert("Vos champs sont invalid");
    }
  }

}
