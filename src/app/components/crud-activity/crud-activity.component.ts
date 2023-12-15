import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubActivity } from 'src/app/class/club-activity';
import { Departement } from 'src/app/class/departement';
import { ClubActivityService } from 'src/app/services/club-activity.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-crud-activity',
  templateUrl: './crud-activity.component.html',
  styleUrls: ['./crud-activity.component.css']
})
export class CrudActivityComponent implements OnInit {
  dep!:Departement[]
  activityForm!:FormGroup;
  // file!: any;
  constructor(private fb:FormBuilder, private activityService: ClubActivityService,private depService: DepartementService){}
  ngOnInit() {
    this.activityForm=this.fb.group(
      {
        
        name: ['name',[Validators.required, Validators.minLength(5)]],
        department: ['Media',Validators.required],
        picture: ["assets/",[Validators.required,  Validators.minLength(12)]],
        date: ['2023-12-23',Validators.required],
        interne: ['true'],
        NombreDeParticipants:[17,[Validators.required, Validators.max(200)]]
      }
    )
    this.depService.getAllDepartements().subscribe(
      data => this.dep=data
    )
  }
  // onFile(e: any){
  //   // this.file = (e.target as HTMLInputElement)?.files?.[0];
  //   // this.activityForm.patchValue({ picture: this.file });
  //   // console.log(e);
  //   this.file=e.target.files[0]
  //   console.log(this.file)
  // }
  onSubmit(){
    var name=this.activityForm.get('name')?.value
    var dep=this.activityForm.get("department")?.value
    var department = this.dep.find(d => d.name === dep);
    var date=this.activityForm.get('date')?.value
    var picture=this.activityForm.get('picture')?.value
    var interne=this.activityForm.get('interne')?.value
    var NombreDeParticipants=this.activityForm.get('NombreDeParticipants')?.value
    if (this.activityForm.valid){
      this.activityService.addActivity({name,department,picture,date,NombreDeParticipants,interne}).subscribe(
        data =>{ 
        alert("ajout avec succcess")}
      )
    }
    else{
      alert("vos champs sont invalid")
    }
    
  }
}
