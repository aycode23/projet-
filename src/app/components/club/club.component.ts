import { Component, Input, OnInit } from '@angular/core';
import { ClubActivity } from 'src/app/class/club-activity';
import { Departement } from 'src/app/class/departement';
import { ClubActivityService } from 'src/app/services/club-activity.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit{
  activity:ClubActivity[]=[]
  Dep!: Departement[]
  nbrParticipant!: number
  constructor( private depService: DepartementService, private activityService: ClubActivityService){}
  ngOnInit(): void {
    this.depService.getAllDepartements().subscribe(
      data => this.Dep= data
    )
      this.activityService.getAllActivities().subscribe(
        data => this.activity=data
      )
      
  }
  fetchByDep(ev:any){
    var depName=ev.target.value
    if(depName != ""){
      this.activity=this.activity.filter(act=>{
        return act.department.nom.toLowerCase().match(depName.toLowerCase())
      })
    }
    else if (depName == ""){
      this.ngOnInit()
    }
  }  

  fetchByNbr(event:any){
    var nbrParticipants=( event.target.value)
    if(nbrParticipants > 0){
      console.log(typeof(nbrParticipants))
      
      this.activity=this.activity.filter(act=>{
        return act.NombreDeParticipants==nbrParticipants
      })
    }
    else if (nbrParticipants<0){
      alert("il faut entrer un nombre > 0")
    }
    else{
      this.ngOnInit()
    }
  }
}
