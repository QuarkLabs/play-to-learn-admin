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
  a: number[];

  constructor(private db: AngularFireDatabase) {
    this.level = "1"; // Default
    this.levels = [];
    this.title = "Questions";

    // Load questions
    this.loadQuestions();

    // Get levels
    this.db.list('levels').snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        if (this.levels.indexOf(action.key) == -1){
          this.levels.push(action.key);
        }
        // Save Level Count
        this.db.object('level_info/count').set(Math.max(...this.levels.map(Number)));
      });
    });
  }

  loadQuestions(){
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
      wrongPoints: "-5",
      category: { 
        id: "conditional_structures",   // TODO: Category Selector
        name: "Conditional Structures"  // TODO: Category Selector
      }
    });
  }

  updateItem(key: string, title: string, description: string, answer: string, correctPoints: string, wrongPoints: string) {
    this.getQuestionList().update(key, {
      title: title,
      description: description,
      answer: parseInt(answer),
      correctPoints: parseInt(correctPoints),
      wrongPoints: parseInt(wrongPoints)
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

  addNewLevel(){
    var newNum = 1;
    while (this.levels.indexOf(newNum.toString()) > -1){
      newNum++;
    }
    this.levels.push(newNum.toString());
    this.level = newNum.toString();
    this.loadQuestions();
  }


  ngOnInit() {
  }

}
