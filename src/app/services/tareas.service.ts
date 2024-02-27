import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = "listaDeTareas";

  getTareas(): string[]{
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  agregarTarea(tarea: string){
    tarea=tarea.trim();
    if (tarea!=""){
      const tareasGuardadas = this.getTareas();
      tareasGuardadas.push(tarea);
      localStorage.setItem(this.localStorageKey,JSON.stringify(tareasGuardadas));
    }
    
  }

  eliminarTarea(indice:number){
    const tareasGuardadas = this.getTareas();
    tareasGuardadas.splice(indice,1);
    localStorage.setItem(this.localStorageKey,JSON.stringify(tareasGuardadas));
  }

}
