import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  constructor(private service: CoursesService, private route: ActivatedRoute, private router: Router) { }

  course: any;
  courseId: any;
  routeParamObservable: any;
  queryParamObservable: any;
  editMode: boolean = false;

  addOueryParam() {
    this.router.navigate(['/Course', this.courseId], { queryParams: { edit: true } });
  }

  saveUpdateNameChange() {
    this.router.navigate(['/Course', this.courseId]);
  }

  ngOnInit(): void {
    // this.courseId = this.route.snapshot.params['id'];
    // this.courseId = this.route.snapshot.paramMap.get('id');
    // this.course = this.service.courses.find(x => x.id == this.courseId);

    this.routeParamObservable = this.route.paramMap.subscribe({
      next: (param) => {
        this.courseId = param.get('id');
        this.course = this.service.courses.find(x => x.id == this.courseId);
      }
    })

    //TODO when manually refresh the page
    this.router.navigate(['/Course', this.courseId]);

    //accessing query-parms using snapshot //! This doesn't work
    // this.editMode = Boolean(this.route.snapshot.queryParamMap.get('edit'));

    //accessing query-parms using observables //? This works fine in all cases
    this.queryParamObservable = this.route.queryParamMap.subscribe({
      next: (param) => {
        this.editMode = Boolean(param.get('edit'));
        console.log(this.editMode);
      }
    })
  }

  ngOnDestroy(): void {
    this.routeParamObservable.unsubscribe();
  }

}
