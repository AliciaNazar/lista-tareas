import { Component, OnInit, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TareasService } from './services/tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  
  listaDeTareas: string[]=[];
  nuevaTarea: string="";


  private _tareasService = inject(TareasService)

  ngOnInit(): void {
    this.listaDeTareas=this._tareasService.getTareas();
  }

  agregarTarea(){
    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea="";
    this.listaDeTareas=this._tareasService.getTareas();
  }
  eliminarTarea(indice: number){
    this._tareasService.eliminarTarea(indice);
    this.listaDeTareas=this._tareasService.getTareas();
  }
}
