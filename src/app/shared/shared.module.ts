import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/let.directive';

const components:any[] = [];
const directives:any[] = [NgLetDirective];
const modules:any[] = [];
const exports:any[] = [...modules, ...components, ...directives];

@NgModule({
    declarations: [...components, ...directives],
    imports: [CommonModule, ...modules],
    exports,
})
export class SharedModule {}
