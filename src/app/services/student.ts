import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student.model';

const STORAGE_KEY = 'students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly students = signal<Student[]>(this.load());
  readonly students$ = this.students.asReadonly();

  private load(): Student[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private save(students: Student[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    this.students.set(students);
  }

  getAll(): Student[] {
    return this.students();
  }

  getById(id: string): Student | undefined {
    return this.students().find((s) => s.id === id);
  }

  add(student: Omit<Student, 'id'>): void {
    const newStudent: Student = { ...student, id: crypto.randomUUID() };
    this.save([...this.students(), newStudent]);
  }

  update(id: string, changes: Omit<Student, 'id'>): void {
    const updated = this.students().map((s) => (s.id === id ? { ...changes, id } : s));
    this.save(updated);
  }

  delete(id: string): void {
    this.save(this.students().filter((s) => s.id !== id));
  }
}
