import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: []
})
export class QuestionsComponent implements OnInit {
  title: string;
  level: string;
  levels: string[];
  questions: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.level = "1"; // Default
    this.levels = [];
    this.title = "Questions";

    // Load questions
    this.mapQuestions();

    this.db.list('levels').snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        this.levels.push(action.key);
        console.log(action.key);
      });
    });
  }

  mapQuestions(){
    // Use snapshotChanges().map() to store the key
    this.questions = this.getQuestionList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addItem() {
    this.getQuestionList().push({
      title: "New Question",
      description: "",
      answer: "0",
      correctPoints: "10",
      wrongPoints: "-5"
    });
  }

  updateItem(key: string, title: string, description: string, answer: string, correctPoints: string, wrongPoints: string) {
    this.getQuestionList().update(key, {
      title: title,
      description: description,
      answer: answer,
      correctPoints: correctPoints,
      wrongPoints: wrongPoints
    });
  }

  deleteItem(key: string) {    
    this.getQuestionList().remove(key); 
  }
  
  deleteEverything() {
    this.getQuestionList().remove();
  }

  
  getQuestionList(){
    return this.db.list('levels/' + this.level + '/questions');
  }


  ngOnInit() {
  }

}
