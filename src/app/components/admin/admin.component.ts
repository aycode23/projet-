import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/class/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  admin!:Admin[]
  adminForm!:FormGroup
  constructor(private adminService:AdminService, private fb: FormBuilder){}
  ngOnInit(): void {
    this.adminService.getAdmin().subscribe(
      data => this.admin=data
    )
    this.adminForm= this.fb.group(
      {
        username:["",[Validators.required, Validators.minLength(5)]],
        pwd:["",[Validators.required,Validators.pattern(/.*[0-9].*/)]]
      }
    )
  }
  async change(pwd: string,npwd: string,vnpwd: string){
      if(await this.adminService.change(pwd,npwd,vnpwd))
      alert("mot de passe change "); 
    else
      alert("Il faut remplir tous les champs: verfier que vous avez rempli tous les champs et que les deux nouveaux mot de passe sont similaires"); 
   
    }
  

  addAdmin(){
    if(this.adminForm.valid){
      this.adminService.addAdmin(this.adminForm.value).subscribe(
        data=>{
          this.admin.push(data as Admin)}
      )
      alert("ajout avec succes")
    }
    else{
      alert("conditions non verifier")
    }
   
  }

  deleteAdmin(id:number){
    this.adminService.deleteAdmin(id).subscribe(
      data => this.admin=this.admin.filter(e=>{ return e.id != id})
    )
    alert("suppression reussite")
  }

}
