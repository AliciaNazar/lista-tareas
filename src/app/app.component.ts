import { Component, ElementRef, HostListener, OnInit, ViewChild, inject} from '@angular/core';
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

  height:number=0;
  valorColor: string = "";
  miColor: string="";

  @ViewChild('div1', { static: false }) div1!: ElementRef;

  @HostListener('window:resize',['$event'])
    onDivResize(event: Event) {
      this.height = this.div1.nativeElement.offsetHeight;
      // console.log("Nueva altura del div: ", this.height);
      const opacity = this.funcionOpacidad(this.height);
      // console.log("opacidad: ", opacity);
      this.miColor = `rgba(63, 167, 164, ${opacity})`;
    }

    funcionOpacidad(height: number): number {
      const minHeight = 300;
      const maxHeight = 2000;
      const opacity = (height - minHeight) / (maxHeight - minHeight);
      return Math.max(0, Math.min(1, opacity)); //para asegurar que la opacidad esté dentro del rango [0, 1]
    }


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
