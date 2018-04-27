import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [FirebaseService]
})
export class QuestionsComponent implements OnInit {

  public csvText: '';

  constructor(private firebaseService: FirebaseService) { }

  onClickAddQuestionsButton(){
    this.addQuestion(1, {
      name: 'Sumedhe',
      admin: true,
      count: 1
    });
  }

  // Add Questions
  addQuestion(level, question){
    var ref = this.firebaseService.getDatabase().ref('levels');
    var questionRef = ref.child(level).child('questions')

    questionRef.push(question);
  }

  ngOnInit() {
  }

}
