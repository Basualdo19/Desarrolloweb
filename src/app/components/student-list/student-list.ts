import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private readonly filterText = signal('');

  readonly students = computed(() => {
    const filter = this.filterText().trim().toLowerCase();
    const all = this.studentService.getAll();
    if (!filter) return all;
    return all.filter((s) =>
      `${s.nombre} ${s.apellido} ${s.dni}`.toLowerCase().includes(filter)
    );
  });

  constructor(private readonly studentService: StudentService) {}

  onFilterChange(value: string): void {
    this.filterText.set(value);
  }

  delete(id: string): void {
    if (confirm('¿Eliminar este estudiante?')) {
      this.studentService.delete(id);
    }
  }
}
