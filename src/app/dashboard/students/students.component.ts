import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent{

	error = null
	message = null
	students = []
	student = null

	constructor(private userService:UserService) {
	}

	getStudents(){
		this.error = null
		this.message = null
		this.student = null
		this.userService.getStudents()
		.then(students=>{
			console.log(students)
			this.students = students
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to load Student list'
		})
	}

	reloadStudents(){
		console.log('reloading')
		this.getStudents()
	}

	view(id){
		this.error = null
		this.message = null
		this.student = null
		this.userService.getStudent(id)
		.then(student=>{
			console.log(student)
			this.student = student
		})
		.catch(err=>{
			this.error = 'Unable to load student'
		})
	}

	save(){
		console.log(this.student)
		this.error = null
		this.message = null
		this.userService.updateStudent(this.student)
		.then(()=>{
			this.message = 'Student details updated successfully'
			this.reloadStudents()
		})
		.catch(err=>{
			this.error = 'Unable to update student details'
		})
	}

}
