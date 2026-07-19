import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  private studentId: string | null = null;
  isEditMode = false;

  readonly form;

  constructor(
    private readonly fb: FormBuilder,
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      carrera: ['', Validators.required],
      anio: [1, [Validators.required, Validators.min(1)]],
      promedio: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      estado: ['activo' as 'activo' | 'inactivo', Validators.required],
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      const student = this.studentService.getById(this.studentId);
      if (student) {
        this.isEditMode = true;
        this.form.patchValue(student);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEditMode && this.studentId) {
      this.studentService.update(this.studentId, value);
    } else {
      this.studentService.add(value);
    }

    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
