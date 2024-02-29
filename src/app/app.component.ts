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
  miColor: string="";

  private _tareasService = inject(TareasService)

  ngOnInit(): void {
    this.listaDeTareas=this._tareasService.getTareas();
    this.onListResize();
  }

  onListResize() {
    const height = this.listaDeTareas.length * 40; 
    console.log("height es: "+height);
    const opacity = this.funcionOpacidad(height);
    console.log("la opacidad es: "+opacity);
    if (opacity<=0.083){
      this.miColor = `rgba(63, 167, 164, 0.083)`;
    }else{
      this.miColor = `rgba(63, 167, 164, ${opacity})`;
    }
  }

  agregarTarea(){
    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea="";
    this.listaDeTareas=this._tareasService.getTareas();
    this.onListResize();
  }
  eliminarTarea(indice: number){
    this._tareasService.eliminarTarea(indice);
    this.listaDeTareas=this._tareasService.getTareas();
    this.onListResize();
  }
  funcionOpacidad(height: number): number {
    const minHeight = 300;
    const maxHeight = 1500;
    const opacity = (height - minHeight) / (maxHeight - minHeight);
    return Math.max(0, Math.min(1, opacity)); //para asegurar que la opacidad esté dentro del rango [0, 1]
  }
}
