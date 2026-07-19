import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';

export const routes: Routes = [
  { path: '', component: StudentList },
  { path: 'nuevo', component: StudentForm },
  { path: 'editar/:id', component: StudentForm },
  { path: '**', redirectTo: '' },
];
